import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "movies_genres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "movies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"votes" numeric NOT NULL,
  	"poster_id" integer NOT NULL,
  	"overview" varchar NOT NULL,
  	"tagline" varchar,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "movies_genres" ADD CONSTRAINT "movies_genres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "movies" ADD CONSTRAINT "movies_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "movies_genres_order_idx" ON "movies_genres" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "movies_genres_parent_id_idx" ON "movies_genres" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "movies_created_at_idx" ON "movies" USING btree ("created_at");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "movies_genres";
  DROP TABLE "movies";`)
}
