import { beforeEach, describe, expect, test, it, vi } from "vitest";
import { animalController, createAnimalController } from "../animal-controller";
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


describe("createAnimalController.create", () => {
    const animController = createAnimalController(mockAnimalService);
    const validParams = {
        name: "Bartholomew",
        species: "cat",
        nickname: "Bart",
        dateOfBirth: "2019-10-01T14:48:00.000Z",
        characteristics: "cute,black,big",
        housingUnit: "l0111",
        contactInfo: "tlf:12323232",
    }

    function makeRequest(body?: string, authorization?: string) {


        const headers = new Headers({
            'Content-Type': 'application/json',
        });

        if (authorization !== undefined) {
            headers.set("Authorization", authorization);
        }

        return createRequestInfo({
            request: new Request("https://example.com/", {
                method: "POST",
                headers,
                ...(body !== undefined ? { body } : {}),
            }),
        })
    }
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("rejects a missing Authorization header", async () => {
        const response = await animalController.create(
            makeRequest(JSON.stringify(validParams)),
        );
        expect(response.status).toBe(403);
        expect(await response.json()).toEqual({
            error: "not authorized",
        });
    });

    it("rejects an empty Authorization header", async () => {
        const response = await animController.create(
            makeRequest(JSON.stringify(validParams), ""),
        );

        expect(response.status).toBe(403);
    });

    // p cool chat suggestion
    it.each(["none", "admin", "invalid-token"])(
        "rejects Authorization: %s for create",
        async (auth) => {
            const response = await animController.create(
                makeRequest(JSON.stringify(validParams), auth),
            );

            expect(response.status).toBe(403);
            expect(await response.json()).toEqual({
                error: "not authorized",
            });

        },
    );

    it("allows user authorization to reach the service", async () => {
        const response = await animController.create(
            makeRequest(JSON.stringify(validParams), "user"),
        );

        expect(response.status).toBe(200);
    });

    it("returns 400 for malformed JSON", async () => {
        const response = await animController.create(
            makeRequest("{ invalid json", "user"),
        );

        expect(response.status).toBe(400);
        expect(await response.json()).toEqual({
            error: " Invalid JSON body",
        });

    });

    it("returns 400 for an empty request body", async () => {
        const response = await animController.create(
            makeRequest(undefined, "user"),
        );

        expect(response.status).toBe(400);
        expect(await response.json()).toEqual({
            error: " Invalid JSON body",
        });

    });

    it.each([
        ["null", "null"],
        ["an array", "[]"],
        ["a string", '"hello"'],
        ["a number", "42"],
        ["a boolean", "true"],
    ])("returns 400 when the JSON body is %s", async (_description, body) => {
        const response = await animController.create(
            makeRequest(body, "user"),
        );

        expect(response.status).toBe(400);
        expect(await response.json()).toEqual({
            error: " Invalid request body",
        });

    });


    it("rejects a missing required field", async () => {
        const { name: _name, ...malformedParams } = validParams;

        const response = await animController.create(
            makeRequest(JSON.stringify(malformedParams), "user"),
        );

        expect(response.status).toBe(400);
        expect(await response.json()).toEqual({
            error: " Invalid request body",
        });

    });

    it.each([
        ["name", 123],
        ["species", null],
        ["nickname", 42],
        ["characteristics", []],
        ["housingUnit", false],
        ["contactInfo", {}],
    ])("rejects invalid value for %s", async (field, value) => {
        const malformedParams = {
            ...validParams,
            [field]: value,
        };

        const response = await animController.create(
            makeRequest(JSON.stringify(malformedParams), "user"),
        );

        expect(response.status).toBe(400);
        expect(await response.json()).toEqual({
            error: " Invalid request body",
        });

    });


    test("create animal, animal returned", async () => {

        const _requestInfo = createRequestInfo({
            request: new Request("https://example.com/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `user`
                },
                body: JSON.stringify(validParams),
            }),
        })


        const response = await animController.create(_requestInfo)
        expect(response.ok)
        if (response.ok) {
            const result: unknown = await response.json();

            expect(isResult(result)).toBe(true);
            if (!isResult(result)) throw new Error("Expected a Result");


            expect(result.success).toBe(true);
            if (!result.success) throw new Error("Expected success");

            console.log("--------------------------DATA: ", result.data)
            expect(isAnimal(result.data)).toBe(true);
            if (!isAnimal(result.data)) throw new Error("Expected an animal");

            const data = result.data;
            expect(data.name).toEqual(validParams.name);
            expect(data.species).toEqual(validParams.species);
            expect(data.nickname).toEqual(validParams.nickname);
            expect(data.dateOfBirth).toEqual(validParams.dateOfBirth);
            expect(data.characteristics).toEqual(validParams.characteristics);
            expect(data.housingUnit).toEqual(validParams.housingUnit);
            expect(data.contactInfo).toEqual(validParams.contactInfo);
        }
    });
});