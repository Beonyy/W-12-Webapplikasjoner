import Database from "better-sqlite3";
import type { Animal, NewAnimal } from "../schema";
import { Species } from "../enum";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { createId } from "@paralleldrive/cuid2";

export function makeMockDatabase() {
    
    // using RAM to ensure nothing becomes persistent
    const sqlite = new Database(":memory:");

    sqlite.exec(`
        CREATE TABLE animals (
        id TEXT PRIMARY KEY,
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

export function makeNewAnimal(overrides: Partial<Animal> = {}): NewAnimal {
       return {
            name: "Napolion",
            species: Species.Cat,
            nickname: null,
            dateOfBirth: null,
            characteristics: null,
            housingUnit: "H1404",
            contactInfo: null,
            profileImageUrl: null,
            ...overrides,
       }
}

export function makeAnimal(): Animal {
    return {
        id: createId(),
        name: "Napolion",
        species: Species.Cat,
        nickname: null,
        dateOfBirth: null,
        characteristics: null,
        housingUnit: "H1404",
        contactInfo: null,
        profileImageUrl: null,
        deleted: false,
        createdAt: new Date("2026-11-10T00:00:00Z"),
        updatedAt: null,
    }
}
