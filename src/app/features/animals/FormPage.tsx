"use client"

import { useEffect, useState } from "react";
import { Animal } from "./animal-types";
import { createAnimalApi } from "./animal-api"


const animalApi = createAnimalApi()
export default function AnimalsPage() {

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnimals() {
        setLoading(true);
        setError(null);

       const result = await animalApi.list()

        if(!result.success){
          setError(result.error?.message ?? "Kunne ikke hente dyr");
        setLoading(false);
        return;  
        }
   
    
      setAnimals(result.data ?? []);
      setLoading(false);
    }

    fetchAnimals();
    }, []);

  if (loading) return <div>Laster dyr ...</div>;
  if (error) return <div>Feil: {error}</div>;

  return (
    <div>
      <h1>Dyr</h1>
      <ul>
        {animals.map((animal, index) => (
          <li key={index}>
            <strong>{animal.name}</strong> ({animal.species}) – kallenavn:{" "}
            {animal.nickname}
          </li>
        ))}
      </ul>
    </div>
  );
}