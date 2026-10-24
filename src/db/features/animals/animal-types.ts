import { animals } from "@/db/features/animals/animal-schema";
// export type AnimalDb = {
//     id: string;
//     name: string;
//     species: string;
//     nickname: string | null;
//     dateOfBirth: string | null;
//     characteristics: string | null;
//     housingUnit: string;
//     contactInfo: string | null;
//     profileImageUrl: string | null;
// }
export type AnimalDb = typeof animals.$inferInsert
