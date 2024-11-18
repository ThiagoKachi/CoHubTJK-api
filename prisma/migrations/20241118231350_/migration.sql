/*
  Warnings:

  - You are about to drop the column `guestId` on the `spaces` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "spaces" DROP CONSTRAINT "spaces_guestId_fkey";

-- AlterTable
ALTER TABLE "spaces" DROP COLUMN "guestId";
