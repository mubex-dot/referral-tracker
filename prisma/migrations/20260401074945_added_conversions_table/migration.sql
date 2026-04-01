-- CreateTable
CREATE TABLE "Conversion" (
    "id" TEXT NOT NULL,
    "referralId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conversion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conversion" ADD CONSTRAINT "Conversion_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "Referral"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
