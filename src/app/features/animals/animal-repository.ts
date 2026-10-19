
import { Result , ResultData} from "@/shared/types/result";
import { ResultError } from "@/shared/types/errors";
import { Animal, AnimalCreateParams, AnimalUpdateParams } from "./animal-types";
import { clientDatabase, Database } from "@/db";
import { create, updateById } from "@/db/features/animals/database-api";

// const mockAnimals : Animal[] = [
//     {
//         name : "Bingo",
//         kind: "2",
//         nickname: "3",
//         dateOfBirth : "4",
//         traits: "5",
//         housingUnit : "6",
//         contactInfo: "7",
//         bilder: [],
//     },
//     {
//         name : "Bongo",
//         kind: "2",
//         nickname: "3",
//         dateOfBirth : "4",
//         traits: "5",
//         housingUnit : "6",
//         contactInfo: "7",
//         bilder: [],
//     },
//     {
//         name : "Bango",
//         kind: "2",
//         nickname: "3",
//         dateOfBirth : "4",
//         traits: "5",
//         housingUnit : "6",
//         contactInfo: "7",
//         bilder: [],
//     },
// ]

export interface AnimalRepository {
    create: (animalCreateParams: AnimalCreateParams) => Promise<Result<Animal>>;
    update: (id: string, animalUpdateParams: AnimalUpdateParams) => Promise<Result<Animal>>;
    get: (id: string) => Promise<Result<Animal>>;
    list: () => Promise<Result<Animal[]>>;
    remove: (id: string) => Promise<Result<Animal>>;
};

export function createAnimalRepository(database: Database): AnimalRepository{
    return{
        create: async (animalCreateParams: AnimalCreateParams) => {

            create(database, animalCreateParams)
            return {
                success: false,
                error : {
                    code: "INTERNAL_SERVER_ERROR",
                    message: "TODO:"
                }
            }
        },
        update: async (id: string, animalUpdateParams: AnimalUpdateParams) => {
            updateById(id, animalUpdateParams)
            return {
                success: false,
                error : {
                    code: "INTERNAL_SERVER_ERROR",
                    message: "TODO:"
                }
            }
        },
        get: async (id: string) => {
            if (id!= "0") {
                return {
                    success: false,
                    error : {
                        code: "NOT_FOUND",
                        message: "TODO:"
                    }
                }
            }
            const animal = mockAnimals[0];

            return {
                success: true,
                data: animal,
            }
        },
        list: async () => {

            return {
                success : true,
                data : mockAnimals
            }
        },
        remove: async (id: string) => {
            return {
                success: false,
                error : {
                    code: "INTERNAL_SERVER_ERROR",
                    message: "TODO:"
                }
            }
        },
    };
}

export const animalRepository = createAnimalRepository(clientDatabase)