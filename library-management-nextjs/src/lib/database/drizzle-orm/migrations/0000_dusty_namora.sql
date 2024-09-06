CREATE TABLE `books` (
	`id` serial AUTO_INCREMENT,
	`title` varchar(35) NOT NULL,
	`author` varchar(35) NOT NULL,
	`publisher` varchar(35) NOT NULL,
	`genre` varchar(35) NOT NULL,
	`isbnNo` varchar(13) NOT NULL,
	`numOfPages` int NOT NULL,
	`totalNumOfCopies` int NOT NULL,
	`availableNumOfCopies` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `members` (
	`id` serial AUTO_INCREMENT,
	`name` varchar(35) NOT NULL,
	`age` int NOT NULL,
	`email` varchar(255) NOT NULL,
	`address` varchar(35) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role` enum('user','admin','librarian') NOT NULL,
	CONSTRAINT `members_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` serial AUTO_INCREMENT,
	`memberId` bigint unsigned NOT NULL,
	`bookId` bigint unsigned NOT NULL,
	`bookStatus` varchar(35) NOT NULL,
	`dateOfIssue` varchar(15) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_memberId_members_id_fk` FOREIGN KEY (`memberId`) REFERENCES `members`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_bookId_books_id_fk` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE cascade ON UPDATE no action;