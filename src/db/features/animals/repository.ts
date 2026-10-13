import { animals } from "./schema";
import { eq, and } from "drizzle-orm";
import { DB } from "../../index";
import { db } from "@/db";

export function createAnimalRepository(myDb: DB)
{
    return {

        async insert(data: typeof animals.$inferInsert): Promise<typeof animals.$inferSelect>
        {
            const result = await myDb
                .insert(animals)
                .values(data)
                .returning();
            
            return result[0];
        },
        async getById(id: string): Promise<typeof animals.$inferSelect[]>
        {
            return await myDb.query.animals.findMany({
                where: { id }
            });
        },
        //get all EXCEPT the soft deleted entries
        async getAll(): Promise<typeof animals.$inferSelect[]>
        {
            return await myDb.query.animals.findMany({
                where: { deleted: false }
            });
        },
        async searchBySubstring(keyword?: string): Promise<typeof animals.$inferSelect[]>
        {
            if (!keyword || keyword.trim() === "") 
                {
                    return await myDb.query.animals.findMany({
                        where: { deleted: false }
                    });
                }

            const searchTerm = `%${keyword.trim()}%`

            return await myDb.query.animals.findMany({  
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
                return await myDb.query.animals.findMany({
                    where: { deleted: false }
                });
            }

            //Using regex rather than split(" ") to avoid empty string results
            // if the input contains consecutive spaces
            const words = keyword.trim().split(/\s+/).filter(Boolean);

            return await myDb.query.animals.findMany({
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
            return (await myDb.update(animals)
                .set(data)
                .where(and(
                    eq(animals.id, id), 
                    eq(animals.deleted, false)))
                .returning())[0];
        },
        async softDelete(id: string): Promise<typeof animals.$inferSelect | null> 
        {
            return (await myDb.update(animals)
                .set({ deleted: true })
                .where(eq(animals.id, id))
                .returning())[0] ?? null;
        },
        async hardDelete(id: string): Promise<void>
        {
            await myDb
                .delete(animals)
                .where(eq(animals.id, id));
        },
    }
}

export const animalRepository = createAnimalRepository(db);
