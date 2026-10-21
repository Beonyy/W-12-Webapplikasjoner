import { describe, test, expect, vi, beforeEach, afterEach, afterAll } from "vitest";
import { eq } from "drizzle-orm";
import { animals } from "../schema";
import { Species } from "../enum";
import { createAnimalDatabase } from "../database-api";
import { makeAnimal, makeMockDatabase } from "./helpers";
import type { NewAnimal, Animal } from "../schema"


const { closeTestDatabase } = vi.hoisted(() => ({
    closeTestDatabase: vi.fn(),
}));

vi.mock("../../index", async () => {
    const { makeMockDatabase } = await import("./helpers");
    const testDatabase = makeMockDatabase();

    closeTestDatabase.mockImplementation(testDatabase.close);
    return { db: testDatabase.db };
});

import { clientDatabase } from "../../../index";

afterEach(async () => {
    await clientDatabase.delete(animals);
});

afterAll(() => {
    closeTestDatabase();
})

describe("createAnimalRepository", () => {
    let mockDb: ReturnType<typeof makeMockDatabase>;
    beforeEach(() => {
        mockDb = makeMockDatabase();
    });
    
    afterEach(() => {
        mockDb.close();
    })

    describe("insertAnimal", () => {
        test("inserts an animal row", async () => {
            //Arrange
            const repo = createAnimalDatabase(mockDb.db);
            const animal: NewAnimal = makeAnimal({ name: "Fido" })

            //Act
            await repo.insertAnimal(animal);
        });
    });
    describe("getAnimalById", () => {
        test("", async () => {

        });
    });
    describe("searchAnimals", () => {
        test("", async () => {

        });
    });
    describe("updateAnimal", () => {
        test("", async () => {

        });
    });
    describe("softDeleteAnimal", () => {
        test("", async () => {

        });
    });
    describe("hardDeleteAnimal", () => {
        test("", async () => {
            
        })
    })

});
