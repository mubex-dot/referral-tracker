/*
  Warnings:

  - You are about to drop the column `referralCode` on the `Click` table. All the data in the column will be lost.
  - Added the required column `referralId` to the `Click` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Click" DROP COLUMN "referralCode",
ADD COLUMN     "referralId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "Referral"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
