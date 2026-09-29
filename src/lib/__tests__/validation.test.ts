import { describe, it, expect } from "vitest";
import { validateAnimal } from "@/lib/validation";

describe("validateAnimal", () => {
  it("validates Animal type", () => {
    const animal = {};
    const result = validateAnimal(animal);

    expect(typeof result).toBe("boolean");
    expect(result).toBe(false);
  });
});