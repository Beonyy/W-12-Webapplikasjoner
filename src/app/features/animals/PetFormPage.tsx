"use client"

import { useState } from 'react';
import PetRegistration from "./components/PetRegistrationForm";
import type { Animal } from './components/Animal';



function calculateAge(dateOfBirth: string) {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  return age;
}

export default function PetFormPage() {
 // State for alle registrerte dyr.
  const [animals, setAnimals] = useState<Animal[]>([]);

  // Denne funksjonen blir sendt som onRegister til PetRegistration.
  // Den mottar et Animal-objekt (fra skjemaet) og legger det til i lista.
  function handleRegister(animal: Animal) {
    setAnimals((prev) => [...prev, animal]);
    console.log("Registrert nytt dyr:", animal);
  }

  return (
    <>
      <PetRegistration onRegister={handleRegister} />

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