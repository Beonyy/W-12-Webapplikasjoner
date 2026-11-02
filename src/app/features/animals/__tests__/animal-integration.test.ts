
import { makeMockDatabase } from "@/db/features/animals/__tests__/helpers";
import { AnimalRepository, createAnimalRepository } from "@/db/features/animals/animal-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AnimalService, createAnimalService } from "../animal-services";
import { AnimalController, createAnimalController } from "../animal-controller";
import { AnimalApi, createAnimalApi } from "../animal-api";
import { createRequestInfo } from "./helpers";

describe("Animal integration tests", () => {
    let db: ReturnType<typeof makeMockDatabase> = makeMockDatabase();
    let animRepo: AnimalRepository;
    let animService: AnimalService;
    let animController: AnimalController;
    let animApi: AnimalApi;


    beforeEach(() => {
        db = makeMockDatabase();
        animRepo = createAnimalRepository(db.db);
        animService = createAnimalService(animRepo);
        animController = createAnimalController(animService);
        animApi = createAnimalApi();


        vi.stubGlobal("fetch", vi.fn(async (
            input: RequestInfo | URL,
            init?: RequestInit
        ): Promise<Response> => {

            const url = new URL(
                input instanceof Request ? input.url : input.toString(),
                "https://example.com"
            );
            const request = new Request(url, init);


            if (
                url.pathname === "/api/animals" &&
                request.method === "POST"
            ) {
                return animController.create(
                    createRequestInfo({ request })
                );
            }

            return new Response("Not found", { status: 404 });
        }));

    });

    afterEach(() => {
        db.close();
        vi.unstubAllGlobals();
    });


    const validParams = {
        name: "Bartholomew",
        species: "cat",
        nickname: "Bart",
        dateOfBirth: "2019-10-01T14:48:00.000Z",
        characteristics: "cute,black,big",
        housingUnit: "l0111",
        contactInfo: "tlf:12323232",
    };

    it("creates an animal through the entire application", async () => {

        // ACT: Call the actual frontend API
        const result = await animApi.create("user", validParams);

        // ASSERT: API result
        if (!result.success) {
            throw new Error(result.error.message);
        }
        expect(result.success).toBe(true);

        // ASSERT: Returned animal
        expect(result.data.name).toBe(validParams.name);
        expect(result.data.species).toBe(validParams.species);
        expect(result.data.nickname).toBe(validParams.nickname);
        expect(result.data.dateOfBirth).toBe(validParams.dateOfBirth);
        expect(result.data.characteristics).toBe(validParams.characteristics);
        expect(result.data.housingUnit).toBe(validParams.housingUnit);
        expect(result.data.contactInfo).toBe(validParams.contactInfo);

    });

});