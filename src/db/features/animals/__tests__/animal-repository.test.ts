import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { makeMockDatabase, makeAnimalCreateParams, makeAnimalDb } from "./helpers";
import { createAnimalRepository } from "../animal-repository";
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

    describe("create", () => {
        test("happy path", async () => {
            const params = makeAnimalCreateParams({ nickname: "Kitty" });

            const result = await repository.insert(params);

            expect(result.success).toBe(true);
            if(result.success) {
                expect(result.data.name).toBe(params.name);
                expect(result.data.nickname).toBe("Kitty");
                expect(result.data.species).toBe(params.species);
                
            }
        });

        test("unhappy path", async () => {
            const params = makeAnimalCreateParams({ name: "" });

            const result = await repository.insert()
        });
    })
})