import { describe, expect, test } from "vitest";
import { createAnimalController } from "../animal-controller";
import { mockAnimalService } from "./mock-animal-services";

import { RequestInfo } from "rwsdk/worker";
import { isResult } from "@/shared/types/result";
import { Animal, isAnimal } from "../animal-types";


// straight outta chatgpt
type RequestInfoOverrides = Partial<RequestInfo>;
function createRequestInfo(
  overrides: RequestInfoOverrides = {},
): RequestInfo {
  return {
    request: new Request("https://example.com/"),
    path: "/",
    params: {},
    ctx: {},
    response: {
      headers: new Headers(),
    },
    ...overrides,
  } as RequestInfo;
}


describe("user create", ()=>{

    test("create animal, animal returned", async ()=>{
        const animController = createAnimalController(mockAnimalService);
        const params = {
            name:"Bartholomew",
            species: "cat",
            nickname: "Bart",
            dateOfBirth : "2019-10-01T14:48:00.000Z",
            characteristics: "cute,black,big",
            housingUnit: "l0111",
            contactInfo:"tlf:12323232",
        }
        
        
        const _requestInfo = createRequestInfo({
            request: new Request("https://example.com/", {
                method: "POST",
                headers:  {
                    'Content-Type': 'application/json',
                    'Authorization': `user`
                },
                body: JSON.stringify(params),
            }),
        }) 


        const response = await animController.create(_requestInfo)
        expect(response.ok)
        if (response.ok){
            const result: unknown = await response.json();

            expect(isResult(result)).toBe(true);
            if (!isResult(result)) throw new Error("Expected a Result");

            
            expect(result.success).toBe(true);
            if (!result.success) throw new Error("Expected success");
            
            console.log("--------------------------DATA: ",result.data)
            expect(isAnimal(result.data)).toBe(true);
            if (!isAnimal(result.data)) throw new Error("Expected an animal");

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