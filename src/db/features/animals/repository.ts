import { animals } from "./schema";
import { eq, and, or, ilike } from "drizzle-orm";
import type { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core";
import * as schema from "./schema"

//The db type: Only SQLite, any driver for it, using our specific schema
export function createAnimalRepository(db: BaseSQLiteDatabase<any, typeof schema>)
{
    return {

        async insertAnimal(data: typeof animals.$inferInsert): Promise<typeof animals.$inferSelect>
        {
            const result = await db
                .insert(animals)
                .values(data)
                .returning();
            
            return result[0];
        },
        async getAnimalById(id: string): Promise<typeof animals.$inferSelect[]>
        {
            const results = await db.query.animals.findMany({
                where: { id }
            });
        },
        async searchAnimals(keyword?: string): Promise<typeof animals.$inferSelect[]>
        {
            if (!keyword || keyword.trim() === "") 
                {
                    //returns nothing
                    return [];

                    //would return all
                    return await db.query.animals.findMany({
                        where: { deleted: false }
                    });
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
                .from(animals)
                .where(and(
                    eq(animals.deleted, false),
                    or(
                        //https://orm.drizzle.team/docs/operators#ilike
                        ilike(animals.name, searchTerm),
                        ilike(animals.species, searchTerm),
                        ilike(animals.characteristics, searchTerm),
                        ilike(animals.nickname, searchTerm),
                        ilike(animals.housingUnit, searchTerm),
                    )
                ));

                return result;
        },
        async updateAnimal(
            id: string, 
            data: Partial<typeof animals.$inferInsert>): 
            Promise<typeof animals.$inferSelect | null> 
        {
            const result = await db
                .update(animals)
                .set(data)
                .where(and(
                    eq(animals.id, id), 
                    eq(animals.deleted, false)))
                .returning();
            
            return result[0] ?? null;
        },
        async softDeleteAnimal(id: string): Promise<typeof animals.$inferSelect | null> 
        {
            const result = await db
                .update(animals)
                .set({ deleted: true })
                .where(eq(animals.id, id))
                .returning();

            //returns the entire row so the deleted-column can be checked for correct value
            return result[0] ?? null;
        },
        async hardDeleteAnimal(id: string): Promise<void>
        {
            await db
                .delete(animals)
                .where(eq(animals.id, id));
        },
    }
}
