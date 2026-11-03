import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { makeMockDatabase, makeAnimalCreateParams, seedAnimal } from "./helpers";
import { createAnimalRepository } from "../animal-repository";
import { Errors } from "@shared/types/errors";
import { createId } from "@paralleldrive/cuid2";
import { Species } from "../enum";
import { animals } from "@/db/features/animals/animal-schema";
import { eq } from "drizzle-orm";

describe("AnimalRepository", () => {
    let mockDb: ReturnType<typeof makeMockDatabase>;
    let repository: ReturnType<typeof createAnimalRepository>;

    beforeEach(() => {
        mockDb = makeMockDatabase();
        repository = createAnimalRepository(mockDb.db);
    });
    
    afterEach(() => {
        mockDb.close();
    });

    describe("insert", () => {
        test("should return success with inserted animal when valid data is provided", async () => {
            const nickname = "Kitty";
            const params = makeAnimalCreateParams({ nickname: nickname });

            const result = await repository.insert(params);

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data.name).toBe(params.name);
                expect(result.data.nickname).toBe(params.nickname);
                expect(result.data.species).toBe(params.species);
            }
        });

        test("should return failure result when inserting invalid data", async () => {
            const params = makeAnimalCreateParams({ name: undefined });

            const result = await repository.insert(params);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.INTERNAL_SERVER_ERROR);
            }
        });
        test("should return failure result when the database connection fails", async () => {
            const params = makeAnimalCreateParams();
            mockDb.close();

            const result = await repository.insert(params);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.INTERNAL_SERVER_ERROR);
            }
        })
    });
    describe("getById", () => {
        test("should return success with inserted animal when id exists", async () => {
            const id = createId();
            await seedAnimal(mockDb.db, { id: id, deleted: false });

            const result = await repository.getById(id);

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data.id).toBe(id)
            }

        });
        test("should return failure result when ID does not exist", async () => {
            const result = await repository.getById("100");

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.NOT_FOUND);
            }
        });
        test("should return failure result when record has been soft deleted", async () => {
            const id = createId();
            await seedAnimal(mockDb.db, {id: id, deleted: true });

            const result = await repository.getById(id);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.NOT_FOUND);
            }
        });
        test("should return failure result when the database connection fails", async () => {
            const id = createId();
            mockDb.close();

            const result = await repository.getById(id);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.INTERNAL_SERVER_ERROR);
            }
        });
    });
    describe("updateById", () => {
        test("should return updated animal when valid data is provided", async () => {
            const id = createId();
            const oldName = "Old name";
            const newName = "New name";
            await seedAnimal(mockDb.db, {id: id, name: oldName })

            const result = await repository.updateById(id, { name: newName });

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data.name).toBe(newName)
            }
        });
        test("should return failure result when ID does not exist", async () => {
            const result = await repository.updateById("100", { name: "New Name" });

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.NOT_FOUND);
            }
        });
        test("should return failure result when updating a soft-deleted record", async () => {
            const id = createId();
            const newName = "New name"
            await seedAnimal(mockDb.db, { id: id, deleted: true });

            const result = await repository.updateById(id, { name: newName });

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.NOT_FOUND);
            }
        });
        test("should return failure result when the update payload is empty", async () => {
            const id = createId();
            const result = await repository.updateById(id, {});

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.BAD_REQUEST);
            }
        });
        test("should return failure result when the database connection fails", async () => {
            const id = createId();
            mockDb.close();

            const result = await repository.updateById(id, { name: "New name" });

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.INTERNAL_SERVER_ERROR);
            }
        });
    });
    describe("getAll", () => {
        test("should return a single record when one record exists", async () => {
            const name = "The King of Denmark";
            await seedAnimal(mockDb.db, {name: name, deleted: false });

            const result = await repository.getAll();

            expect(result.success).toBe(true);
            if(result.success){
                expect(result.data).toHaveLength(1);
                expect(result.data[0].name).toBe(name);
            }
        });
        test("should return all records when multiple records exist", async () => {
            const expectedCount = 30;

            for (let i = 0; i < expectedCount; i++) {
                await seedAnimal(mockDb.db, { deleted: false });
            }

            const result = await repository.getAll();

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data).toHaveLength(expectedCount);
            }
        });
        test("should return only non-deleted records when both soft deleted and non-deleted exist", async () => {
            const activeId = createId();
            const deletedId = createId();
            await seedAnimal(mockDb.db, { id: activeId, deleted: false });
            await seedAnimal(mockDb.db, { id: deletedId, deleted: true });

            const result = await repository.getAll();

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data).toHaveLength(1);
                expect(result.data[0].id).toBe(activeId);
            }
        });
        test("should return failure result when the database connection fails", async () => {
            const id = createId();
            mockDb.close();

            const result = await repository.getAll();

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.INTERNAL_SERVER_ERROR);
            }
        });
    })

    describe("softDelete", () => {
        test("should return success result with deleted animal when deleting an existing record", async () => {
            const id = createId();
            await seedAnimal(mockDb.db, { id: id, deleted: false });

            const result = await repository.softDelete(id);

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data?.deleted).toBe(true);
            }
        });
        test("should return failure result when ID does not exist", async () => {
            const id = createId();
            const result = await repository.softDelete(id);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.NOT_FOUND);
            }
        });
        test("should return failure result when record has already been soft deleted", async () => {
            const id = createId();
            await seedAnimal(mockDb.db, { id: id, deleted: true });

            const result = await repository.softDelete(id);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.NOT_FOUND);
            }
        });
        test("should return failure result when the database connection fails", async () => {
            const id = createId();
            mockDb.close();

            const result = await repository.softDelete(id);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.INTERNAL_SERVER_ERROR);
            }
        });
    });
    describe("hardDelete", () => {
        test("should return success result when hard deleting an existing record", async () => {
            const id = createId();
            await seedAnimal(mockDb.db, { id: id });

            const result = await repository.hardDelete(id);

            expect(result.success).toBe(true);
            const deletedRecord = await mockDb.db
                .select()
                .from(animals)
                .where(eq(animals.id, id));
            expect(deletedRecord).toHaveLength(0);
        });
        test("should return failure result when ID does not exist", async () => {
            const id = createId();
            const result = await repository.hardDelete(id);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.NOT_FOUND);
            }
        });
        test("should return failure result when the database connection fails", async () => {
            const id = createId();
            mockDb.close();

            const result = await repository.hardDelete(id);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.INTERNAL_SERVER_ERROR);
            }
        });
    });
    describe("searchByKeywords", () => {
        test("should return matching animals when 1 keyword is provided", async () => {
            let name = "Kitty pretty";
            const includedAnimal = await seedAnimal(mockDb.db, { name: name, deleted: false });
            name = "Bob's burgers";
            await seedAnimal(mockDb.db, { name: name, deleted: false });
            const keyword = "pretty";

            const result = await repository.searchByKeywords(keyword);

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data.length).toBe(1);
                expect(result.data[0].id).toBe(includedAnimal.id);
            }
        });
        test("should return matching animals when multiple keywords are provided", async () => {
            let name = "White cat";
            const firstIncludedAnimal = await seedAnimal(mockDb.db, { name: name, species: Species.Cat, deleted: false });
            name = "Miss cat";
            const secondIncludedAnimal = await seedAnimal(mockDb.db, { name: name, species: Species.Fish, deleted: false });
            name = "Mr. White";
            const thirdIncludedAnimal = await seedAnimal(mockDb.db, { name: name, species: Species.Rabbit, deleted: false });
            name = "Bob's burgers";
            await seedAnimal(mockDb.db, { name: name, species: Species.Dog, deleted: false });
            const keywords = "white cat";

            const result = await repository.searchByKeywords(keywords);

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data.length).toBe(3);
                expect(result.data.map(a => a.id)).toEqual(
                    expect.arrayContaining([firstIncludedAnimal.id, secondIncludedAnimal.id, thirdIncludedAnimal.id])
                );
            }
        });
        test("should return empty array when no match is found", async () => {
            const keyword = "AnimalWhichDoesNotExist";
            
            const result = await repository.searchByKeywords(keyword);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.length).toBe(0);
            }
        });
        test("should exclude soft-deleted animals when records are marked as deleted", async () => {
            const name = "Deleted animal";
            await seedAnimal(mockDb.db, { name: name, species: Species.Cat, deleted: true });
            const keywords = "animal";

            const result = await repository.searchByKeywords(keywords);

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data.length).toBe(0);
            }
        });
        test("should return failure result when the database connection fails", async () => {
            const keyword = "white";
            mockDb.close();

            const result = await repository.searchByKeywords(keyword);
            
            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.INTERNAL_SERVER_ERROR);
            }
        });
    })
});