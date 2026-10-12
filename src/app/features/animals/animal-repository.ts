
import { Result , ResultData} from "@/app/types/result";
import { ResultError } from "@/app/types/errors";
import { Animal } from "./animal-types";

const mockAnimals : Animal[] = [
    {
        name : "Bingo",
        kind: "2",
        nickname: "3",
        dateOfBirth : "4",
        traits: "5",
        housingUnit : "6",
        contactInfo: "7",
        bilder: [],
    },
    {
        name : "Bongo",
        kind: "2",
        nickname: "3",
        dateOfBirth : "4",
        traits: "5",
        housingUnit : "6",
        contactInfo: "7",
        bilder: [],
    },
    {
        name : "Bango",
        kind: "2",
        nickname: "3",
        dateOfBirth : "4",
        traits: "5",
        housingUnit : "6",
        contactInfo: "7",
        bilder: [],
    },
]

export interface AnimalRepository {
    create: (animal: any) => Promise<Result<Animal>>;
    update: (id: string, animal: any) => Promise<Result<Animal>>;
    get: (id: string) => Promise<Result<Animal>>;
    list: () => Promise<Result<Animal[]>>;
    remove: (id: string) => Promise<Result<Animal>>;
};

export function createAnimalRepository(db: any): AnimalRepository{
    return{
        create: async (animal: any) => {
            return {
                success: false,
                error : {
                    code: "INTERNAL_SERVER_ERROR",
                    message: "TODO:"
                }
            }
        },
        update: async (id: string, animal: any) => {
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

export const animalRepository = createAnimalRepository(null)