import Database from "better-sqlite3";
import { Species } from "../enum";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { createId } from "@paralleldrive/cuid2";
import { Animal, AnimalCreateParams } from "@/app/features/animals/animal-types";
import { AnimalDb } from "../animal-types";
import { relations } from "@/db/relations";
import type { Database as AppDatabase } from "@/db/index";

export function makeMockDatabase(): { db: AppDatabase; close: () => void } {
    // making the database exist only in RAM
    const sqlite = new Database(":memory:");


    sqlite.exec(`
        CREATE TABLE animal_audit_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        animalId TEXT NOT NULL,
        action TEXT NOT NULL,
        changed_at INTEGER NOT NULL,
        CONSTRAINT fk_animal_audit_lok_animalId_animals_animal_fk 
            FOREIGN KEY (animalId) REFERENCES animals(id) ON DELETE CASCADE
        );

        CREATE TABLE animals (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        species TEXT NOT NULL,
        nickname TEXT,
        dateOfBirth TEXT,
        characteristics TEXT,
        housingUnit TEXT NOT NULL,
        contactInfo TEXT,
        profileImageUrl TEXT,  
        deleted INTEGER NOT NULL DEFAULT 0,
        created_at INTEGER NOT NULL,
        updated_at INTEGER    
        );
    `);

    const db = drizzle({ client: sqlite, relations });

    return {
        db,
        close: () => sqlite.close(),
    };
}

export function makeAnimalCreateParams(overrides: Partial<AnimalCreateParams> = {}): AnimalCreateParams {
       return {
            name: "Napolion",
            species: Species.Cat,
            nickname: "",
            dateOfBirth: "",
            characteristics: "",
            housingUnit: "H1404",
            contactInfo: "",
            ...overrides,
       }
}

export function makeAnimalDb(overrides: Partial<AnimalDb> = {}): AnimalDb {
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
        ...overrides,
    }
}

export function makeAnimal(overrides: Partial<Animal> = {}): Animal {
    return {
        name: "Napolion",
        species: Species.Cat,
        nickname: "",
        dateOfBirth: "",
        characteristics: "",
        housingUnit: "H1404",
        contactInfo: "",
        profileImageUrl: "",
        ...overrides,
    }
}
