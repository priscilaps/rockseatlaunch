CREATE TABLE "recipe" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" int NOT NULL,
  "image" text NOT NULL,
  "title" text NOT NULL,
  "ingredients" text ARRAY,
  "preparation" text ARRAY,
  "information" text ARRAY,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "avatar_url" text,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL
);

CREATE TABLE "recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" int NOT NULL,
  "file_id" int NOT NULL
);

ALTER TABLE "recipe" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipe" ("id");

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");
