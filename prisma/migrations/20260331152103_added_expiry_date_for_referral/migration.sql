/*
  Warnings:

  - Added the required column `expiresAt` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Referral" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
