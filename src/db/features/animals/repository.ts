import { animals } from "./schema";
import { eq, and } from "drizzle-orm";
import { DB } from "../../index";
import { db } from "@/db";
import { Result } from "../../../shared/types/result";
import { Errors } from "../../../shared/types/errors";

export function createAnimalRepository(myDb: DB)
{
    return {
        async insert(data: typeof animals.$inferInsert): Promise<Result<typeof animals.$inferSelect>>
        {
            try {
                const result = await myDb
                    .insert(animals)
                    .values(data)
                    .returning();
                
                return {
                    success: true,
                    data: result[0]
                };
            } catch(error) {
                console.error(error);
                return {
                    success: false,
                    error: {
                        code: Errors.INTERNAL_SERVER_ERROR,
                        message: "Failed to create new entry."
                    }
                };
            };
        },
        async getById(id: string): Promise<Result<typeof animals.$inferSelect[]>>
        {
            try {
                const result = await myDb.query.animals.findMany({
                where: { id }
                });
                return {
                    success: true,
                    data: result
                };
            } catch(error) {
                console.error(error);
                return {
                    success: false,
                    error: {
                        code: Errors.NOT_FOUND,
                        message: "Could not find requested ID."
                    }
                };
            };
        },
        //get all EXCEPT the soft deleted entries
        async getAll(): Promise<Result<typeof animals.$inferSelect[]>>
        {
            try {
                const result = await myDb.query.animals.findMany({
                    where: { deleted: false }
                });
            
                return {
                    success: true,
                    data: result
                };
            } catch(error) {
                console.error(error);
                return {
                    success: false,
                    error: {
                        code: Errors.INTERNAL_SERVER_ERROR,
                        message: "Could not return requested data"
                    }
                };
            };
        },
        async searchBySubstring(keyword?: string): Promise<Result<typeof animals.$inferSelect[]>>
        {
            try {
                if (!keyword || keyword.trim() === "") 
                {
                    const result = await myDb.query.animals.findMany({
                        where: { deleted: false }
                    });

                    return {
                        success: true,
                        data: result
                    };
                };

                const searchTerm = `%${keyword.trim()}%`;

                const result = await myDb.query.animals.findMany({  
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

                return {
                    success: true,
                    data: result
                };
            } catch(error) {
                console.error(error)
                return {
                    success: false,
                    error: {
                        code: Errors.INTERNAL_SERVER_ERROR,
                        message: "Could not complete search"
                    }
                };
            };
        },
        async searchByKeywords(keyword?: string): Promise<Result<typeof animals.$inferSelect[]>>
        {
            try {
                if (!keyword || keyword.trim() === "") 
                {
                    const result = await myDb.query.animals.findMany({
                        where: { deleted: false }
                    });

                    return {
                        success: true,
                        data: result
                    };
                };

                //Using regex rather than split(" ") to avoid empty string results
                // if the input contains consecutive spaces
                const words = keyword.trim().split(/\s+/).filter(Boolean);

                const result =  await myDb.query.animals.findMany({
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

                return {
                    success: true,
                    data: result
                };
            } catch(error) {
                console.error(error)
                return {
                    success: false,
                    error: {
                        code: Errors.INTERNAL_SERVER_ERROR,
                        message: "Could not complete the search."
                    }
                };
            };

        },
        async update(
            id: string, 
            data: Partial<typeof animals.$inferInsert>): 
            Promise<Result<typeof animals.$inferSelect>>
        {
            try {
                const result = await myDb
                    .update(animals)
                    .set(data)
                    .where(and(
                        eq(animals.id, id),
                        eq(animals.deleted, false)))
                    .returning()

                return {
                    success: true,
                    data: result[0]
                };
            } catch(error) {
                console.error(error)
                return {
                    success: false,
                    error: {
                        code: Errors.NOT_FOUND,
                        message: "Could not update requested resource"
                    }
                };
            };
        },
        async softDelete(id: string): Promise<Result<typeof animals.$inferSelect | null>>
        {
            try {
                const result = (await myDb.update(animals)
                    .set({ deleted: true })
                    .where(eq(animals.id, id))
                    .returning())[0]
 
                return {
                    success: true,
                    data: result ?? null
                };
            } catch(error) {
                console.error(error)
                return {
                    success: false,
                    error: {
                        code: Errors.INTERNAL_SERVER_ERROR,
                        message: "Could not delete the resource."
                    }
                };
            };
        },
        async hardDelete(id: string): Promise<Result<void>>
        {
            try {
                await myDb
                    .delete(animals)
                    .where(eq(animals.id, id));
                
                return {
                    success: true,
                    data: undefined
                };
            } catch(error) {
                console.error(error)
                return {
                    success: false,
                    error: {
                        code: Errors.INTERNAL_SERVER_ERROR,
                        message: "Could not delete the resource"
                    }
                };
            };
        },
    };
};

export const animalRepository = createAnimalRepository(db);
