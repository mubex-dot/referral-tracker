/*
  Warnings:

  - You are about to drop the column `conversionCount` on the `Referral` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Referral" DROP COLUMN "conversionCount",
ADD COLUMN     "converted" BOOLEAN NOT NULL DEFAULT false;
