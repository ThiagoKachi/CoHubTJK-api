/*
  Warnings:

  - You are about to drop the column `addressId` on the `spaces` table. All the data in the column will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `spaces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `spaces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `spaces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `spaces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `spaces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `spaces` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "spaces" DROP CONSTRAINT "spaces_addressId_fkey";

-- AlterTable
ALTER TABLE "spaces" DROP COLUMN "addressId",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "postal_code" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;

-- DropTable
DROP TABLE "address";
