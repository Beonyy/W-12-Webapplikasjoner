import type { Animal } from "../../../app/features/animals/types";
import type { AnimalDb } from "./types";
import { toAnimalDb, toAnimal } from "./mappers";
import { animalTable } from "./schema";
import { db } from "../../index";
import { eq, and } from "drizzle-orm";

export async function insertAnimal(data: typeof animalTable.$inferInsert): Promise<void> 
{
    await db
        .insert(animalTable)
        .values(data)
}

export async function getAnimalById(id: string) 
{
    const result = await db
        .select()
        .from(animalTable)
        .where(eq(animalTable.id, id));

    return result[0] ?? null;
}

export async function searchAnimals() 
{
    //searching amongst existing animal entries
    //excluding soft deleted animals
}

export async function updateAnimal(
    id: string, 
    data: Partial<typeof animalTable.$inferInsert>): 
    Promise<typeof animalTable.$inferSelect | null> 
{
    const result = await db
        .update(animalTable)
        .set(data)
        .where(and(eq(animalTable.id, id), eq(animalTable.deleted, false)))
        .returning();
    
    return result[0] ?? null;
}

export async function softDeleteAnimal(id: string): Promise<typeof animalTable.$inferSelect | null> 
{
    const result = await db
        .update(animalTable)
        .set({ deleted: true })
        .where(eq(animalTable.id, id))
        .returning();

    return result[0] ?? null;
}

export async function hardDeleteAnimal(id: string): Promise<boolean>
{
    const result = await db
        .delete(animalTable)
        .where(eq(animalTable.id, id));
}

