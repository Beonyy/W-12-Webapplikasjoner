"use client";

import { useEffect, useState } from "react";
import PetRegistration from "./components/PetRegistrationForm";
import type { Animal as UiAnimal } from "./components/Animal";
import { animalApi } from "./animal-api";
import type { Animal as BackendAnimal, AnimalCreateParams } from "./animal-types";

function calculateAge(dateOfBirth: string) {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
}

// Backend -> UI
function mapBackendToUi(animal: BackendAnimal): UiAnimal {
  const dobString =
    animal.dateOfBirth instanceof Date
      ? animal.dateOfBirth.toISOString().slice(0, 10)
      : String(animal.dateOfBirth);

  return {
    id: undefined,
    name: animal.name,
    nickname: animal.nickname,
    dateOfBirth: dobString,
    species: animal.species as UiAnimal["species"],
    characteristics: animal.characteristics.join(", "),
    owner: animal.housingUnit,
    address: "",
    contactInfo: animal.contactInfo,
  };
}

// UI -> Backend (for create)
function mapUiToBackend(animal: UiAnimal): AnimalCreateParams {
  return {
    name: animal.name,
    species: animal.species,
    nickname: animal.nickname,
    dateOfBirth: animal.dateOfBirth,
    characteristics: animal.characteristics,
    housingUnit: animal.owner,
    contactInfo: animal.contactInfo,
  };
}

export default function PetFormPage() {
  const [animals, setAnimals] = useState<UiAnimal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAnimals() {
      setLoading(true);
      setError(null);

      const result = await animalApi.list();

      if (!result.success) {
        setError("Kunne ikke hente dyr fra API.");
        setLoading(false);
        return;
      }

      const backendAnimals = (result.data ?? []) as BackendAnimal[];
      setAnimals(backendAnimals.map(mapBackendToUi));
      setLoading(false);
    }

    loadAnimals();
  }, []);

  async function handleRegister(uiAnimal: UiAnimal) {
    setError(null);

    const createParams = mapUiToBackend(uiAnimal);
    const result = await animalApi.create(createParams);

    if (!result.success) {
      setError("Kunne ikke registrere dyr i API-et.");
      return;
    }

    // Inntil create begynner å returnere Animal, bruker vi UI-objektet lokalt
    setAnimals((prev) => [...prev, uiAnimal]);
    console.log("Registrert nytt dyr:", uiAnimal);

    return result;
  }

  return (
    <>
      <PetRegistration onRegister={handleRegister} />

      {loading && <p>Laster dyr...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Registrerte dyr</h2>
      <ul>
        {animals.map((animal, index) => (
          <li key={index}>
            Navn: {animal.name} <br />
            Kallenavn: {animal.nickname}
            <br />
            Type dyr: {animal.species}
            <br />
            Kjennetrekk: {animal.characteristics}
            <br />
            Alder: {calculateAge(animal.dateOfBirth)} år
            <br />
            Eier: {animal.owner}
            <br />
            Adresse: {animal.address}
            <br />
            Kontaktinfo: {animal.contactInfo}
            <br />
            <br />
          </li>
        ))}
      </ul>
    </>
  );
}