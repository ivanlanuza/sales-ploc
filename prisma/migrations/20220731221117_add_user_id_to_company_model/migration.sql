-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '1';

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
