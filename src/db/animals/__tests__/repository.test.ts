import { describe, test, expect, vi, afterEach, afterAll } from "vitest";
import { eq } from "drizzle-orm";
import type { Animal } from "../../../app/features/animals/types";
import { AnimalDb } from "../types";
import { animalTable } from "../schema";
import { insertAnimal, getAnimal } from "../repository";
import { makeAnimal, makeAnimalDb, makeMockDatabase } from "./helpers";

const { closeTestDatabase } = vi.hoisted(() => ({
    closeTestDatabase: vi.fn(),
}));

vi.mock("../../index", async () => {
    const { makeMockDatabase } = await import("./helpers");
    const testDatabase = makeMockDatabase();

    closeTestDatabase.mockImplementation(testDatabase.close);
    return { db: testDatabase.db };
});

import { db } from "../../index";

afterEach(async () => {
    await db.delete(animalTable);
});

afterAll(() => {
    closeTestDatabase();
})



describe("createAnimal", () => {
    test("inserts an animal row in database", async () => {
        //Arrange
        const animal: Animal = makeAnimal({ id: 130 });

        //Act
        await insertAnimal(animal);

        //Assert
        const rows = await db
        .select()
        .from(animalTable)
        .where(eq(animalTable.id, animal.id));
        
        expect(rows).toHaveLength(1);
        expect(rows[0]?.name).toBe(animal.name)
    });
});

describe("getAnimal", () => {
    test("returns the animal with the requested Id", async () => {
        //Arrange
        const animal: Animal = makeAnimal({ id: 3500, nickname: null });
        await insertAnimal(animal)
        
        //Act
        const result = await getAnimal(3500);

        //Assert
        expect(result).toEqual(animal)
    });

    test("returns null when no animal has requested Id", async () => {
        //Arrange
        //DB should be empty

        //Act
        const result = await getAnimal(2700);

        //Assert
        expect(result).toEqual(null);
    })
});

test("stores an animal and retrieves the same animal", async () => {
    //Arrange
    const animal: Animal = makeAnimal({ id: 130, nickname: null });

    //Act
    await insertAnimal(animal);
    const result = await getAnimal(130);

    //Assert
    expect(result).toEqual(animal);
})