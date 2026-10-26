import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const animals = sqliteTable("animals", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    name: text("name").notNull(),
    species: text("species").notNull(),
    nickname: text("nickname"),
    dateOfBirth: text("dateOfBirth"),
    characteristics: text("characteristics"),
    housingUnit: text("housingUnit").notNull(),
    contactInfo: text("contactInfo"),
    profileImageUrl: text("profileImageUrl"),
    deleted: integer("deleted", { mode: "boolean" })
        .notNull()
        .default(false),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$onUpdateFn(() => new Date()),
})

export const animalAuditLogs = sqliteTable("animal_audit_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  animalId: text("animalId")
    .notNull()
    .references(() => animals.id,{ onDelete: "cascade" }),
  action: text("action").notNull(),
    changedAt: integer("changed_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
});

export type Animal = typeof animals.$inferSelect;
export type NewAnimal = typeof animals.$inferInsert;

export type AnimalAuditLog = typeof animalAuditLogs.$inferSelect;