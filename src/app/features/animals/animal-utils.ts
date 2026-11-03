export function calculateAge(dateOfBirth: string) {
  if (!dateOfBirth.trim()) return null;

  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return `${age} år`;
}

export function getSpeciesLabel(species: string): string {
  const labels: Record<string, string> = {
    DOG: "Hund",
    CAT: "Katt",
    BIRD: "Fugl",
    RABBIT: "Kanin",
    REPTILE: "Reptil",
    FISH: "Fisk",
  };

  return labels[species.toUpperCase()] ?? species;
}