/*
  Warnings:

  - The values [waiting] on the enum `AssignmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Agenda` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `status` on the `Assignment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AssignmentStatus_new" AS ENUM ('new', 'inProgress', 'done');
ALTER TABLE "Assignment" ALTER COLUMN "status" TYPE "AssignmentStatus_new" USING ("status"::text::"AssignmentStatus_new");
ALTER TYPE "AssignmentStatus" RENAME TO "AssignmentStatus_old";
ALTER TYPE "AssignmentStatus_new" RENAME TO "AssignmentStatus";
DROP TYPE "AssignmentStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Agenda" DROP CONSTRAINT "Agenda_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "Agenda" DROP CONSTRAINT "Agenda_meetingId_fkey";

-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "eventId" INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" "AssignmentStatus" NOT NULL;

-- DropTable
DROP TABLE "Agenda";

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
