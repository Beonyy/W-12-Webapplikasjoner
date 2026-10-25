import type { Animal as UiAnimal } from "./Animal";

type AnimalProfilProps = {
  animals: UiAnimal[];
};

export default function AnimalProfil({ animals }: AnimalProfilProps) {
  return (
    <ul>
      {animals.map((animal, index) => (
        <li key={animal.id ?? index}>
          <strong>{animal.name}</strong> ({animal.nickname}) <br />
          Type dyr: {animal.species} <br />
          Kjennetrekk: {animal.characteristics} <br />
          Fødselsdato: {animal.dateOfBirth} <br />
          Eier: {animal.owner} <br />
          Adresse: {animal.address} <br />
          Kontaktinfo: {animal.contactInfo}
        </li>
      ))}
    </ul>
  );
}