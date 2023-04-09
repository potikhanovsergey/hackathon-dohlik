import db, { Prisma } from "db"

export default async function updateSolution(input: Prisma.SolutionUpdateArgs) {
  const solution = await db.solution.update(input)
  return solution
}
