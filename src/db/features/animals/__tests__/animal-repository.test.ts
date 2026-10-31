import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { makeMockDatabase, makeAnimalCreateParams, makeAnimalDb } from "./helpers";
import { createAnimalRepository } from "../animal-repository";
import { Errors } from "@shared/types/errors";
import { AnimalCreateParams } from "@/app/features/animals/animal-types";

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
            const id = "101";
            const name = "Queen of England";
            const params = makeAnimalCreateParams({ name: name });
            const inserted = await repository.insert(params);
            let result;

            if(inserted.success) {
                result = await repository.getById(inserted.data.id);
            }

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data.id).toBeCloseTo(params.id);
                expect(result.data.name).toBe(params.name);
                expect(result.data.housingUnit).toBe(params.housingUnit);
            }
        });
        test("should return failure result when ID does not exist", async () => {
            const result = await repository.getById("100");

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.NOT_FOUND);
                expect(result.data).toBe(undefined);
            }
        });
        test("should return failure result when record has been soft deleted", async () => {
            const id = "101";
            const params = makeAnimalDb({ id: id, deleted: true });
            await repository.insert(params);

            const result = await repository.getById(id);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.NOT_FOUND);
            }
        });
        test("should return failure result when the database is down", async () => {
            const id = "101";
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
            const id = "101";
            const oldNickname = "Old name";
            const newNickname = "New name";
            const params = makeAnimalDb({ id: id, nickname: oldNickname }); 
            await repository.insert(params);

            const result = await repository.updateById(id, { nickname: newNickname });

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data.nickname).toBe("New name")
                expect(result.data.id).toBeCloseTo(id)
            }
        });
        test("should return failure result when ID does not exist", async () => {
            const result = await repository.updateById("100");

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.NOT_FOUND);
                expect(result.data).toBe(undefined);
            }
        });
        test("does not overwrite ID when passed in update payload", async () => {
            const id = "101";
            const params = makeAnimalCreateParams({ id: id });
            await repository.insert(params);
            const newData: Partial<AnimalCreateParams> = {
                id: "102",
                nickname: "Kitty",
            }

            const result = await repository.updateById(id, newData);

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data.id).toBeCloseTo(101)
            }
        });
        test("updates soft deleted record?", async () => {

        });
        test("db is down", async () => {

        });
    });
    describe("getAll", () => {
        test("should return a single record when one record exists", async () => {
            const name = "The King of Denmark";
            const params = makeAnimalCreateParams({ name: name });
            await repository.insert(params);

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
                const animal = makeAnimalCreateParams();
                const insertedAnimal = await repository.insert(animal);
                expect(insertedAnimal.success).toBe(true);
            }

            const result = await repository.getAll();

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data).toHaveLength(expectedCount);
            }
        });
        test("should return only non-deleted records when both soft deleted and non-deleted exist", async () => {
            const deletedParams = makeAnimalDb({ name: "I don't exist", deleted: true });
            const nonDeletedParams = makeAnimalDb({ name: "I exist", deleted: false });
            await repository.insert(deletedParams);
            await repository.insert(nonDeletedParams);

            const result = await repository.getAll();

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data).toHaveLength(1);
                expect(result.data[0].name).toBe("I exist");
            }
        });
        test("when database is down", async () => {
            mockDb.close();

            const result = await repository.getAll();

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.INTERNAL_SERVER_ERROR);
            }
        });
    })
});