import { describe, test, beforeEach, afterEach } from "node:test";
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

describe("animal-repository", () => {
    let mockDb: ReturnType<typeof makeMockDatabase>;
    let repo: ReturnType<typeof createAnimalRepository>;

    beforeEach(() => {
        mockDb = makeMockDatabase();
        repo = createAnimalRepository(mockDb.db);
    });
    
    afterEach(() => {
        mockDb.close();
    });

    describe("create", () => {
        test("", async () => {

        });
    })
})