DO $$ BEGIN
 CREATE TYPE "public"."bookStatus" AS ENUM('returned', 'issued', 'pending', 'rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "bookStatus" SET DATA TYPE bookStatus;