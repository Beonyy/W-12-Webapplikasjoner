import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { makeMockDatabase, makeAnimalCreateParams, makeAnimalDb, seedAnimal } from "./helpers";
import { createAnimalRepository } from "../animal-repository";
import { Errors } from "@shared/types/errors";
import { AnimalCreateParams } from "@/app/features/animals/animal-types";
import { createId } from "@paralleldrive/cuid2";
import { mock } from "node:test";

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
        test("should return failure result when the database is down", async () => {
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
        test("should return failure result when the database is down", async () => {
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
        test("should return failure result when the database is down", async () => {
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
            seedAnimal(mockDb.db, { id: activeId, deleted: false });
            seedAnimal(mockDb.db, { id: deletedId, deleted: true });

            const result = await repository.getAll();

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data).toHaveLength(1);
                expect(result.data[0].id).toBe(activeId);
            }
        });
        test("should return failure result when the database is down", async () => {
            const id = createId();
            mockDb.close();

            const result = await repository.getAll();

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.INTERNAL_SERVER_ERROR);
            }
        });
    })
});