import { drizzleDatabaseClient } from "@/db";
import { createAnimalRepository } from "./animal-repository";


export const animalRepository = createAnimalRepository(drizzleDatabaseClient);
