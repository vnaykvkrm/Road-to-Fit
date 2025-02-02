ALTER TABLE `trainerss` RENAME TO `trainers`;--> statement-breakpoint
DROP INDEX IF EXISTS `trainerss_email_unique`;--> statement-breakpoint
DROP INDEX IF EXISTS `trainerss_phone_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `trainers_email_unique` ON `trainers` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `trainers_phone_unique` ON `trainers` (`phone`);