"use client"


import { Animals } from "./components/Animals";

export default function PetSearchPage() {
  return (
    <main>
      <h1>Dyreprofiler</h1>
      <p>Her ser du alle registrerte dyr i systemet.</p>
      <Animals />
    </main>
  );
}