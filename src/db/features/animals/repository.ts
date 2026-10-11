import { animalTable } from "./schema";
import { db } from "../../index";
import { eq, and, or, ilike } from "drizzle-orm";

export async function insertAnimal(data: typeof animalTable.$inferInsert): Promise<typeof animalTable.$inferSelect>
{
    const result = await db
        .insert(animalTable)
        .values(data)
        .returning();
    
    return result[0];
}

export async function getAnimalById(id: string): Promise<typeof animalTable.$inferSelect | null>
{
    const result = await db
        .select()
        .from(animalTable)
        .where(eq(animalTable.id, id));

    return result[0] ?? null;
}

export async function searchAnimals(keyword?: string): Promise<typeof animalTable.$inferSelect[]>
{
    if (!keyword || keyword.trim() === "") 
        {
            //returns nothing
            return [];

            //would return all
            return await db
                .select()
                .from(animalTable)
                .where(eq(animalTable.deleted, false));

        }

    //This depends alot on what we get from the frontend.
    //If it's a term we want to match as it is, that's easy. 
    // If we want to match a series of strings all against "any col in the db", more complex, 
    // and possibly gives nonsensical results. 
    // Need to be able to split it up into sensical groupings

    //The following implementation works for a single search term.
    // it checks against the listed up columns, and for partial matches, 
    // but does not split up a complex search.
    //Could be wrapped in logic to split up the input and search for each part.

    const searchTerm = `%${keyword.trim()}%`

    const result = await db   
        .select()
        .from(animalTable)
        .where(and(
            eq(animalTable.deleted, false),
            or(
                //https://orm.drizzle.team/docs/operators#ilike
                ilike(animalTable.name, searchTerm),
                ilike(animalTable.species, searchTerm),
                ilike(animalTable.characteristics, searchTerm),
                ilike(animalTable.nickname, searchTerm),
                ilike(animalTable.housingUnit, searchTerm),
            )
        ));

        return result;
}

export async function updateAnimal(
    id: string, 
    data: Partial<typeof animalTable.$inferInsert>): 
    Promise<typeof animalTable.$inferSelect | null> 
{
    const result = await db
        .update(animalTable)
        .set(data)
        .where(and(
            eq(animalTable.id, id), 
            eq(animalTable.deleted, false)))
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

    //returns the entire row so the deleted-column can be checked for correct value
    return result[0] ?? null;
}

export async function hardDeleteAnimal(id: string): Promise<void>
{
    await db
        .delete(animalTable)
        .where(eq(animalTable.id, id));
}

