// Her kommer bedriftslogikken vår
// Her importerer vi Repository
// Her sjekker vi om du får lov til det du prøver å gjøre
// Her mapper vi muligens data for å ha en konsistent struktur
// Her tilgjengeligjør vi funksjonalitet som "actions.ts" og "controller" trenger
import { Result } from "@/shared/types/result";
import { AnimalRepository } from "../../../db/features/animals/animal-repository";
import { animalRepository } from "../../../db/features/animals/animal-repository-instance";
import { Animal, AnimalCreateParams } from "./animal-types";
import { toAnimal } from "./animal-mappers";

export interface AnimalService {
    list(userId: string): Promise<Result<Animal[]>>;
    get(userId: string, id: string): Promise<Result<Animal>>;
    create(userId: string, input: AnimalCreateParams): Promise<Result<Animal>>;
    update(userId: string, id: string, input: Partial<AnimalCreateParams>): Promise<Result<Animal>>;
    remove(userId: string, id: string): Promise<Result<null>>;
}


//TODO: animal type instead of any
export function createAnimalService(repository: AnimalRepository): AnimalService{
    return {
        async list(userId: string)
        {
            //TODO: validation
            //TODO: more internal logic ?
            const result = await repository.getAll();
            if (!result.success) return result;

            return {
                success: true,
                data: result.data.map(animalDb => toAnimal(animalDb, []))
            };
        },
        async get(userId: string, id: string)
        {
            //TODO: validation
            //TODO: more internal logic ?
            const result =  await repository.getById(id);
            if (!result.success) return result;

            return {
                success: true,
                data: toAnimal(result.data, [])
            };
        },
        async create(userID: string, input: AnimalCreateParams){
            //TODO: validation
            //TODO: more internal logic ?
            const result = await repository.create(input);
            if (!result.success) return result;

            return {
                success: true,
                data: toAnimal(result.data, [])
            }
        },
        async update(userId: string, id: string, input: Partial<AnimalCreateParams>){
            //TODO: validation
            //TODO: internal logic
            const result = await repository.updateById(id, input);
            if (!result.success) return result;

            return {
                success: true,
                data: toAnimal(result.data, [])
            };
        },
        async remove(userId: string, id: string){
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