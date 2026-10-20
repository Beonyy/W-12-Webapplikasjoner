// Her inne lager vi funksjoner som brukes i komponenter for å kalle
// Vårt api eller eksternt api

// Bruker ex. fetch, axios e.l

// Håndterer feil som kan oppstå med fetch og har en konsistent måte å gjøre dette på

import { Animal, AnimalCreateParams } from "./animal-types";
import { Result } from "@/shared/types/result";

export interface AnimalApi{
    list(): Promise<Result<Animal[]>>;
    get(id:string): Promise<Result<Animal>>;
    create(animalCreateParams: AnimalCreateParams): Promise<Result<void>>;
    update(id:string, animal:Animal): Promise<Result<void>>;
    action(): Promise<Result<void>>;
    remove(id:string): Promise<Result<void>>;
}


// TODO: Try/catch for hver metode.
// TODO: isAnimal på responsene for ekstra integritetssjekker.
// TODO: userId som et parameter? Eller hentes i metoden?

export function createAnimalApi(): AnimalApi{
    return {
        async list(): Promise<Result<Animal[]>>{
            const response = await fetch(`/api/animals`,{
                method: 'GET',
            })
            if(!response.ok){
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:""}};
            }
            return { success:true, data: await response.json() }
        },

        async get(id:string): Promise<Result<Animal>>{
            const response = await fetch(`/api/animals/${id}`,{
                method: 'GET',
            })
            if(!response.ok){
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:""}};
            }
            return { success:true, data: await response.json() }
        },

        async create(animalCreateParams: AnimalCreateParams ): Promise<Result<void>>{
            const response = await fetch('/api/animals',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body : JSON.stringify(animalCreateParams)
            })
            if(!response.ok){
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:""}};
            }
            return { success:true, data: await response.json() }
        },

        async update(id:string, animal:Animal): Promise<Result<void>>{
             const response = await fetch(`/api/animals/${id}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body : JSON.stringify(animal)
            })
            if(!response.ok){
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:""}};
            }
            return { success:true, data: await response.json() }
        },

        async action(): Promise<Result<void>>{
            return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:""}};
        },
        
        async remove(id:string): Promise<Result<void>>{
             const response = await fetch(`/api/animals/${id}`,{
                method: 'DELETE',
            })
            if(!response.ok){
                return {success: false, error: {code:"INTERNAL_SERVER_ERROR", message:""}};
            }
            return { success:true, data: await response.json() }

        },
    };
}

const animalApi = createAnimalApi();