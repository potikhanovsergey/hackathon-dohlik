import db, { Prisma } from "db"

export default async function getAssignments(input: Prisma.AssignmentFindManyArgs) {
  const assignments = await db.assignment.findMany(input)
  return assignments
}
