export type Animal = {
  id: string;
  name: string;
  species: string;
  nickname: string | null;
  dateOfBirth: Date | null;
  characteristics: string[] | null;
  housingUnit: string;
  contactInfo: string | null;
  profileImageUrl: string | null;
};

export type AnimalCreateInput = {
  name: string;
  species: string;
  nickname?: string | null;
  dateOfBirth?: Date | null;
  characteristics?: string[] | null;
  housingUnit: string;
  contactInfo?: string | null;
  profileImageUrl?: string | null;
};