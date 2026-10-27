import { AnimalRepository } from "@/db/features/animals/animal-repository";
import { AnimalDb } from "@/db/features/animals/animal-types";
import { Result } from "@/shared/types/result";

const mockAnimals : AnimalDb[] = [];
export const mockAnimalRepository : AnimalRepository = {

    async create(data: AnimalDb):Promise<Result<AnimalDb>>{
        mockAnimals.push(data);
        return {
            success:true,
            data: data
        }
    },
    async getById(id: string):Promise<Result<AnimalDb>>{
        for ( const animal of mockAnimals){
            if (animal.id === id){
                return {
                    success:true,
                    data: animal
                }
                
            }
        }
        return {
            success:false,
            error:{code: "NOT_FOUND", message: "no such animal"}
        }
    },
    async updateById(id: string, data: Partial<AnimalDb>):Promise<Result<AnimalDb>>{
        for (let i = 0; i < mockAnimals.length; i++) {
            const animal = mockAnimals[i];
            if (animal.id === id){
                mockAnimals[i] = {...animal, ...data};
                return {
                    success:true,
                    data: mockAnimals[i]
                }
                
            }
        }
        return {
            success:false,
            error:{code: "NOT_FOUND", message: "no such animal"}
        }

    },
    async getAll():Promise<Result<AnimalDb[]>>{
        return {
                    success:true,
                    data: mockAnimals
                }

    },
    async softDelete(id: string): Promise<Result<AnimalDb | null>>{
        for (let i = 0; i < mockAnimals.length; i++) {
            const animal = mockAnimals[i];
            if (animal.id === id){
                mockAnimals[i].deleted = true;
                return {
                    success:true,
                    data: mockAnimals[i]
                }
                
            }
        }
        return {
            success:false,
            error:{code: "NOT_FOUND", message: "no such animal"}
        }

    },
    async hardDelete(id: string): Promise<Result<null>> {
         for (let i = 0; i < mockAnimals.length; i++) {
            const animal = mockAnimals[i];
            if (animal.id === id){
                mockAnimals.splice(1,i);
                return {
                    success:true,
                    data: null
                }
                
            }
        }
        return {
            success:false,
            error:{code: "NOT_FOUND", message: "no such animal"}
        }
    }

}
