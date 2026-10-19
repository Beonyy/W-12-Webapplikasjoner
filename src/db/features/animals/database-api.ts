import { animals } from "@/db/features/animals/schema";
import { eq, and } from "drizzle-orm";
import { clientDatabase, Database } from "@/db";
import { Result } from "@shared/types/result";
import { Errors } from "@shared/types/errors";


export async function create(database: Database, data: typeof animals.$inferInsert): Promise<Result<typeof animals.$inferSelect>> {
    try {
        const result = await database
            .insert(animals)
            .values(data)
            .returning();

        return {
            success: true,
            data: result[0]
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: {
                code: Errors.INTERNAL_SERVER_ERROR,
                message: "Failed to create new entry."
            }
        };
    };
}
export async function getById(database: Database, id: string): Promise<Result<typeof animals.$inferSelect[]>> {
    try {
        const result = await database.query.animals.findMany({
            where: { id }
        });
        return {
            success: true,
            data: result
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: {
                code: Errors.NOT_FOUND,
                message: "Could not find requested ID."
            }
        };
    };
}
//get all EXCEPT the soft deleted entries
export async function getAll(database: Database, ): Promise<Result<typeof animals.$inferSelect[]>> {
    try {
        const result = await database.query.animals.findMany({
            where: { deleted: false }
        });

        return {
            success: true,
            data: result
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: {
                code: Errors.INTERNAL_SERVER_ERROR,
                message: "Could not return requested data"
            }
        };
    };
}
export async function searchBySubstring(database: Database, keyword?: string): Promise<Result<typeof animals.$inferSelect[]>> {
    try {
        if (!keyword || keyword.trim() === "") {
            const result = await database.query.animals.findMany({
                where: { deleted: false }
            });

            return {
                success: true,
                data: result
            };
        };

        const searchTerm = `%${keyword.trim()}%`;

        const result = await database.query.animals.findMany({
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
    } catch (error) {
        console.error(error)
        return {
            success: false,
            error: {
                code: Errors.INTERNAL_SERVER_ERROR,
                message: "Could not complete search"
            }
        };
    };
}
export async function searchByKeywords(database: Database, keyword?: string): Promise<Result<typeof animals.$inferSelect[]>> {
    try {
        if (!keyword || keyword.trim() === "") {
            const result = await database.query.animals.findMany({
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

        const result = await database.query.animals.findMany({
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
    } catch (error) {
        console.error(error)
        return {
            success: false,
            error: {
                code: Errors.INTERNAL_SERVER_ERROR,
                message: "Could not complete the search."
            }
        };
    };

}
export async function updateById(database: Database, 
    id: string,
    data: Partial<typeof animals.$inferInsert>):
    Promise<Result<typeof animals.$inferSelect>> {
    try {
        const result = await database
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
    } catch (error) {
        console.error(error)
        return {
            success: false,
            error: {
                code: Errors.NOT_FOUND,
                message: "Could not update requested resource"
            }
        };
    };
}
export async function softDelete(database: Database, id: string): Promise<Result<typeof animals.$inferSelect | null>> {
    try {
        const result = (await database.update(animals)
            .set({ deleted: true })
            .where(eq(animals.id, id))
            .returning())[0]

        return {
            success: true,
            data: result ?? null
        };
    } catch (error) {
        console.error(error)
        return {
            success: false,
            error: {
                code: Errors.INTERNAL_SERVER_ERROR,
                message: "Could not delete the resource."
            }
        };
    };
}
export async function hardDelete(database: Database, id: string): Promise<Result<void>> {
    try {
        await database
            .delete(animals)
            .where(eq(animals.id, id));

        return {
            success: true,
            data: undefined
        };
    } catch (error) {
        console.error(error)
        return {
            success: false,
            error: {
                code: Errors.INTERNAL_SERVER_ERROR,
                message: "Could not delete the resource"
            }
        };
    };
}

