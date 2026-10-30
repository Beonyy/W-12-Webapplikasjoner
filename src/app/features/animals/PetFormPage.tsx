"use client";

import { useEffect, useState } from "react";
import PetRegistration from "./components/PetRegistrationForm";
// import type { Animal as UiAnimal } from "./components/Animal";
import { animalApi } from "./animal-api";
import type { Animal , AnimalCreateParams } from "./animal-types";


function calculateAge(dateOfBirth: string) {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
}

const TEMP_AUTH = "user"


export default function PetFormPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAnimals() {
      setLoading(true);
      setError(null);

      const result = await animalApi.list(TEMP_AUTH);

      if (!result.success) {
        setError("Kunne ikke hente dyr fra API.");
        setLoading(false);
        return;
      }

      const animals = result.data;
      setAnimals(animals);
      setLoading(false);
    }

    loadAnimals();
  }, []);

  async function handleRegister(animal: Animal) {
    setError(null);

    const createParams = animal;
    const result = await animalApi.create(TEMP_AUTH, createParams);

    if (!result.success) {
      console.error("API ERROR:", result.error.message);
      setError("Kunne ikke registrere dyr i API-et."+ result.error.message);
      return;
    }

    // Inntil create begynner å returnere Animal, bruker vi UI-objektet lokalt
    // setAnimals((prev) => [...prev, animal]);
    console.log("Registrert nytt dyr:", animal);

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
            <br />
            Boenhet: {animal.housingUnit}
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