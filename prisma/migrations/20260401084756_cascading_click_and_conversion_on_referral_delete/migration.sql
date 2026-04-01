-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_referralId_fkey";

-- DropForeignKey
ALTER TABLE "Conversion" DROP CONSTRAINT "Conversion_referralId_fkey";

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "Referral"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversion" ADD CONSTRAINT "Conversion_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "Referral"("id") ON DELETE CASCADE ON UPDATE CASCADE;
