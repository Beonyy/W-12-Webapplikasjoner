// Her inne lager vi funksjoner som brukes i komponenter for å kalle
// Vårt api eller eksternt api

// Bruker ex. apiFetch, axios e.l

// Håndterer feil som kan oppstå med fetch og har en konsistent måte å gjøre dette på

import { makeError} from "@/shared/types/errors";
import { Animal, AnimalCreateParams, isAnimal, isAnimalArray } from "./animal-types";
import { Result } from "@/shared/types/result";
import { apiFetch } from "@/lib/api-fetch";

export interface AnimalApi{
    list(sessionToken:string, keywords?:string): Promise<Result<Animal[]>>;
    get(sessionToken:string, id:string): Promise<Result<Animal>>;
    create(sessionToken:string, animalCreateParams: AnimalCreateParams): Promise<Result<Animal>>;
    update(sessionToken:string, id:string, animal:Animal): Promise<Result<Animal>>;
    action(sessionToken:string): Promise<Result<void>>;
    remove(sessionToken:string, id:string): Promise<Result<void>>;
}


// TODO: Try/catch for hver metode.
// TODO: isAnimal på responsene for ekstra integritetssjekker.
// TODO: userId som et parameter? Eller hentes i metoden?

export function createAnimalApi(): AnimalApi{
    return {
        async list(sessionToken:string, keywords?:string): Promise<Result<Animal[]>>{

            const params = new URLSearchParams();
            params.set("keywords", keywords ?? "");
            const result = await apiFetch(`/api/animals?${params.toString()}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionToken}`
                },
            })
            if(!result.success) return result;

            if(!isAnimalArray(result.data)){
                console.error(result);
                return makeError("INTERNAL_SERVER_ERROR", "Server returned invalid Animal");

            }

            return result as Result<Animal[]>;
        },

        async get(sessionToken:string, id:string): Promise<Result<Animal>>{
            const result = await apiFetch(`/api/animals/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionToken}`
                }
            })
            if(!result.success) return result;

            if (!isAnimal(result.data)){
                console.error("INVALID DATA: ", result.data)

                return makeError("INTERNAL_SERVER_ERROR", "Server returned invalid Animal");
            }

            return result as Result<Animal>;
        },

        async create(sessionToken:string, animalCreateParams: AnimalCreateParams ): Promise<Result<Animal>>{
            const result = await apiFetch('/api/animals',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionToken}`
                },
                body : JSON.stringify(animalCreateParams)
            })
            if(!result.success) return result;


            if (!isAnimal(result.data)){
                console.error("INVALID DATA: ", result)

                return makeError("INTERNAL_SERVER_ERROR", "Server returned invalid Animal");
            }

            return result as Result<Animal>;
        },

        async update(sessionToken:string, id:string, animal:Animal): Promise<Result<Animal>>{
             const result = await apiFetch(`/api/animals/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionToken}`
                },
                body : JSON.stringify(animal)
            })

            if(!result.success) return result;

            if (!isAnimal(result.data)){
                console.error("INVALID DATA: ", result)

                return makeError("INTERNAL_SERVER_ERROR", "Server returned invalid Animal");
            }

            return result as Result<Animal>;
        },

        async action(sessionToken:string): Promise<Result<void>>{
            return makeError("INTERNAL_SERVER_ERROR", "TODO: not implemented yet");
        },
        
        async remove(sessionToken:string, id:string): Promise<Result<void>>{
             const result = await apiFetch(`/api/animals/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionToken}`
                }
            })
            return result as Result<void>
        },
    };
}

export const animalApi = createAnimalApi();