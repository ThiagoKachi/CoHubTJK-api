/*
  Warnings:

  - The values [denied] on the enum `InviteStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InviteStatus_new" AS ENUM ('accepted', 'pending', 'declined');
ALTER TABLE "reservation_guests" ALTER COLUMN "invite_status" DROP DEFAULT;
ALTER TABLE "reservation_guests" ALTER COLUMN "invite_status" TYPE "InviteStatus_new" USING ("invite_status"::text::"InviteStatus_new");
ALTER TYPE "InviteStatus" RENAME TO "InviteStatus_old";
ALTER TYPE "InviteStatus_new" RENAME TO "InviteStatus";
DROP TYPE "InviteStatus_old";
ALTER TABLE "reservation_guests" ALTER COLUMN "invite_status" SET DEFAULT 'pending';
COMMIT;
