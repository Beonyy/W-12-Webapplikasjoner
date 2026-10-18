
export type Animal = {
    name : string;
    species: string;
    nickname: string;
    dateOfBirth : string;
    characteristics: string;
    housingUnit : string;
    contactInfo: string;
    bilder: AnimalImage[];
    // more here, maybe
}

export type AnimalImage = {}


export function isAnimal(value: unknown): value is Animal{
    if (typeof value !== 'object' || value === null ){
        return false;
    }

    const animal = value as Record<string, unknown>;
    
    return(
        typeof animal.name == "string" &&
        typeof animal.species == "string" &&
        typeof animal.nickname == "string" &&
        typeof animal.dateOfBirth == "string" &&
        typeof animal.characteristics == "string" &&
        typeof animal.housingUnit == "string" &&
        typeof animal.contactInfo == "string"
    );
}