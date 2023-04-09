import db, { Prisma } from "db"

export default async function createSolution(input: Prisma.SolutionCreateArgs) {
  const solution = await db.solution.create(input)
  return solution
}
