import type { Animal } from "../../app/features/animals/types"
import type { AnimalDb } from "./types"

export function toAnimal(animalDb: AnimalDb): Animal {
    return {
        name: animalDb.name,
        kind: animalDb.kind,
        nickname: animalDb.nickname,
        dateOfBirth: new Date (animalDb.dateOfBirth),
        traits: animalDb.traits.split(","),
        housingUnit: animalDb.housingUnit,
        contactInfo: animalDb.contactInfo,
        profileImage: {
            url: animalDb.profileImageKey
        },
    }
}

export function toAnimalDb(animal: Animal): AnimalDb {
    return {
        name: animal.name,
        kind: animal.kind,
        nickname: animal.nickname,
        dateOfBirth: animal.dateOfBirth.toISOString(),
        traits: animal.traits.join(","),
        housingUnit: animal.housingUnit,
        contactInfo: animal.contactInfo,
        profileImageKey: animal.profileImage.url,
    }
}

