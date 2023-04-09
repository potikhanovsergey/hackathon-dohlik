import db, { Prisma } from "db"

export default async function getEntities(input: Prisma.EntityFindManyArgs) {
  const entities = await db.entity.findMany(input)
  return entities
}
