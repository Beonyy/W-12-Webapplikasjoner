// Her kommer bedriftslogikken vår
// Her importerer vi Repository
// Her sjekker vi om du får lov til det du prøver å gjøre
// Her mapper vi muligens data for å ha en konsistent struktur
// Her tilgjengeligjør vi funksjonalitet som "actions.ts" og "controller" trenger
import { Result } from "@/app/types/result";
import { AnimalRepository, animalRepository } from "./animal-repository";
import { Animal } from "./animal-types";

export interface AnimalService {
    list(user: any): Promise<Result<Animal[]>>;
    get(user: any, id: string): Promise<Result<Animal>>;
    create(user: any, input: any): Promise<Result<Animal>>;
    update(user: any, id: string, input: any): Promise<Result<Animal>>;
    remove(user: any, id: string): Promise<Result<Animal>>;
}


//TODO: animal type instead of any
export function createAnimalService(repository: AnimalRepository): AnimalService{
    return {
        async list(user: any){
            //TODO: validation
            //TODO: internal logic
            return await repository.list()
        },
        async get(user: any, id: string){
            //TODO: validation
            //TODO: internal logic
            return await repository.get(id);
        },
        async create(user: any, input: any){
            //TODO: validation
            //TODO: internal logic
            return await repository.create(input);
        },
        async update(user: any, id: string, input: any){
            //TODO: validation
            //TODO: internal logic
            return await repository.update(id, input);
        },
        async remove(user: any, id: string){
            //TODO: validation
            //TODO: internal logic
            return await repository.remove(id);
        },
    };
}

export const animalService = createAnimalService(animalRepository);