import { describe, expect, test } from "vitest";
import { Animal, isAnimal } from "../animal-types";




describe("isAnimal", ()=>{

    test("animal is animal", ()=>{

       const animal_questionmark: Animal = {
            name: 'Bartholomew',
            species: 'cat',
            nickname: 'Bart',
            dateOfBirth: '2019-10-01T14:48:00.000Z',
            characteristics: 'cute, black, big',
            housingUnit: 'l0111',
            contactInfo: 'tlf:12323232',
            profileImageUrl: '',
        };

        expect(isAnimal(animal_questionmark)).toBe(true);
    });
    test("animalpattern is animal", ()=>{

       const animal_questionmark = {
            name: 'Bartholomew',
            species: 'cat',
            nickname: 'Bart',
            dateOfBirth: '2019-10-01T14:48:00.000Z',            
            characteristics: 'cute, black, big',
            housingUnit: 'l0111',
            contactInfo: 'tlf:12323232',
            profileImageUrl: '',
        } as unknown;

        expect(isAnimal(animal_questionmark)).toBe(true);
    });

    test("missing member is not animal", ()=>{

       const animal_questionmark = {
            name: 'Bartholomew',
            species: 'cat',
            nickname: 'Bart',
            dateOfBirth: '2019-10-01T14:48:00.000Z',            
            housingUnit: 'l0111',
            profileImageUrl: '',
        } as unknown;

        expect(isAnimal(animal_questionmark)).toBe(false);
    });
});