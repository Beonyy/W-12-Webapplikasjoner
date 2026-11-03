"use client";

import { useState } from "react";
import PetRegistration from "./components/PetRegistrationForm";
import { animalApi } from "./animal-api";
import type { Animal } from "./animal-types";
import { AuthLayout } from "@/app/features/auth/AuthLayout";
import { useRole } from "@/app/features/auth/RoleContext";

// Denne komponenten rendres inne i AuthLayout/RoleProvider
function PetFormContent() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { role } = useRole(); // nå er vi garantert å være inni RoleProvider

  async function handleRegister(animal: Animal): Promise<boolean> {
    setError(null);
    setSuccess(false);

    const createParams = animal;
    const result = await animalApi.create(role, createParams);

    if (!result.success) {
      console.error("API ERROR:", result.error.message);
      setError("Kunne ikke registrere dyr i API-et. " + result.error.message);
      return false;
    }

    setSuccess(true);
    return true;
  }

  return (
    <main>
      <PetRegistration onRegister={handleRegister} />
      {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
      {success && <p role="status">Dyret ble registrert.</p>}
    </main>
  );
}

export default function PetFormPage() {
  return (
    <AuthLayout initialRole="user">
      <PetFormContent />
    </AuthLayout>
  );
}