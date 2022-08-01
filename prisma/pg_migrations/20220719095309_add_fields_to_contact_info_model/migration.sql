-- AlterTable
ALTER TABLE "ContactInfo" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isObsolete" BOOLEAN NOT NULL DEFAULT false;
