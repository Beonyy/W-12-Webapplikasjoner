
export type Animal = {
    name : string;
    kind: string;
    nickname: string;
    dateOfBirth : Date;
    traits: string;
    housingUnit : string;
    contactInfo: string;
    bilder: AnimalImage[];
    // more here, maybe
}

export type AnimalImage = {}