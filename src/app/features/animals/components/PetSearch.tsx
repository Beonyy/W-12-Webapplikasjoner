"use client"

import { useEffect, useState } from "react";
import { animalApi } from "../animal-api";
import AnimalProfil from "./AnimalProfil";
import type { Animal } from "../animal-types";
import { Filtering } from "./Filtering";

const TEMP_AUTH = "user"

function animalMatchesWords(animal: Animal, words: string[]): boolean {
  if (words.length === 0) {
    return true; // ingen filter -> alltid treff
  }

  // Lag en søkestreng der vi kombinerer relevante felter
  const searchable = [
    animal.name,
    animal.nickname,
    animal.species,
    animal.characteristics,
    animal.housingUnit,
    animal.contactInfo,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // Minst ett ord må finnes i søket
  return words.some((word) => searchable.includes(word));
}

export function PetSearch() {
  const [allAnimals, setAllAnimals] = useState<Animal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAnimals() {
      setLoading(true);
      setError(null);

      const result = await animalApi.list(TEMP_AUTH);

      if (!result.success) {
        setError("Noe gikk galt, kunne ikke liste opp dyr");
        setLoading(false);
        return;
      }

      const animals: Animal[] = result.data ;

      setAllAnimals(animals);
      setFilteredAnimals(animals); // default: vis alle
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