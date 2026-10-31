import Database from "better-sqlite3";
import { Species } from "../enum";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { createId } from "@paralleldrive/cuid2";
import { AnimalCreateParams } from "@/app/features/animals/animal-types";
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

export async function seedAnimal(db: AppDatabase, overrides: Partial<AnimalDb> = {}) {
    const animal = makeAnimalDb(overrides);
    const id: string = animal.id ?? createId();
    await db.run(sql`
        INSERT INTO animals (id, name, species, nickname, dateOfBirth, characteristics, housingUnit, contactInfo, profileImageUrl, deleted, created_at, updated_at)
        VALUES (${id}, ${animal.name}, ${animal.species}, ${animal.nickname}, 
        ${animal.dateOfBirth}, ${animal.characteristics}, ${animal.housingUnit}, 
        ${animal.contactInfo}, ${animal.profileImageUrl}, ${animal.deleted ? 1 : 0}, 
        ${animal.createdAt?.getTime() ?? Date.now()}, ${animal.updatedAt ? animal.updatedAt.getTime() : null})
    `);
    return animal;
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
        nickname: "",
        dateOfBirth: "",
        characteristics: "",
        housingUnit: "H1404",
        contactInfo: "",
        profileImageUrl: "",
        deleted: false,
        createdAt: new Date("2026-11-10T00:00:00Z"),
        updatedAt: null,
        ...overrides
    }
}
