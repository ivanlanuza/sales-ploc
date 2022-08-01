/*
  Warnings:

  - Added the required column `segmentId` to the `BusinessType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessType" ADD COLUMN     "segmentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "BusinessType" ADD CONSTRAINT "BusinessType_segmentId_fkey" FOREIGN KEY ("segmentId") REFERENCES "Segment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
