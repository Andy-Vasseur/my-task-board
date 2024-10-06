-- Initial script to create the database and the table
BEGIN;

-- Drop the tables if they exist already

DROP TABLE IF EXISTS "tasks" CASCADE;

DROP TABLE IF EXISTS "title" CASCADE;

-- Create the table Tasks
CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "category" TEXT,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the table Title
CREATE TABLE "title" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL
);

-- Commit the transaction
COMMIT;