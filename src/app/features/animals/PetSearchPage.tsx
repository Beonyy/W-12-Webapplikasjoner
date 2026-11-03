"use client"


import { PetSearch } from "./components/PetSearch"
import { AuthLayout } from "@/app/features/auth/AuthLayout";

export default function PetSearchPage() {
  return (
    <AuthLayout>
      <main>
        <h1>Dyreprofiler</h1>
        <p>Her kan du søke blant alle registrerte dyr i systemet.</p>
        <PetSearch />
      </main>
    </AuthLayout>
  );
}