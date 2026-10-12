import { animals } from "./schema";
import { eq, and } from "drizzle-orm";
import type { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core";
import * as schema from "./schema"

//The db type: Only SQLite, any driver for it, using our specific schema
export function createAnimalRepository(db: BaseSQLiteDatabase<any, typeof schema>)
{
    return {

        async insert(data: typeof animals.$inferInsert): Promise<typeof animals.$inferSelect>
        {
            const result = await db
                .insert(animals)
                .values(data)
                .returning();
            
            return result[0];
        },
        async getById(id: string): Promise<typeof animals.$inferSelect[]>
        {
            return await db.query.animals.findMany({
                where: { id }
            });
        },
        //get all EXCEPT the soft deleted entries
        async getAll(): Promise<typeof animals.$inferSelect[]>
        {
            return await db.query.animals.findMany({
                where: { deleted: false }
            });
        },
        async searchBySubstring(keyword?: string): Promise<typeof animals.$inferSelect[]>
        {
            if (!keyword || keyword.trim() === "") 
                {
                    return await db.query.animals.findMany({
                        where: { deleted: false }
                    });
                }

            const searchTerm = `%${keyword.trim()}%`

            return await db.query.animals.findMany({  
                where: {
                    deleted: false,
                    OR: [
                        { name: { ilike: searchTerm } },
                        { species: { ilike: searchTerm } },
                        { characteristics: { ilike: searchTerm } },
                        { nickname: { ilike: searchTerm } },
                        { housingUnit: { ilike: searchTerm } },
                    ]
                }
            });
        },
        async searchByKeywords(keyword?: string): Promise<typeof animals.$inferSelect[]>
        {
            if (!keyword || keyword.trim() === "") 
            {
                return await db.query.animals.findMany({
                    where: { deleted: false }
                });
            }

            //Using regex rather than split(" ") to avoid empty string results
            // if the input contains consecutive spaces
            const words = keyword.trim().split(/\s+/).filter(Boolean);

            return await db.query.animals.findMany({
                where: {
                    deleted: false,
                    AND: words.map(word => {
                        const searchTerm = `%${word}%`;
                        return {
                            OR: [
                                { name: { ilike: searchTerm } },
                                { species: { ilike: searchTerm } },
                                { characteristics: { ilike: searchTerm } },
                                { nickname: { ilike: searchTerm } },
                                { housingUnit: { ilike: searchTerm } },
                            ]
                        };
                    })
                }
            });

        },
        async update(
            id: string, 
            data: Partial<typeof animals.$inferInsert>): 
            Promise<typeof animals.$inferSelect> 
        {
            return (await db.update(animals)
                .set(data)
                .where(and(
                    eq(animals.id, id), 
                    eq(animals.deleted, false)))
                .returning())[0];
        },
        async softDelete(id: string): Promise<typeof animals.$inferSelect | null> 
        {
            return (await db.update(animals)
                .set({ deleted: true })
                .where(eq(animals.id, id))
                .returning())[0] ?? null;
        },
        async hardDelete(id: string): Promise<void>
        {
            await db
                .delete(animals)
                .where(eq(animals.id, id));
        },
    }
}
