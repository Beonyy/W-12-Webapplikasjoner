"use client"

import { useState } from 'react'
import type { Species } from './Animal'
import { Animal } from '../animal-types';


// Props til PetRegistration 
type PetRegistrationProps = {
    onRegister: (animal: Animal) => Promise<boolean>; // Funksjonen som mottar et dyr når skjema sendes inn
};


// const TEMP_AUTH = "user"

export default function PetRegistration ({ onRegister }: Readonly<PetRegistrationProps>) {

    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [species, setSpecies] = useState<Species>("Velg type dyr");
    const [characteristics, setCharacteristics] = useState("");
    const [housingUnit, setHousingUnit] = useState("");
    const [contactInfo, setContactInfo] = useState("");

    // Submit-funksjonaliteten
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Hindre standard oppførsel (reload).

        // Bygger et Animal-objekt basert på gjeldende state.
        const animal: Animal = {
            name,
            species,
            nickname,
            dateOfBirth,
            characteristics,
            housingUnit,
            contactInfo,
            profileImageUrl:""
        };

        if (await onRegister(animal)) {
            setName("");
            setNickname("");
            setDateOfBirth("");
            setSpecies("Velg type dyr");
            setCharacteristics("");
            setCharacteristics("");
            setHousingUnit("");
            setContactInfo("");
        } 
    } 

    return (
        <section className="newPetForm">
            <h1>Registrer ditt kjæledyr</h1>
            <form onSubmit={handleSubmit}>
                <label>Navn på kjæledyret:
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>Kallenavn:
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </label>
                <label>Fødselsdato:
                    <input 
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </label>
                <label>Type dyr: 
                    <select
                        value={species}
                        onChange={(e) => setSpecies(e.target.value as Species)}
                    >
                        <option value="Dog">Hund</option>
                        <option value="Cat">Katt</option>
                        <option value="Bird">Fugl</option>
                        <option value="Rabbit">Kanin</option>
                        <option value="Reptile">Reptil</option>
                        <option value="Fish">Fisk</option>
                    </select>
                </label>
                <label>Kjennetrekk: 
                    <input 
                        type="text"
                        value={characteristics}
                        onChange={(e) => setCharacteristics(e.target.value)}
                    />
                </label>
                <label>Boenhet: 
                    <input 
                        type="text"
                        value={housingUnit}
                        onChange={(e) => setHousingUnit(e.target.value)}
                    />
                </label>
                <label>Kontaktinformasjon: 
                    <input
                        type="text"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                    />      
                </label>
                <input type="submit" value="Registrer" className="submitButton" />    
            </form>
        </section>
    );
}
