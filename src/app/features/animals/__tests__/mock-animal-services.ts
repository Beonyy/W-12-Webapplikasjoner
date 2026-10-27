import { createAnimalService } from "../animal-services";
import { mockAnimalRepository } from "./mock-animal-repository";


export const mockAnimalService = createAnimalService(mockAnimalRepository);