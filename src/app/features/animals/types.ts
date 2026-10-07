export type Animal = {
    id: number;
    name: string;
    species: string; //Enum
    nickname?: string | null;
    dateOfBirth?: Date | null;
    characteristics?: string[] | null;
    housingUnit: string;
    contactInfo?: string | null;
    profileImageUrl?: string | null;
    // more here, maybe   
}

