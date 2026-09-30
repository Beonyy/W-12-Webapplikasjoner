import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const animalTable = sqliteTable("animals", {
    id: integer("animalId").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    kind: text("kind").notNull(),
    nickname: text("nickname"),
    dateOfBirth: text("dateOfBirth"),
    traits: text("traits"),
    housingUnit: text("housingUnit").notNull(),
    contactInfo: text("contactInfo"),
    profileImageUrl: text("profileImageUrl"),
})