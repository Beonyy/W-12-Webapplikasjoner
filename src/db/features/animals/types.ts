export type AnimalDb = {
    id: number;
    name: string;
    species: string;
    nickname: string | null;
    dateOfBirth: string | null;
    characteristics: string | null;
    housingUnit: string;
    contactInfo: string | null;
    profileImageUrl: string | null;
}