CREATE TABLE `animals` (
	`animalId` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`kind` text NOT NULL,
	`nickname` text,
	`dateOfBirth` text,
	`traits` text,
	`housingUnit` text NOT NULL,
	`contactInfo` text,
	`profileImageUrl` text
);
