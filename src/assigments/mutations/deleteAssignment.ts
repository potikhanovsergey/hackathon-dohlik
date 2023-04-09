import db, { Prisma } from "db"

export default async function deleteAssignment(input: Prisma.AssignmentDeleteArgs) {
  const assignment = await db.assignment.delete(input)
  return assignment
}
