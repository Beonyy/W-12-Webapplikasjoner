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
        test("happy path", async () => {
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

        test("unhappy path", async () => {
            const params = makeAnimalCreateParams({ name: null });

            const result = await repository.insert(params);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.INTERNAL_SERVER_ERROR);
            }
        });
    });
    describe("getById", () => {
        test("happy path", async () => {
            const id = 101.0;
            const name = "Queen of England";
            const params = makeAnimalCreateParams({ id: id, name: name });
            const action = await repository.insert(params);

            const result = await repository.getById(id);

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data.id).toBeCloseTo(params.id);
                expect(result.data.name).toBe(params.name);
                expect(result.data.housingUnit).toBe(params.housingUnit);
            }

        });
        test("when ID does not exist", async () => {
            const result = await repository.getById(100);

            expect(result.success).toBe(false);
            if(!result.success) {
                expect(result.error.code).toBe(Errors.NOT_FOUND);
                expect(result.data).toBe(undefined);
            }
        });
    });
});