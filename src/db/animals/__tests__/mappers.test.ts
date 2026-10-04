import { describe, test, expect } from "vitest";
import type { Animal } from "../../../app/features/animals/types";
import type { AnimalDb } from "../types";
import { toAnimal, toAnimalDb } from "../mappers";
import { makeAnimal, makeAnimalDb } from "./helpers";

describe("toAnimal", () => {
    test("converts date string to Date object", () => {
        //Arrange
        const date: string = "2026-03-10T00:00:00.000Z";
        const animalDb: AnimalDb = makeAnimalDb({ dateOfBirth: date })

        //Act
        const result: Animal = toAnimal(animalDb);

        //Assert
        expect(result.dateOfBirth).toEqual(new Date(date));
    });

    test("converts comma-separated string to array", () => {
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
        expect(result.dateOfBirth).toBe(date.toISOString())
    });

    test ("converts array to comma-separated string", () => {
        //Arrange
        const array: Array<string> = ["spotted belly", "white tail tip"];
        const animal: Animal = makeAnimal({ traits: array });
        
        //Act
        const result: AnimalDb = toAnimalDb(animal);

        //Assert
        expect(result.traits).toBe("spotted belly,white tail tip");
    });

    test ("converts undefined nickname to null", () => {
        //Arrange
        const animal: Animal = makeAnimal({ nickname: undefined });

        //Act
        const result: AnimalDb = toAnimalDb(animal);

        //Assert
        expect(result.nickname).toBeNull();
    });

        test ("converts undefined traits to null", () => {
        //Arrange
        const animal: Animal = makeAnimal({ traits: undefined });

        //Act
        const result: AnimalDb = toAnimalDb(animal);

        //Assert
        expect(result.traits).toBeNull();
    });

        test ("converts undefined contactInfo to null", () => {
        //Arrange
        const animal: Animal = makeAnimal({ contactInfo: undefined });

        //Act
        const result: AnimalDb = toAnimalDb(animal);

        //Assert
        expect(result.contactInfo).toBeNull();
    })
});

test ("converts from Animal to AnimalDb and back", () => {
    //Arrange
    const originalAnimal = makeAnimal({ nickname: null });

    //Act
    const animalDb = toAnimalDb(originalAnimal);
    const finalAnimal = toAnimal(animalDb);

    //Assert
    expect(finalAnimal).toEqual(originalAnimal);
});