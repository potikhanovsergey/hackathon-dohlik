/*
  Warnings:

  - The values [solution] on the enum `AttributeParent` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttributeParent_new" AS ENUM ('entity');
ALTER TABLE "Attribute" ALTER COLUMN "parent" TYPE "AttributeParent_new" USING ("parent"::text::"AttributeParent_new");
ALTER TYPE "AttributeParent" RENAME TO "AttributeParent_old";
ALTER TYPE "AttributeParent_new" RENAME TO "AttributeParent";
DROP TYPE "AttributeParent_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_protocolId_fkey";

-- AlterTable
ALTER TABLE "Solution" ALTER COLUMN "protocolId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_protocolId_fkey" FOREIGN KEY ("protocolId") REFERENCES "Protocol"("id") ON DELETE SET NULL ON UPDATE CASCADE;
