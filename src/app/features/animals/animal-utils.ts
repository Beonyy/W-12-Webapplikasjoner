// Backend Animal-type
import type { Animal as BackendAnimal } from "./animal-types";
// UI Animal-type (den brukt i PetRegistration/PetFormPage)
import type { Animal as UiAnimal } from "./components/Animal";

export function calculateAge(dateOfBirth: string | null | undefined) {
  if (!dateOfBirth) return null;

  const birthDate = new Date(dateOfBirth);
  if (isNaN(birthDate.getTime())) return null;

  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return `${age} år`;
}

export function mapBackendToUi(a: BackendAnimal): UiAnimal {
  const dobString =
    a.dateOfBirth instanceof Date
      ? a.dateOfBirth.toISOString().slice(0, 10)
      : String(a.dateOfBirth);

  return {
    id: undefined,
    name: a.name,
    nickname: a.nickname,
    dateOfBirth: dobString,
    species: a.species as UiAnimal["species"],
    characteristics: a.characteristics.join(", "),
    owner: a.housingUnit,
    address: "",
    contactInfo: a.contactInfo,
  };
}