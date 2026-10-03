import { describe, test, expect } from "vitest";
import type { Animal } from "../../../app/features/animals/types";
import type { AnimalDb } from "../types";
import { toAnimal, toAnimalDb } from "../mappers";

function makeAnimal(overrides: Partial<Animal> = {}): Animal {
       return {
            id: 1,
            name: "Napolion",
            kind: "cat",
            nickname: undefined,
            dateOfBirth: null,
            traits: null,
            housingUnit: "H1404",
            contactInfo: null,
            profileImageUrl: null,
            ...overrides,
       }
}

function makeAnimalDb(overrides: Partial<AnimalDb> = {}): AnimalDb {
    return {
        id: 1,
        name: "Napolion",
        kind: "cat",
        nickname: null,
        dateOfBirth: null,
        traits: null,
        housingUnit: "H1404",
        contactInfo: null,
        profileImageUrl: null,
        ...overrides,
    }
}


describe("toAnimal", () => {
    test("converts date string to Date object", () => {
        const date: string = "2026-03-10T00:00:00.000Z";
        const animalDb: AnimalDb = makeAnimalDb({ dateOfBirth: date })

        const result: Animal = toAnimal(animalDb);

        expect(result.dateOfBirth).toEqual(new Date(date));
    });

    test("converts comma-separated string to array", () => {
        const string: string = "spotted belly,white tail tip";
        const animalDb: AnimalDb = makeAnimalDb({ traits: string });

        const result: Animal = toAnimal(animalDb);

        expect(result.traits).toEqual(["spotted belly", "white tail tip"]);
    });

});

describe("toAnimalDb", () => {
    test("converts date object to string", () => {
        const date: Date = new Date("2026-10-10T10:30:00.000Z");
        const animal: Animal = makeAnimal({ dateOfBirth: date });

        const result: AnimalDb = toAnimalDb(animal);

        expect(result.dateOfBirth).toEqual(date.toISOString())
    });

    test ("converts array to comma-separated string", () => {
        const array: Array<string> = ["spotted belly", "white tail tip"];
        const animal: Animal = makeAnimal({ traits: array });

        const result: AnimalDb = toAnimalDb(animal);

        expect(result.traits).toEqual("spotted belly,white tail tip");
    });

    test ("converts undefined nickname to null", () => {
        const animal: Animal = makeAnimal({ nickname: undefined });

        const result: AnimalDb = toAnimalDb(animal);

        expect(result.nickname).toBeNull();
    });

        test ("converts undefined traits to null", () => {
        const animal: Animal = makeAnimal({ traits: undefined });

        const result: AnimalDb = toAnimalDb(animal);

        expect(result.traits).toBeNull();
    });

        test ("converts undefined contactInfo to null", () => {
        const animal: Animal = makeAnimal({ contactInfo: undefined });

        const result: AnimalDb = toAnimalDb(animal);

        expect(result.contactInfo).toBeNull();
    })
});

test ("converts from Animal to AnimalDb and back", () => {
    const originalAnimal = makeAnimal({ nickname: null });

    const animalDb = toAnimalDb(originalAnimal);

    const finalAnimal = toAnimal(animalDb);

    expect(finalAnimal).toEqual(originalAnimal);
});