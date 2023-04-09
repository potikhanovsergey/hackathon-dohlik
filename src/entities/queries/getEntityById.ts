import db, { Prisma } from "db"

export default async function getEntitieById(input: Prisma.EntityFindManyArgs) {
  const entity = await db.entity.findFirst(input)
  return entity
}
