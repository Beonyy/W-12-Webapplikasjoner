export type Species = "Velg type dyr"
  | "Dog"
  | "Cat"
  | "Bird"
  | "Rabbit"
  | "Reptile"
  | "Fish"

export type Animal = {
  id?: string;     
  name: string;
  nickname: string;
  dateOfBirth: string;      // Konverteres til alder
  species: Species;          
  characteristics: string;  // senere endres til string[]?
  owner: string;            // skal hentes fra BoenhetId
  address: string;          
  contactInfo: string;
};


