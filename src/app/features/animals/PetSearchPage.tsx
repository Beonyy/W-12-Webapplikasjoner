"use client"


import { PetSearch } from "./components/PetSearch"
import { AuthLayout } from "@/app/features/auth/AuthLayout";
import GlobalNavbar from "@/app/features/shared/GlobalNavbar";

export default function PetSearchPage() {
  return (
    <AuthLayout>
      <GlobalNavbar/>
      <main>
        <h1>Dyreprofiler</h1>
        <p>Her kan du søke blant alle registrerte dyr i systemet.</p>
        <PetSearch />
      </main>
    </AuthLayout>
  );
}