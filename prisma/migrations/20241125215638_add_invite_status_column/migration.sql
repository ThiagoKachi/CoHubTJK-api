-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('accepted', 'pending', 'denied');

-- AlterTable
ALTER TABLE "reservation_guests" ADD COLUMN     "invite_status" "InviteStatus" NOT NULL DEFAULT 'pending';
