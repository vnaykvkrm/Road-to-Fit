CREATE TABLE `clients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`password` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`zip` text NOT NULL,
	`address` text NOT NULL,
	`country` text NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
ALTER TABLE `trainers` ADD `city` text NOT NULL;--> statement-breakpoint
ALTER TABLE `trainers` ADD `state` text NOT NULL;--> statement-breakpoint
ALTER TABLE `trainers` ADD `zip` text NOT NULL;--> statement-breakpoint
ALTER TABLE `trainers` ADD `address` text NOT NULL;--> statement-breakpoint
ALTER TABLE `trainers` ADD `country` text NOT NULL;