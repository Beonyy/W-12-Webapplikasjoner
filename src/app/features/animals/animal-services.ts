// Her kommer bedriftslogikken vår
// Her importerer vi Repository
// Her sjekker vi om du får lov til det du prøver å gjøre
// Her mapper vi muligens data for å ha en konsistent struktur
// Her tilgjengeligjør vi funksjonalitet som "actions.ts" og "controller" trenger
import { Result } from "@/shared/types/result";
import { AnimalRepository, animalRepository } from "./animal-repository";
import { Animal, AnimalCreateParams } from "./animal-types";

export interface AnimalService {
    list(sessionToken: string): Promise<Result<Animal[]>>;
    get(sessionToken: string, id: string): Promise<Result<Animal>>;
    create(sessionToken: string, input: AnimalCreateParams): Promise<Result<Animal>>;
    update(sessionToken: string, id: string, input: any): Promise<Result<Animal>>;
    remove(sessionToken: string, id: string): Promise<Result<null>>;
}


//TODO: animal type instead of any
export function createAnimalService(repository: AnimalRepository): AnimalService{
    return {
        async list(sessionToken: string){
            //TODO: validation
            //TODO: internal logic
            return await repository.list()
        },
        async get(sessionToken: string, id: string){
            //TODO: validation
            //TODO: internal logic
            return await repository.get(id);
        },
        async create(sessionToken: string, input: AnimalCreateParams){
            //TODO: validation
            //TODO: internal logic
            return await repository.create(input);
        },
        async update(sessionToken: string, id: string, input: any){
            //TODO: validation
            //TODO: internal logic
            return await repository.update(id, input);
        },
        async remove(sessionToken: string, id: string){
            //TODO: validation
            //TODO: internal logic
            return await repository.remove(id);
        },
    };
}

export const animalService = createAnimalService(animalRepository);