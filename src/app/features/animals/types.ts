export type Animal = {
    name : string;
    kind: string;
    nickname: string;
    dateOfBirth : Date;
    traits: string[];
    housingUnit : string;
    contactInfo: string;
    profileImage: AnimalImage;
    // more here, maybe
}

export type AnimalImage = {
    url: string;
}