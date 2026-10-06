// Her kommer bedriftslogikken vår
// Her importerer vi Repository
// Her sjekker vi om du får lov til det du prøver å gjøre
// Her mapper vi muligens data for å ha en konsistent struktur
// Her tilgjengeligjør vi funksjonalitet som "actions.ts" og "controller" trenger
import { AnimalRepository, animalRepository } from "./animal-repository";

export interface AnimalService {
    list(user: any): Promise<any>;
    get(user: any, id: string): Promise<any>;
    create(user: any, input: any): Promise<any>;
    update(user: any, id: string, input: any): Promise<any>;
    remove(user: any, id: string): Promise<any>;
}

export function createAnimalService(repository: AnimalRepository): AnimalService{
    return {
        async list(user: any): Promise<any>{

        },
        async get(user: any, id: string): Promise<any>{

        },
        async create(user: any, input: any): Promise<any>{

        },
        async update(user: any, id: string, input: any): Promise<any>{

        },
        async remove(user: any, id: string): Promise<any>{

        },
    };
}

export const animalService = createAnimalService(animalRepository);