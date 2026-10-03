export type Animal = {
    id: number;
    name: string;
    kind: string;
    nickname?: string | null;
    dateOfBirth?: Date | null;
    traits?: string[] | null;
    housingUnit : string;
    contactInfo?: string | null;
    profileImageUrl?: string | null;
    // more here, maybe
}
export type AnimalDb = {
    id: number;
    name: string;
    kind: string;
    nickname: string | null;
    dateOfBirth: string | null;
    traits: string | null;
    housingUnit: string;
    contactInfo: string | null;
    profileImageUrl: string | null;
}