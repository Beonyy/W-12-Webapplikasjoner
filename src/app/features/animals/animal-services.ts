// Her kommer bedriftslogikken vår
// Her importerer vi Repository
// Her sjekker vi om du får lov til det du prøver å gjøre
// Her mapper vi muligens data for å ha en konsistent struktur
// Her tilgjengeligjør vi funksjonalitet som "actions.ts" og "controller" trenger
import { Result } from "@/shared/types/result";
import { AnimalRepository } from "../../../db/features/animals/animal-repository";
import { animalRepository } from "../../../db/features/animals/animal-repository"
import { Animal, AnimalCreateParams } from "./animal-types";
import { toAnimal } from "./animal-mappers";

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
            //TODO: more internal logic ?
            const result = await repository.getAll();
            if (!result.success) return result;

            return {
                success: true,
                data: result.data.map(animalDb => toAnimal(animalDb, []))
            };
        },
        async get(sessionToken: string, id: string){
            //TODO: validation
            //TODO: more internal logic ?
            const result =  await repository.getById(id);
            if (!result.success) return result;

            return {
                success: true,
                data: toAnimal(result.data, [])
            };
        },
        async create(sessionToken: string, input: AnimalCreateParams){
            //TODO: validation
            //TODO: more internal logic ?
            const result = await repository.insert(input);
            if (!result.success) return result;

            return {
                success: true,
                data: toAnimal(result.data, [])
            }
        },
        async update(sessionToken: string, id: string, input: any){
            //TODO: validation
            //TODO: internal logic
            const result = await repository.updateById(id, input);
            if (!result.success) return result;

            return {
                success: true,
                data: toAnimal(result.data, [])
            };
        },
        async remove(sessionToken: string, id: string){
            //TODO: validation
            //TODO: internal logic
            const result = await repository.softDelete(id);
            if (!result.success) return result;

            return {
                success: true,
                data: null
            }
        },
    };
}

export const animalService = createAnimalService(animalRepository);