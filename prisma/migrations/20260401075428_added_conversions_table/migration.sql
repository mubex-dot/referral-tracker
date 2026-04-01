/*
  Warnings:

  - You are about to drop the column `converted` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `convertedAt` on the `Referral` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Referral" DROP COLUMN "converted",
DROP COLUMN "convertedAt";
