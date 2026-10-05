import { describe, test, expect } from "vitest";
import type { Animal } from "../../../app/features/animals/types";
import type { AnimalDb } from "../types";
import { toAnimal, toAnimalDb } from "../mappers";
import { makeAnimal, makeAnimalDb } from "./helpers";

describe("toAnimal", () => {
    test("converts string to array", () => {
        //Arrange
        const string: string = "spotted belly,white tail tip";
        const animalDb: AnimalDb = makeAnimalDb({ traits: string });

        //Act
        const result: Animal = toAnimal(animalDb);

        //Assert
        expect(result.traits).toEqual(["spotted belly", "white tail tip"]);
    });

});

describe("toAnimalDb", () => {
    test("converts date object to string", () => {
        //Arrange
        const date: Date = new Date("2026-10-10T10:30:00.000Z");
        const animal: Animal = makeAnimal({ dateOfBirth: date });

        //Act
        const result: AnimalDb = toAnimalDb(animal);

        //Assert
        expect(result.dateOfBirth).toBeTypeOf("string");
    });

    test ("converts undefined nickname to null", () => {
        //Arrange
        const animal: Animal = makeAnimal({ 
            nickname: undefined,
            traits: undefined,
            contactInfo: undefined 
        });

        //Act
        const result: AnimalDb = toAnimalDb(animal);

        //Assert
        expect(result.nickname).toBeNull();
        expect(result.traits).toBeNull();
        expect(result.contactInfo).toBeNull();
    });
});

test ("converts from Animal to AnimalDb and back", () => {
    //Arrange
    const originalAnimal = makeAnimal({ 
        nickname: null,
        traits: ["spotted belly", "white tail tip"],
        dateOfBirth: new Date("2026-05-10T00:00:00.000Z")
    });

    //Act
    const animalDb = toAnimalDb(originalAnimal);
    const finalAnimal = toAnimal(animalDb);

    //Assert
    expect(finalAnimal).toEqual(originalAnimal);
});

test("converts from AnimalDb to Animal and back", () => {
    //Arrange
    const originalAnimalDb = makeAnimalDb({ 
        nickname: null, 
        traits: "spotted belly,white tail tip", 
        dateOfBirth: "2026-05-10T00:00:00.000Z"
    });

    //Act
    const animal = toAnimal(originalAnimalDb);
    const finalAnimalDb = toAnimalDb(animal);

    //Assert
    expect(finalAnimalDb).toEqual(originalAnimalDb);
});