export type AnimalImage = {}

export type Animal = {
    name : string;
    species: string;
    nickname: string;
    dateOfBirth : Date;
    characteristics: string[];
    housingUnit : string;
    contactInfo: string;
    profileImageUrl: string,
    images: AnimalImage[];
    // more here, maybe
}

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
        typeof animal.profileImageUrl == "string" &&
        typeof animal.contactInfo == "string"
    );
}

export interface AnimalCreateParams{
    name : string;
    species: string;
    nickname: string;
    dateOfBirth : string;
    characteristics: string;
    housingUnit : string;
    contactInfo: string;
}

export function isAnimalCreationParams(value: unknown): value is AnimalCreateParams{
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
export type AnimalUpdateParams = Partial<AnimalCreateParams>

export function isAnimalUpdateParams(value: unknown): value is AnimalUpdateParams{
    if (typeof value !== 'object' || value === null || Array.isArray(value)){
        return false;
    }
    
    const animal = value as Record<string, unknown>;
    const allowedFields = [
        "name",
        "species",
        "nickname",
        "dateOfBirth",
        "characteristics",
        "housingUnit",
        "contactInfo",
    ] as const;
    
    const hasValidField = allowedFields.some(
        field => typeof animal[field] === "string"
    );

    const hasInvalidField = allowedFields.some(
        field => animal[field] !== undefined &&
                 typeof animal[field] !== "string"
    );


    return hasValidField && !hasInvalidField;
}