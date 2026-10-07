import type { Animal } from "../../app/features/animals/types"
import type { AnimalDb } from "./types"

export function toAnimal(animalDb: AnimalDb): Animal {
    return {
        id: animalDb.id,
        name: animalDb.name,
        species: animalDb.species,
        nickname: animalDb.nickname,
        dateOfBirth: animalDb.dateOfBirth ? new Date (animalDb.dateOfBirth) : null,
        characteristics: animalDb.characteristics ? animalDb.characteristics.split(",") : null,
        housingUnit: animalDb.housingUnit,
        contactInfo: animalDb.contactInfo,
        profileImageUrl: animalDb.profileImageUrl
    }
}

export function toAnimalDb(animal: Animal): AnimalDb {
    return {
        id: animal.id,
        name: animal.name,
        species: animal.species,
        nickname: animal.nickname ?? null,
        dateOfBirth: animal.dateOfBirth ? animal.dateOfBirth.toISOString() : null,
        characteristics: animal.characteristics ? animal.characteristics.join(",") : null,
        housingUnit: animal.housingUnit,
        contactInfo: animal.contactInfo ? animal.contactInfo : null,
        profileImageUrl: animal.profileImageUrl ? animal.profileImageUrl : null,
    }
}

