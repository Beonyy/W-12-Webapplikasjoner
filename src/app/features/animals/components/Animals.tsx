import { useEffect, useState } from "react";
import { animalApi } from "../animal-api";
import AnimalProfil from "./AnimalProfil";

// Backend Animal-type
import type { Animal as BackendAnimal } from "../animal-types";

// UI Animal-type (den brukt i PetRegistration/PetFormPage)
import type { Animal as UiAnimal } from "./Animal";

// Mapping fra backend-modell -> UI-modell
function mapBackendToUi(a: BackendAnimal): UiAnimal {
  // Konverter Date -> string;
  const dobString =
    a.dateOfBirth instanceof Date
      ? a.dateOfBirth.toISOString().slice(0, 10) // "YYYY-MM-DD"
      : String(a.dateOfBirth); // fallback hvis den kommer som string fra API  

  return {
    id: undefined, // backend har ikke id i typen ennå
    name: a.name,
    nickname: a.nickname,
    dateOfBirth: dobString,
    species: a.species as UiAnimal["species"],
    characteristics: a.characteristics.join(", "),  // backend characteristics er string[]; UI vil ha én string
    owner: a.housingUnit,
    address: "", // backend har ikke adresse enda
    contactInfo: a.contactInfo,
  };
}

export function Animals() {
  const [animals, setAnimals] = useState<UiAnimal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAnimals() {
      setLoading(true);
      setError(null);

      const result = await animalApi.list();

      if (!result.success) {
        setError("Noe gikk galt, kunne ikke liste opp dyr");
        setLoading(false);
        return;
      }

      const backendAnimals: BackendAnimal[] = result.data ?? [];
      const uiAnimals: UiAnimal[] = backendAnimals.map(mapBackendToUi);

      setAnimals(uiAnimals);
      setLoading(false);
    }

    loadAnimals();
  }, []); // kjør én gang ved mount

  if (loading) {
    return <p>Laster dyr...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return <AnimalProfil animals={animals} />;
}