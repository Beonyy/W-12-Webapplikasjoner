import { animals } from "@/db/features/animals/animal-schema";
import { eq, and } from "drizzle-orm";
import { Database, drizzleDatabaseClient } from "@/db";
import { Result } from "@shared/types/result";
import { Errors } from "@shared/types/errors";
import { AnimalDb } from "./animal-types";
import { AnimalCreateParams } from "@/app/features/animals/animal-types";

export interface AnimalRepository {
    insert(data: AnimalCreateParams):Promise<Result<AnimalDb>>;
    getById(id: string):Promise<Result<AnimalDb>>;
    updateById(id: string, data: Partial<AnimalCreateParams>):Promise<Result<AnimalDb>>;
    getAll():Promise<Result<AnimalDb[]>>;
    softDelete(id: string): Promise<Result<AnimalDb | null>>;
    hardDelete(id: string): Promise<Result<null>> ;
    searchByKeywords(keyword?: string): Promise<Result<AnimalDb[]>>;
}

export function createAnimalRepository(database: Database): AnimalRepository {
    return {
        async insert(data: AnimalCreateParams): Promise<Result<AnimalDb>> {
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
        },
        async getById(id: string): Promise<Result<AnimalDb>> {

            try {
                const result = await database.query.animals.findFirst({
                    where: {id, deleted: false}
                });

                if (!result){
                    return {
                        success: false,
                        error: {
                            code: Errors.NOT_FOUND,
                            message: "Could not find requested ID."
                        }
                    };
                }
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
                        message: "An error occurred while retrieving the resource."
                    }
                };
            };
        },
        //get all EXCEPT the soft deleted entries
        async getAll(): Promise<Result<AnimalDb[]>> {
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
        },
        async searchByKeywords(keyword?: string): Promise<Result<AnimalDb[]>> {
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
                        OR: words.flatMap(word => {
                            const searchTerm = `%${word}%`;
                            return {
                                OR: [
                                    { name: { like: searchTerm } },
                                    { species: { like: searchTerm } },
                                    { characteristics: { like: searchTerm } },
                                    { nickname: { like: searchTerm } },
                                    { housingUnit: { like: searchTerm } },
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

        },
        async updateById(id: string, data: Partial<AnimalCreateParams>):Promise<Result<AnimalDb>> {
            try {
                // avoids unecessary db-calls that don't change anything
                if (Object.keys(data).length === 0) {
                    return {
                        success: false,
                        error: {
                            code: Errors.BAD_REQUEST,
                            message: "Update payload cannot be empty"
                        }
                    }
                }

                const result = await database
                    .update(animals)
                    .set(data)
                    .where(and(
                        eq(animals.id, id),
                        eq(animals.deleted, false)))
                    .returning()

                if (!result[0]) {
                    return {
                        success: false,
                        error: {
                            code: Errors.NOT_FOUND,
                            message: "Animal not found"
                        }
                    }
                }

                return {
                    success: true,
                    data: result[0]
                };
            } catch (error) {
                console.error(error)
                return {
                    success: false,
                    error: {
                        code: Errors.INTERNAL_SERVER_ERROR,
                        message: "Could not update requested resource"
                    }
                };
            };
        },
        async softDelete(id: string): Promise<Result<AnimalDb | null>> {
            try {
                const result = (await database.update(animals)
                    .set({ deleted: true })
                    .where(and(
                        eq(animals.id, id),
                        eq(animals.deleted, false)))
                    .returning())[0]
            
                if (!result) {
                    return {
                        success: false,
                        error: {
                            code: Errors.NOT_FOUND,
                            message: "Animal not found"
                        }
                    }
                }

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
                        message: "Could not delete the resource."
                    }
                };
            };
        },
        async hardDelete(id: string): Promise<Result<null>> {
            try {
                const result = (await database
                    .delete(animals)
                    .where(eq(animals.id, id))
                    .returning())[0];
                
                if (!result) {
                    return {
                        success: false,
                        error: {
                            code: Errors.NOT_FOUND,
                            message: "Animal not found"
                        }
                    }
                }

                return {
                    success: true,
                    data: null
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
    }
}

export const animalRepository = createAnimalRepository(drizzleDatabaseClient);