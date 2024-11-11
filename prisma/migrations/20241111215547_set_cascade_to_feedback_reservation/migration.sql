-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_reservationId_fkey";

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservarions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
