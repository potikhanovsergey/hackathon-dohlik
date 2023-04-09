import db, { Prisma } from "db"

export default async function createAssignments(input: Prisma.AssignmentCreateManyArgs) {
  const assignments = await db.assignment.createMany(input)
  return assignments
}
