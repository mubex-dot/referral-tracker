/*
  Warnings:

  - Added the required column `referralLink` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Referral" ADD COLUMN     "referralLink" TEXT NOT NULL;
