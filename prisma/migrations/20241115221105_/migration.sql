-- DropForeignKey
ALTER TABLE "reservation_guests" DROP CONSTRAINT "reservation_guests_reservationId_fkey";

-- AddForeignKey
ALTER TABLE "reservation_guests" ADD CONSTRAINT "reservation_guests_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservarions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
