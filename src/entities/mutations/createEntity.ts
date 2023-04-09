import db, { Prisma } from "db"

export default async function createEntity(input: Prisma.EntityCreateArgs) {
  const entity = await db.entity.create(input)
  return entity
}
