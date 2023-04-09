import db, { Prisma } from "db"

export default async function createEntities(input: Prisma.EntityCreateManyArgs) {
  const entities = await db.entity.createMany(input)
  return entities
}
