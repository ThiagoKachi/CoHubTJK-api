/*
  Warnings:

  - Added the required column `available` to the `spaces` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "spaces" ADD COLUMN     "available" BOOLEAN NOT NULL;
