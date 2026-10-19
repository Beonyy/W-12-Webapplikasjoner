"use client"

import { useEffect, useState } from 'react';
import PetRegistration from "./components/PetRegistrationForm";
import type { Animal as UiAnimal} from './components/Animal';
import { animalApi} from './animal-api'
import type {Animal as BackendAnimal } from './animal-types'


function calculateAge(dateOfBirth: string) {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  return age;
}

// Backend -> UI
function mapBackendToUi(animal: BackendAnimal): UiAnimal {
  return {
    id: undefined, // backend Animal har ikke id i typen ennå
    name: animal.name,
    nickname: animal.nickname,
    dateOfBirth: animal.dateOfBirth,
    species: animal.kind as UiAnimal["species"], // kind er string, cast til Species
    characteristics: animal.traits,
    owner: animal.housingUnit, // bruker housingUnit som "owner"
    address: "",               // backend har ikke adresse
    contactInfo: animal.contactInfo,
  };
}

// UI -> Backend
function mapUiToBackend(animal: UiAnimal): BackendAnimal {
  return {
    name: animal.name,
    kind: animal.species,          // Species (string-union) -> string
    nickname: animal.nickname,
    dateOfBirth: animal.dateOfBirth,
    traits: animal.characteristics,
    housingUnit: animal.owner,     // legger owner inn som housingUnit
    contactInfo: animal.contactInfo,
    bilder: [],                    // tom foreløpig
  };
}

export default function PetFormPage() {
 // State for alle registrerte dyr.
  const [animals, setAnimals] = useState<UiAnimal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hent eksisterende dyr fra API når siden laster
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

      const backendAnimals = result.data ?? [];
      setAnimals(backendAnimals.map(mapBackendToUi));
      setLoading(false);
    }

    loadAnimals();
  }, []);

  // Funksjonen som sendes til PetRegistration
  async function handleRegister(uiAnimal: UiAnimal) {
    setError(null);

    const backendAnimal = mapUiToBackend(uiAnimal);
    const result = await animalApi.create(backendAnimal);

    if (!result.success) {
      setError("Kunne ikke registrere dyr i API-et.");
      return;
    }

    // Hvis API-et returnerer det opprettede dyret, bruk det.
    const createdBackend =
      (result.data as BackendAnimal | undefined) ?? backendAnimal;

    setAnimals((prev) => [...prev, mapBackendToUi(createdBackend)]);
    console.log("Registrert nytt dyr:", uiAnimal);
  }
  return (
    <>
      <PetRegistration onRegister={handleRegister} />

      {loading && <p>Laster dyr...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Registrerte dyr</h2>
      <ul>
        {animals.map((animal, index) => (
          // key bør egentlig være en unik ID, jaja for nå
          <li key={index}>
            Navn: {animal.name} <br/>
            Kallenavn: {animal.nickname}<br/>
            Type dyr: {animal.species}<br/>
            Kjennetrekk: {animal.characteristics}<br/>
            Alder: {calculateAge(animal.dateOfBirth)} år<br/>
            Eier: {animal.owner}<br/>
            Adresse: {animal.address}<br/>
            Kontaktinfo: {animal.contactInfo}<br/><br/>
          </li>
        ))}
      </ul>
    </>
  );
}