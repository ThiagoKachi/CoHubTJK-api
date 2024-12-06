/*
  Warnings:

  - Changed the type of `startTime` on the `time_slots` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTime` on the `time_slots` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "time_slots" DROP COLUMN "startTime",
ADD COLUMN     "startTime" DOUBLE PRECISION NOT NULL,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" DOUBLE PRECISION NOT NULL;
