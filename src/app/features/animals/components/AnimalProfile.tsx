import type { Animal as UiAnimal } from "../animal-types";
import { calculateAge } from "../animal-utils";

type AnimalProfilProps = {
  animals: UiAnimal[];
};

export default function AnimalProfile({ animals }: AnimalProfilProps) {
  return (
    <ul className="animalsList">
      {animals.map((animal, index) => (
        <li key={index}>
          <span className="animalLabel">
              Navn:
            </span> 
            <span className="animalValue">
              {animal.name} 
            </span> 
            <br />

            <span className="animalLabel">
              Kallenavn:
            </span> 
            <span className="animalValue">
              {animal.nickname}
            </span> 
            <br />

            <span className="animalLabel">
              Type dyr:
            </span> 
            <span className="animalValue">
              {animal.species}
            </span> 
            <br />

            <span className="animalLabel">
              Kjennetrekk:
            </span> 
            <span className="animalValue">
              {animal.characteristics}
            </span> 
            <br />

            <span className="animalLabel">
              Alder:
            </span> 
            <span className="animalValue">
              {calculateAge(animal.dateOfBirth)} år
            </span> 
            <br />

            <span className="animalLabel">
              Boenhet:
            </span> 
            <span className="animalValue">
              {animal.housingUnit}
            </span> 
            <br />

            <span className="animalLabel">
              Kontaktinfo:
            </span> 
            <span className="animalValue">
              {animal.contactInfo}
            </span> 
            <br />
        </li>
      ))}
    </ul>
  );
}