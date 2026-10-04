import type { Animal } from "../../app/features/animals/types";
import { AnimalDb } from "./types";
import { toAnimalDb, toAnimal } from "./mappers";
import { animalTable } from "./schema";
import { db } from "../index";
import { eq } from "drizzle-orm";

export async function insertAnimal(animal: Animal): Promise<void> {
    const animalDb = toAnimalDb(animal);

    await db.insert(animalTable).values(animalDb)

}

export async function getAnimal(id: number): Promise<Animal | null> {
    const result = await db
        .select()
        .from(animalTable)
        .where(eq(animalTable.id, id));

    const animalDb = result[0];

    if (!animalDb) {
        return null;
    }

    return toAnimal(animalDb);
}