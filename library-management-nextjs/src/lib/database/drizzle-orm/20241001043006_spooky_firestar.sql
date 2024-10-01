CREATE TABLE IF NOT EXISTS "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"memberId" bigint NOT NULL,
	"professorId" bigint NOT NULL,
	"transactionId" varchar(50) NOT NULL,
	"orderId" varchar(50) NOT NULL,
	"amount" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "wallet" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "professors" ADD COLUMN "wallet" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_memberId_members_id_fk" FOREIGN KEY ("memberId") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_professorId_professors_id_fk" FOREIGN KEY ("professorId") REFERENCES "public"."professors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
