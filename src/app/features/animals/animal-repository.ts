
import { Result , ResultData} from "@/shared/types/result";
import { ResultError } from "@/shared/types/errors";
import { Animal } from "./animal-types";

// NYTT: bruk Drizzle-schema + db
import { animals } from "@/db/features/animals/schema"; 
import { db } from "@/db";                     
import { eq } from "drizzle-orm";

const mockAnimals : Animal[] = [
    {
        name : "Bingo",
        species: "2",
        nickname: "3",
        dateOfBirth : "4",
        characteristics: "5",
        housingUnit : "6",
        contactInfo: "7",
        bilder: [],
    },
    {
        name : "Bongo",
        species: "2",
        nickname: "3",
        dateOfBirth : "4",
        characteristics: "5",
        housingUnit : "6",
        contactInfo: "7",
        bilder: [],
    },
    {
        name : "Bango",
        species: "2",
        nickname: "3",
        dateOfBirth : "4",
        characteristics: "5",
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
       //ENDRET
        create: async (animal: Animal) => {
            try {
                // map fra Animal (kind, traits, ...) til DB-skjema (species, characteristics, ...)
                const insertData = {
                    name: animal.name,
                    species: animal.species,
                    nickname: animal.nickname || null,
                    dateOfBirth: animal.dateOfBirth || null,
                    characteristics: animal.characteristics || null,
                    housingUnit: animal.housingUnit,
                    contactInfo: animal.contactInfo || null,
                    profileImageUrl: null, // ikke felt i skjemaet ennå
                    // deleted/createdAt/updatedAt håndteres av defaults i schema
                };

                const result = await db
                    .insert(animals)
                    .values(insertData)
                    .returning();

                const row = result[0];

                // map tilbake til Animal-typen som frontend og resten av koden forventer
                const created: Animal = {
                    name: row.name,
                    species: row.species,
                    nickname: row.nickname ?? "",
                    dateOfBirth: row.dateOfBirth ?? "",
                    characteristics: row.characteristics ?? "",
                    housingUnit: row.housingUnit,
                    contactInfo: row.contactInfo ?? "",
                    bilder: [],
                };

                return {
                    success: true,
                    data: created,
                };
            } catch (error) {
                console.error(error);
                return {
                    success: false,
                    error: {
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Failed to create animal in database",
                    },
                };
            }
        }, //ENDRING FERDIG
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

export const animalRepository = createAnimalRepository(db)