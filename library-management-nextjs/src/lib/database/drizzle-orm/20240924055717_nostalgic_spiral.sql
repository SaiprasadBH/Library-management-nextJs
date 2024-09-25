CREATE TABLE IF NOT EXISTS "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"memberId" bigint NOT NULL,
	"professorId" bigint NOT NULL,
	"googleMeetLink" varchar(255) NOT NULL,
	"appointmentDate" varchar(15) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "professors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(35) NOT NULL,
	"email" varchar(255) NOT NULL,
	"calendlyLink" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appointments" ADD CONSTRAINT "appointments_memberId_members_id_fk" FOREIGN KEY ("memberId") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appointments" ADD CONSTRAINT "appointments_professorId_professors_id_fk" FOREIGN KEY ("professorId") REFERENCES "public"."professors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_prof_email_idx" ON "professors" USING btree ("email");