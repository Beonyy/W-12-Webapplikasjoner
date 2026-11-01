import type { Animal } from "@app/features/animals/animal-types"
import type { AnimalDb } from "../../../db/features/animals/animal-types"

export function toAnimal(animalDb: AnimalDb): Animal {
    return {
        // id: animalDb.id,
        name: animalDb.name,
        species: animalDb.species,
        nickname: animalDb.nickname ?? "",
        dateOfBirth: animalDb.dateOfBirth ?? "1900-01-01",
        // dateOfBirth: animalDb.dateOfBirth ? new Date (animalDb.dateOfBirth) : "",
        characteristics: animalDb.characteristics ?? "",
        housingUnit: animalDb.housingUnit,
        contactInfo: animalDb.contactInfo ?? "",
        profileImageUrl: animalDb.profileImageUrl ?? "",
    }
}

export function toAnimalDb(animal: Animal): AnimalDb {
    return {
        // id: animal.id,
        name: animal.name,
        species: animal.species,
        nickname: animal.nickname ?? null,
        dateOfBirth: animal.dateOfBirth,
        characteristics: animal.characteristics,
        housingUnit: animal.housingUnit,
        contactInfo: animal.contactInfo,
        profileImageUrl: animal.profileImageUrl,
    }
}

