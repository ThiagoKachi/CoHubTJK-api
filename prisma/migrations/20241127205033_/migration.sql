-- CreateEnum
CREATE TYPE "TimeSlotStatus" AS ENUM ('available', 'unavailable', 'temporary_blocked');

-- CreateEnum
CREATE TYPE "TimeSlotType" AS ENUM ('automatic', 'custom');

-- CreateTable
CREATE TABLE "time_slots" (
    "id" UUID NOT NULL,
    "spaceId" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "TimeSlotStatus" NOT NULL,
    "type" "TimeSlotType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time_slots_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "time_slots" ADD CONSTRAINT "time_slots_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
