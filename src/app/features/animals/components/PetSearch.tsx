"use client"

import { useEffect, useState } from "react";
import { animalApi } from "../animal-api";
import AnimalProfil from "./AnimalProfil";
// Backend Animal-type
import type { Animal as BackendAnimal } from "../animal-types";
// UI Animal-type (den brukt i PetRegistration/PetFormPage)
import type { Animal as UiAnimal } from "./Animal";
import { Filtering } from "./Filtering";

// Samme mapping som i Animals.tsx
function mapBackendToUi(a: BackendAnimal): UiAnimal {
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

function animalMatchesWords(animal: UiAnimal, words: string[]): boolean {
  if (words.length === 0) {
    return true; // ingen filter -> alltid treff
  }

  // Lag en søkestreng der vi kombinerer relevante felter
  const searchable = [
    animal.name,
    animal.nickname,
    animal.species,
    animal.characteristics,
    animal.owner,
    animal.address,
    animal.contactInfo,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // Minst ett ord må finnes i søket
  return words.some((word) => searchable.includes(word));
}

export function PetSearch() {
  const [allAnimals, setAllAnimals] = useState<UiAnimal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<UiAnimal[]>([]);
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

      setAllAnimals(uiAnimals);
      setFilteredAnimals(uiAnimals); // default: vis alle
      setLoading(false);
    }

    loadAnimals();
  }, []);

  function handleFilterChange(_rawText: string, words: string[]) {
    // Hvis ingen ord -> vis alle
    if (words.length === 0) {
      setFilteredAnimals(allAnimals);
      return;
    }

    const next = allAnimals.filter((animal) => animalMatchesWords(animal, words));
    setFilteredAnimals(next);
  }

  if (loading) {
    return <p>Laster dyr...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <Filtering onFilterChange={handleFilterChange} />
      <AnimalProfil animals={filteredAnimals} />
    </div>
  );
}