"use client"

import { useState } from 'react'
import type { Animal } from '../../../../shared/animals/types'
import { createAnimalApi } from '../animal-api';

const animalApi = createAnimalApi();

export default function CreateAnimalForm() {

    const [form, setForm] = useState<Animal>({
        name: "",
        species: "",
        nickname: "",
        dateOfBirth: "",
        characteristics: "",
        housingUnit: "",
        contactInfo: "",
        bilder: [],
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    
    function updateField<K extends keyof Animal>(key: K, value: Animal[K]) {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        // VIKTIG: faktisk kalle create-funksjonen med form-data
        const result = await animalApi.create(form);

        setLoading(false);

        if (!result.success) {
            setError(result.error?.message ?? "Kunne ikke opprette dyr");
            return;
        }

        setSuccess("Dyret ble opprettet!");
        // nullstill skjema
        setForm({
        name: "",
        species: "",
        nickname: "",
        dateOfBirth: "",
        characteristics: "",
        housingUnit: "",
        contactInfo: "",
        bilder: [],
        });
    } 

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Navn:
                <input
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    disabled={loading}
                />
            </label>

            <label>
                 Art:
                <input
                    value={form.species}
                    onChange={(e) => updateField("species", e.target.value)}
                    disabled={loading}
                />
            </label>

            <label>
                Kallenavn:
                <input
                    value={form.nickname}
                    onChange={(e) => updateField("nickname", e.target.value)}
                    disabled={loading}
                />
            </label>

            <label>
                Fødselsdato:
                <input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) => updateField("dateOfBirth", e.target.value)}
                    disabled={loading}
                />
            </label>

            <label>
                Egenskaper:
                <textarea
                    value={form.characteristics}
                    onChange={(e) => updateField("characteristics", e.target.value)}
                    disabled={loading}
                />
            </label>

            <label>
                Boligenhet:
                <input
                    value={form.housingUnit}
                    onChange={(e) => updateField("housingUnit", e.target.value)}
                    disabled={loading}
                />
            </label>

            <label>
                Kontaktinfo:
                <input
                    value={form.contactInfo}
                    onChange={(e) => updateField("contactInfo", e.target.value)}
                    disabled={loading}
                />
            </label>

            {/* Bildehåndtering */}

            <button type="submit" disabled={loading}>
                {loading ? "Lagrer..." : "Opprett dyr"}
            </button>

            {error && <p style={{ color: "red" }}>Feil: {error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </form>
    );
}
