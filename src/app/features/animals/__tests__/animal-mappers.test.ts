import { describe, test, expect } from "vitest";
import type { Animal } from "../animal-types";
import type { AnimalDb } from "../../../../db/features/animals/animal-types";
import { toAnimal, toAnimalDb } from "../animal-mappers";
import { makeAnimal, makeAnimalDb } from "../../../../db/features/animals/__tests__/helpers";

// describe("toAnimal", () => {
//     test("converts string to array", () => {
//         //Arrange
//         const string: string = "spotted belly,white tail tip";
//         const animalDb: AnimalDb = makeAnimalDb({ characteristics: string });

//         //Act
//         const result: Animal = toAnimal(animalDb);

//         //Assert
//         expect(result.characteristics).toEqual(["spotted belly", "white tail tip"]);
//     });

// });

describe("toAnimalDb", () => {
    test("converts date object to string", () => {
        //Arrange
        const date: Date = new Date("2026-10-10T10:30:00.000Z");
        const animal: Animal = makeAnimal({ dateOfBirth: date.toISOString()});

        //Act
        const result: AnimalDb = toAnimalDb(animal);

        //Assert
        expect(result.dateOfBirth).toBeTypeOf("string");
    });

    // (TGF) NOTE: Idk if this is valid typescript when you make something undefined?
    // I think it just fucks the typesystem. 
    // test ("converts undefined nickname to null", () => {
    //     //Arrange
    //     const animal: Animal = makeAnimal({ 
    //         nickname: undefined,
    //         characteristics: undefined,
    //         contactInfo: undefined 
    //     });

    //     //Act
    //     const result: AnimalDb = toAnimalDb(animal);

    //     //Assert
    //     expect(result.nickname).toBeNull();
    //     expect(result.characteristics).toBeNull();
    //     expect(result.contactInfo).toBeNull();
    // });
});

test ("converts from Animal to AnimalDb and back", () => {
    //Arrange
    const originalAnimal = makeAnimal({ 
        nickname: "",
        characteristics: "spotted belly, white tail tip",
        dateOfBirth: "2026-05-10T00:00:00.000Z"
    });

    //Act
    const animalDb = toAnimalDb(originalAnimal);
    const finalAnimal = toAnimal(animalDb);

    //Assert
    // (TGF) NOTE: can't do deep equality comparison here. Not all of animalDb's member variables are a part of Animal.
    expect(originalAnimal.name).toEqual(finalAnimal.name);
    expect(originalAnimal.species).toEqual(finalAnimal.species);
    expect(originalAnimal.nickname).toBeOneOf([finalAnimal.nickname,null]);
    expect(originalAnimal.dateOfBirth).toEqual(finalAnimal.dateOfBirth);
    expect(originalAnimal.characteristics).toBeOneOf([finalAnimal.characteristics, null]);
    expect(originalAnimal.housingUnit).toEqual(finalAnimal.housingUnit);
    expect(originalAnimal.contactInfo).toEqual(finalAnimal.contactInfo);
    expect(originalAnimal.profileImageUrl).toEqual(finalAnimal.profileImageUrl);
});

test("converts from AnimalDb to Animal and back", () => {
    //Arrange
    const originalAnimalDb = makeAnimalDb({ 
        nickname: null, 
        characteristics: "spotted belly,white tail tip", 
        dateOfBirth: "2026-05-10T00:00:00.000Z"
    });

    //Act
    const animal = toAnimal(originalAnimalDb);
    const finalAnimalDb = toAnimalDb(animal);

    //Assert
    // (TGF) NOTE: can't do deep equality comparison here. Not all of animalDb's member variables are a part of Animal.
    expect(originalAnimalDb.name).toEqual(finalAnimalDb.name);
    expect(originalAnimalDb.species).toEqual(finalAnimalDb.species);
    expect(originalAnimalDb.nickname).toBeOneOf([finalAnimalDb.nickname,null]);
    expect(originalAnimalDb.dateOfBirth).toEqual(finalAnimalDb.dateOfBirth);
    expect(originalAnimalDb.characteristics).toBeOneOf([finalAnimalDb.characteristics, null]);
    expect(originalAnimalDb.housingUnit).toEqual(finalAnimalDb.housingUnit);
    expect(originalAnimalDb.contactInfo).toBeOneOf([finalAnimalDb.contactInfo,null]);
    expect(originalAnimalDb.profileImageUrl).toBeOneOf([finalAnimalDb.profileImageUrl,null]);
});