export type AnimalDb = {
    id: number;
    name: string;
    kind: string;
    nickname?: string | null;
    dateOfBirth: string | null;
    traits: string | null;
    housingUnit: string;
    contactInfo: string | null;
    profileImageUrl: string | null;
}