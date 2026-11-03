"use client"

import { useEffect, useState } from "react";
import { animalApi } from "../animal-api";
import AnimalProfile from "./AnimalProfile";
import type { Animal } from "../animal-types";
import { Filtering } from "./Filtering";
import { useRole } from "@/app/features/auth/RoleContext";

export function PetSearch() {
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { role } = useRole(); // <- "none" | "user" | "admin"

  async function loadAnimals(filterWords?:string) {
    setLoading(true);
    setError(null);

    const result = await animalApi.list(role, filterWords);

    if (!result.success) {
      setError(result.error.message);
      setLoading(false);
      return;
    }

    const animals: Animal[] = result.data ;

    setFilteredAnimals(animals); // default: vis alle
    setLoading(false);
  }
  
  useEffect(() => {
    loadAnimals();
  }, [role]);

  function handleFilterChange(_rawText: string, words: string[]) {
    // Hvis ingen ord -> vis alle
    if (words.length === 0) {
      loadAnimals();
      return;
    }
    loadAnimals(_rawText);
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
      {filteredAnimals.length === 0 && <p>Ingen treff.</p>}
      <AnimalProfile animals={filteredAnimals} />
    </div>
  );
}