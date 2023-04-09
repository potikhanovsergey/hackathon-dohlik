/*
  Warnings:

  - You are about to drop the column `responsibleId` on the `Assignment` table. All the data in the column will be lost.
  - Added the required column `responsible` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_responsibleId_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "responsibleId",
ADD COLUMN     "responsible" TEXT NOT NULL;
