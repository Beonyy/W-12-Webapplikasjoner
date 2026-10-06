import { Animal } from "./animal-types";


const mockAnimals : Animal[] = [
    {
        name : "1",
        kind: "2",
        nickname: "3",
        dateOfBirth : "4",
        traits: "5",
        housingUnit : "6",
        contactInfo: "7",
        bilder: [],
    }
]

export interface AnimalRepository {
    create: (animal: any) => Promise<any>;
    update: (id: string, animal: any) => Promise<any>;
    get: (id: string) => Promise<any>;
    list: () => Promise<any>;
    remove: (id: string) => Promise<any>;
};

export function createAnimalRepository(db: any): AnimalRepository{
    return{
        create: async (animal: any) => {},
        update: async (id: string, animal: any) => {},
        get: async (id: string) => {},
        list: async () => {},
        remove: async (id: string) => {},
    };
}

export const animalRepository = createAnimalRepository(null)