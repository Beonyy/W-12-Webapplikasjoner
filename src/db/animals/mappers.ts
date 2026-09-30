import type { Animal } from "../../app/features/animals/types"
import type { AnimalDb } from "./types"

export function toAnimal(animalDb: AnimalDb): Animal {
    return {
        id: animalDb.id,
        name: animalDb.name,
        kind: animalDb.kind,
        nickname: animalDb.nickname,
        dateOfBirth: animalDb.dateOfBirth ? new Date (animalDb.dateOfBirth) : null,
        traits: animalDb.traits ? animalDb.traits.split(",") : null,
        housingUnit: animalDb.housingUnit,
        contactInfo: animalDb.contactInfo,
        profileImageUrl: animalDb.profileImageUrl
    }
}

export function toAnimalDb(animal: Animal): AnimalDb {
    return {
        id: animal.id,
        name: animal.name,
        kind: animal.kind,
        nickname: animal.nickname ?? null,
        dateOfBirth: animal.dateOfBirth ? animal.dateOfBirth.toISOString() : null,
        traits: animal.traits ? animal.traits.join(",") : null,
        housingUnit: animal.housingUnit,
        contactInfo: animal.contactInfo ? animal.contactInfo : null,
        profileImageUrl: animal.profileImageUrl ? animal.profileImageUrl : null,
    }
}

