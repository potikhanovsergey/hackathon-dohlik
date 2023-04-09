import db, { Prisma } from "db"

export default async function updateAssignment(input: Prisma.AssignmentUpdateArgs) {
  const assignment = await db.assignment.update(input)
  return assignment
}
