console.log("ANIMAL TEST FILE LOADED");
import { describe, expect, test } from "vitest";

import { createAnimalService } from "../animal-services";
import { mockAnimalRepository } from "./mock-animal-repository";



describe("create", () =>{

    test("create animal, animal returned", async ()=>{
        const animService = createAnimalService(mockAnimalRepository)

        const params = {
            name:"Bartholomew",
            species: "cat",
            nickname: "Bart",
            dateOfBirth : "2019-10-01T14:48:00.000Z",
            characteristics: "cute,black,big",
            housingUnit: "l0111",
            contactInfo:"tlf:12323232",
        }
        const result = await animService.create("", params);
        expect(result.success).toEqual(true);
        if (result.success){
            const data = result.data;
            expect(data.name).toEqual(params.name);
            expect(data.species).toEqual(params.species);
            expect(data.nickname).toEqual(params.nickname);
            expect(data.dateOfBirth).toEqual(params.dateOfBirth);
            expect(data.characteristics).toEqual(params.characteristics);
            expect(data.housingUnit).toEqual(params.housingUnit);
            expect(data.contactInfo).toEqual(params.contactInfo);
        }
    });
});


