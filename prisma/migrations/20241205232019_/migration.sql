/*
  Warnings:

  - You are about to alter the column `startTime` on the `time_slots` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `endTime` on the `time_slots` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "time_slots" ALTER COLUMN "startTime" SET DATA TYPE INTEGER,
ALTER COLUMN "endTime" SET DATA TYPE INTEGER;
