/*
  Warnings:

  - You are about to drop the column `accountId` on the `feedbacks` table. All the data in the column will be lost.
  - Added the required column `guestId` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_accountId_fkey";

-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "accountId",
ADD COLUMN     "guestId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
