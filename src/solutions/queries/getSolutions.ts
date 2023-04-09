import db, { Prisma } from "db"

export default async function getSolutions(input: Prisma.SolutionFindManyArgs) {
  const solutions = await db.solution.findMany(input)
  return solutions
}
