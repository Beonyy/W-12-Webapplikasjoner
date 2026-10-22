import { Result} from "@/shared/types/result";
import { Animal, AnimalCreateParams, AnimalUpdateParams } from "./animal-types";
import { animalDatabase,AnimalDatabase } from "@/db/features/animals/database-api";
import { toAnimal } from "@/db/features/animals/mappers";
// import { create, getById, updateById } from "@/db/features/animals/database-api";

export interface AnimalRepository {
    create: (animalCreateParams: AnimalCreateParams) => Promise<Result<Animal>>;
    update: (id: string, animalUpdateParams: AnimalUpdateParams) => Promise<Result<Animal>>;
    get: (id: string) => Promise<Result<Animal>>;
    list: () => Promise<Result<Animal[]>>;
    remove: (id: string) => Promise<Result<null>>;
};

export function createAnimalRepository(database: AnimalDatabase): AnimalRepository{
    return{
        create: async (animalCreateParams: AnimalCreateParams) => {
            
            const res = await database.create(animalCreateParams)
            if(res.success){
                return {
                    success: true,
                    data: toAnimal(res.data, [])
                }
            }
            return res;
        },

        update: async (id: string, animalUpdateParams: AnimalUpdateParams) => {
            const res = await database.updateById(id, animalUpdateParams)
            if(res.success){
                  return {
                    success: true,
                    data: toAnimal(res.data, [])
                }
            }
            return res;
        },

        get: async (id: string) => {
            const res = await database.getById(id);
             if(res.success){
                  return {
                    success: true,
                    data: toAnimal(res.data, [])
                }
            }
            return res;
        },

        list: async () => {
            const res = await database.getAll();
             if(res.success){
                  return {
                    success: true,
                    data: res.data.map(
                        (item) => toAnimal(item, [])
                    )
                }
            }
            return res;

        },

        remove: async (id: string) => {
            const res = await database.softDelete(id);
            if(res.success){
                  return {
                    success: true,
                    data:null
                }
            }
            return res;
        },
    };
}

export const animalRepository = createAnimalRepository(animalDatabase)