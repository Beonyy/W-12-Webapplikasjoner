"use client"

import { useState } from 'react'
import type { Animal, Species } from './Animal'


// Props til PetRegistration 
type PetRegistrationProps = {
    onRegister?: (animal: Animal) => void; // Funksjonen som mottar et dyr når skjema sendes inn
};

export default function PetRegistration ({ onRegister }: Readonly<PetRegistrationProps>) {

    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [species, setSpecies] = useState<Species>("Velg type dyr");
    const [characteristics, setCharacteristics] = useState("");
    const [owner, setOwner] = useState("");
    const [address, setAddress] = useState("");
    const [contactInfo, setContactInfo] = useState("");

    // Submit-funksjonaliteten
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Hindre standard oppførsel (reload).

        // Bygger et Animal-objekt basert på gjeldende state.
        const animal: Animal = {
            name,
            nickname,
            dateOfBirth,
            species,
            characteristics,
            owner,
            address,
            contactInfo,
        };

        if (onRegister) {
            onRegister(animal);
        } 
    } 

    return (
        <section className="newPetForm">
            <form onSubmit={handleSubmit}>
                <label>Navn på kjæledyret:
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /></label>

                <label>Kallenavn:
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                /></label>

                <label>Fødselsdato:
                <input 
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                /></label>

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
                </select></label>

                <label>Kjennetrekk: 
                <input 
                    type="text"
                    value={characteristics}
                    onChange={(e) => setCharacteristics(e.target.value)}
                /></label>

                <label>Eier: 
                <input 
                    type="text"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                /></label>

                <label>Adresse: 
                <input 
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                /></label>

                <label>Kontaktinformasjon:
                <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                /></label>

                <input type="submit" value="Registrer" className="submitButton"/>    
            </form>
        </section>
    );
}
