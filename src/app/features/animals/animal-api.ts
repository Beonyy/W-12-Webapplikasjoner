// Her inne lager vi funksjoner som brukes i komponenter for å kalle
// Vårt api eller eksternt api

// Bruker ex. fetch, axios e.l

// Håndterer feil som kan oppstå med fetch og har en konsistent måte å gjøre dette på

import { Animal, AnimalCreateParams, isAnimal, isAnimalArray } from "./animal-types";
import { Result } from "@/shared/types/result";

export interface AnimalApi{
    list(sessionToken:string): Promise<Result<Animal[]>>;
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
        async list(sessionToken:string): Promise<Result<Animal[]>>{
            const response = await fetch(`/api/animals`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionToken}`
                }
            })
            if(!response.ok){
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:`Request failed with status ${response.status}`}};
            }

            let data: unknown;
            try{
                data = await response.json()
            }catch{
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:"Server returned invalid JSON"}};
            }
            if(!isAnimalArray(data)){
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:"Server returned invalid Animal"}};
            }

            return { success:true, data: data}
        },

        async get(sessionToken:string, id:string): Promise<Result<Animal>>{
            const response = await fetch(`/api/animals/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionToken}`
                }
            })
            if(!response.ok){
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:`Request failed with status ${response.status}`}};
            }

            let data: unknown;
            try{
                data = await response.json()
            }catch{
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:"Server returned invalid JSON"}};
            }
            if (!isAnimal(data)){
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:"Server returned invalid Animal"}};
            }

            return { success:true, data: data}
        },

        async create(sessionToken:string, animalCreateParams: AnimalCreateParams ): Promise<Result<Animal>>{
            const response = await fetch('/api/animals',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionToken}`
                },
                body : JSON.stringify(animalCreateParams)
            })
            if(!response.ok){
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:`Request failed with status ${response.status}`}};
            }

            let data: unknown;
            try{
                data = await response.json()
            }catch{
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:"Server returned invalid JSON"}};
            }
            if (!isAnimal(data)){
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:"Server returned invalid Animal"}};
            }

            return { success:true, data: data}
        },

        async update(sessionToken:string, id:string, animal:Animal): Promise<Result<Animal>>{
             const response = await fetch(`/api/animals/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionToken}`
                },
                body : JSON.stringify(animal)
            })
            if(!response.ok){
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:`Request failed with status ${response.status}`}};
            }

            let data: unknown;
            try{
                data = await response.json()
            }catch{
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:"Server returned invalid JSON"}};
            }
            if (!isAnimal(data)){
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:"Server returned invalid Animal"}};
            }

            return { success:true, data: data}
        },

        async action(sessionToken:string): Promise<Result<void>>{
            return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:"TODO: not implemented yet"}};
        },
        
        async remove(sessionToken:string, id:string): Promise<Result<void>>{
             const response = await fetch(`/api/animals/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionToken}`
                }
            })
            if(!response.ok){
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:`Request failed with status ${response.status}`}};
            }
            return { success:true, data: await response.json() }

        },
    };
}

export const animalApi = createAnimalApi();