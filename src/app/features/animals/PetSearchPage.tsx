"use client"


import { PetSearch } from "./components/PetSearch"

export default function PetSearchPage() {
  return (
    <main>
      <h2>Petz4You</h2>
      <h1>Dyreprofiler</h1>
      <p>Her ser du alle registrerte dyr i systemet.</p>
      <PetSearch />
    </main>
  );
}