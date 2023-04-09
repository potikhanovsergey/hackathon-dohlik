-- AlterEnum
ALTER TYPE "AssignmentStatus" ADD VALUE 'doneAndVerified';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT;
