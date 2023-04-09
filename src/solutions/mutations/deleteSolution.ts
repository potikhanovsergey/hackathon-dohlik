import db, { Prisma } from "db"

export default async function deleteSolution(input: Prisma.SolutionDeleteArgs) {
  const solution = await db.solution.delete(input)
  return solution
}
