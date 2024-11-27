/*
  Warnings:

  - Added the required column `endTime` to the `spaces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slotDuration` to the `spaces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `spaces` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DaysOfWorkType" AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- AlterTable
ALTER TABLE "spaces" ADD COLUMN     "daysOfWeek" "DaysOfWorkType"[],
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "slotDuration" INTEGER NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;
