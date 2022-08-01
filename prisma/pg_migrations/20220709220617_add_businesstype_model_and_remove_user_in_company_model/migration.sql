/*
  Warnings:

  - You are about to drop the column `userId` on the `Company` table. All the data in the column will be lost.
  - Added the required column `businesstypeId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_userId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "userId",
ADD COLUMN     "businesstypeId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "BusinessType" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "name" TEXT,

    CONSTRAINT "BusinessType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_businesstypeId_fkey" FOREIGN KEY ("businesstypeId") REFERENCES "BusinessType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
