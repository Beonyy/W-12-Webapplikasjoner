import Database from "better-sqlite3";
import type { Animal } from "../../../app/features/animals/types";
import type { AnimalDb } from "../types";
import { drizzle } from "drizzle-orm/better-sqlite3";

export function makeMockDatabase() {
    
    // using RAM to ensure nothing becomes persistent
    const sqlite = new Database(":memory:");

    sqlite.exec(`
        CREATE TABLE animals (
        animalId INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        species TEXT NOT NULL,
        nickname TEXT,
        dateOfBirth TEXT,
        characteristics TEXT,
        housingUnit TEXT NOT NULL,
        contactInfo TEXT,
        profileImageUrl TEXT      
        )
    `);

    return {
        db: drizzle({ client: sqlite }),
        close: () => sqlite.close(),
    };
}


export function makeAnimal(overrides: Partial<Animal> = {}): Animal {
       return {
            id: 1,
            name: "Napolion",
            species: "cat",
            nickname: undefined,
            dateOfBirth: null,
            characteristics: null,
            housingUnit: "H1404",
            contactInfo: null,
            profileImageUrl: null,
            ...overrides,
       }
}

export function makeAnimalDb(overrides: Partial<AnimalDb> = {}): AnimalDb {
    return {
        id: 1,
        name: "Napolion",
        species: "cat",
        nickname: null,
        dateOfBirth: null,
        characteristics: null,
        housingUnit: "H1404",
        contactInfo: null,
        profileImageUrl: null,
        ...overrides,
    }
}