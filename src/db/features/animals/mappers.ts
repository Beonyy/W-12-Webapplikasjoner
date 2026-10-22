import type { NewAnimal } from "@app/features/animals/animal-types"
import type { AnimalDb } from "./types"

export function toNewAnimal(animalDb: AnimalDb, images: string[]): NewAnimal {
    return {
        //id: animal.id,
        name: animalDb.name,
        species: animalDb.species,
        nickname: animalDb.nickname ?? "",
        dateOfBirth: new Date(animalDb.dateOfBirth ?? "1900-01-01"),
        characteristics: animalDb.characteristics?.split(",") ?? [],
        housingUnit: animalDb.housingUnit,
        contactInfo: animalDb.contactInfo ?? "",
        profileImageUrl: animalDb.profileImageUrl ?? "",
        images: images
    }
}

export function toNewAnimalDb(animal: NewAnimal): AnimalDb {
    return {
        //id: animal.id,
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

