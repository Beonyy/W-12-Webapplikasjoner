import type { Animal as UiAnimal } from "../animal-types";

type AnimalProfilProps = {
  animals: UiAnimal[];
};

export default function AnimalProfil({ animals }: AnimalProfilProps) {
  return (
    <ul>
      {animals.map((animal, index) => (
        <li key={index}>
          <strong>{animal.name}</strong> ({animal.nickname}) <br />
          Type dyr: {animal.species} <br />
          Kjennetrekk: {animal.characteristics} <br />
          Fødselsdato: {animal.dateOfBirth} <br />
          Kontaktinfo: {animal.contactInfo}
        </li>
      ))}
    </ul>
  );
}