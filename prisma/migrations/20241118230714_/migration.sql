/*
  Warnings:

  - Added the required column `guestId` to the `spaces` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "spaces" ADD COLUMN     "guestId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "spaces" ADD CONSTRAINT "spaces_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
