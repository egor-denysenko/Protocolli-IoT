CREATE TABLE "clients" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(25) NOT NULL,
  "identification_number" varchar(16) NOT NULL,
  "telephone_number" varchar(15)
);

CREATE TABLE "rent" (
  "id" SERIAL PRIMARY KEY,
  "client_id" int8 NOT NULL,
  "drone_id" int8 NOT NULL,
  "start_date" datetime NOT NULL,
  "end_date" datetime NOT NULL
);

CREATE TABLE "drone" (
  "id" SERIAL PRIMARY KEY,
  "model" varchar(25) NOT NULL
);

ALTER TABLE "rent" ADD FOREIGN KEY ("client_id") REFERENCES "clients" ("id");

ALTER TABLE "rent" ADD FOREIGN KEY ("drone_id") REFERENCES "drone" ("id");
