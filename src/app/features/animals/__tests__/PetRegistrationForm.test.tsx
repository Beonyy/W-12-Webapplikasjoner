// @vitest-environment happy-dom

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PetRegistration from "@/app/features/animals/components/PetRegistrationForm";
import type { Animal } from "@/app/features/animals/animal-types";

describe("PetRegistrationForm", () => {
  it("kaller onRegister med korrekt Animal-objekt når skjema sendes inn", async () => {
    const user = userEvent.setup();
    const handleRegister = vi.fn();

    render(<PetRegistration onRegister={handleRegister} />);

    await user.type(
      screen.getByLabelText("Navn på kjæledyret:"),
      "Mao"
    );
    await user.type(
      screen.getByLabelText("Kallenavn:"),
      "Kjøttrull"
    );
    await user.type(
      screen.getByLabelText("Fødselsdato:"),
      "2019-11-04"
    );
    await user.selectOptions(
      screen.getByLabelText("Type dyr:"),
      "Cat"
    );
    await user.type(
      screen.getByLabelText("Kjennetrekk:"),
      "Fremtidig verdenshersker"
    );
    await user.type(
      screen.getByLabelText("Boenhet:"),
      "Hemmelig"
    );
    await user.type(
      screen.getByLabelText("Kontaktinformasjon:"),
      "kari.nordmann@example.com"
    );

    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(handleRegister).toHaveBeenCalledTimes(1);

    const animalArg = handleRegister.mock.calls[0][0] as Animal;

    expect(animalArg).toEqual({
      name: "Mao",
      nickname: "Kjøttrull",
      dateOfBirth: "2019-11-04",
      species: "Cat",
      characteristics: "Fremtidig verdenshersker",
      housingUnit: "Hemmelig",
      contactInfo: "kari.nordmann@example.com",
      profileImageUrl: "",
    });
  });
});