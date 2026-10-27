CREATE TABLE `animal_audit_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`animalId` text NOT NULL,
	`action` text NOT NULL,
	`changed_at` integer NOT NULL,
	CONSTRAINT `fk_animal_audit_log_animalId_animals_animalId_fk` FOREIGN KEY (`animalId`) REFERENCES `animals`(`id`) ON DELETE CASCADE
);

CREATE TABLE `animals` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`species` text NOT NULL,
	`nickname` text,
	`dateOfBirth` text,
	`characteristics` text,
	`housingUnit` text NOT NULL,
	`contactInfo` text,
	`profileImageUrl` text,
	`deleted` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer
);
