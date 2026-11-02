import { describe, it, expect, beforeEach, vi } from "vitest";
import { createAnimalApi } from "../animal-api";
import { apiFetch } from "@/lib/api-fetch";
import { makeError } from "@/shared/types/errors";
import { Animal, isAnimal } from "../animal-types";
import { profile } from "node:console";

vi.mock("@/lib/api-fetch", () => ({
    apiFetch: vi.fn(),
}));

const mockedApiFetch = vi.mocked(apiFetch);

const validParams = {
    name: "Bartholomew",
    species: "cat",
    nickname: "Bart",
    dateOfBirth: "2019-10-01T14:48:00.000Z",
    characteristics: "cute,black,big",
    housingUnit: "l0111",
    contactInfo: "tlf:12323232",
};

const validAnimal: Animal = {
    ...validParams,
    profileImageUrl: "images/bingus_23.jpg"
    // id: "animal-123",
};

describe("animalApi.create", () => {
    const api = createAnimalApi();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("sends a POST request with the correct data", async () => {
        mockedApiFetch.mockResolvedValue({
            success: true,
            data: validAnimal,
        });

        await api.create("user-token", validParams);

        expect(mockedApiFetch).toHaveBeenCalledOnce();

        expect(mockedApiFetch).toHaveBeenCalledWith(
            "/api/animals",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "user-token",
                },
                body: JSON.stringify(validParams),
            }
        );
    });

    it("returns the created animal when successful", async () => {
        mockedApiFetch.mockResolvedValue({
            success: true,
            data: validAnimal,
        });

        const result = await api.create("user-token", validParams);

        expect(result.success).toBe(true);

        if (!result.success) {
            throw new Error("Expected successful result");
        }

        expect(isAnimal(result.data)).toBe(true);
        expect(result.data).toEqual(validAnimal);
    });

    it("propagates API errors", async () => {
        const error = makeError(
            "FORBIDDEN",
            "Not authorized"
        );

        mockedApiFetch.mockResolvedValue(error);

        const result = await api.create("invalid-token", validParams);

        expect(result).toEqual(error);
        expect(result.success).toBe(false);
    });

    it("rejects invalid animal data returned by the server", async () => {
        mockedApiFetch.mockResolvedValue({
            success: true,
            data: {
                name: 123,
                species: "cat",
            },
        });

        const result = await api.create("user-token", validParams);

        expect(result.success).toBe(false);

        if (result.success) {
            throw new Error("Expected failure for invalid animal");
        }

        expect(result.error.message).toBe(
            "Server returned invalid Animal"
        );
    });

    it("rejects null returned by the server", async () => {
        mockedApiFetch.mockResolvedValue({
            success: true,
            data: null,
        });

        const result = await api.create("user-token", validParams);

        expect(result.success).toBe(false);
    });

    it("rejects an animal with an invalid field", async () => {
        mockedApiFetch.mockResolvedValue({
            success: true,
            data: {
                ...validAnimal,
                name: 123,
            },
        });

        const result = await api.create("user-token", validParams);

        expect(result.success).toBe(false);

        if (!result.success) {
            expect(result.error.message).toBe(
                "Server returned invalid Animal"
            );
        }
    });
    it("rejects an array returned instead of an animal", async () => {
        mockedApiFetch.mockResolvedValue({
            success: true,
            data: [validAnimal],
        });

        const result = await api.create("user-token", validParams);

        expect(result.success).toBe(false);
    });
});
