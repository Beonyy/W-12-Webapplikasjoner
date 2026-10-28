import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { makeMockDatabase, makeAnimalCreateParams, makeAnimalDb } from "./helpers";
import { createAnimalRepository } from "../animal-repository";
import { Errors } from "@shared/types/errors";
//import * from ;
/*
afterEach(async () => {
    await clientDatabase.delete(animals);
});

afterAll(() => {
    closeTestDatabase();
})
*/

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
        test("should successfully insert data when valid data is provided", async () => {
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
            const params = makeAnimalCreateParams({ name: null });

            const result = await repository.insert(params);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.INTERNAL_SERVER_ERROR);
            }
        });
        test("should return failure result when the database is down", async () => {
            const id = 101;
            const params = makeAnimalCreateParams({ id: id });
            mockDb.close();

            const result = await repository.insert(params);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.INTERNAL_SERVER_ERROR);
            }
        })
    });
    describe("getById", () => {
        test("should return animal when id exists", async () => {
            const id = 101.0;
            const name = "Queen of England";
            const params = makeAnimalDb({ id: id, name: name });
            await repository.insert(params);

            const result = await repository.getById(id);

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data.id).toBeCloseTo(params.id);
                expect(result.data.name).toBe(params.name);
                expect(result.data.housingUnit).toBe(params.housingUnit);
            }

        });
        test("should return failure result when ID does not exist", async () => {
            const result = await repository.getById(100);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.NOT_FOUND);
                expect(result.data).toBe(undefined);
            }
        });
        test("should return failure result when record has been soft deleted", async () => {
            const id = 101;
            const params = makeAnimalDb({ id: id, deleted: true });
            await repository.insert(params);

            const result = await repository.getById(id);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.NOT_FOUND);
            }
        });
        test("should return failure result when the database is down", async () => {
            const id = 101;
            mockDb.close();

            const result = await repository.getById(id);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.INTERNAL_SERVER_ERROR);
            }
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
        test("when record has been soft deleted", async () => {

        });
        test("unhappy path", async () => {

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