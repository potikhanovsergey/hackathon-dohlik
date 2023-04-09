import db, { Prisma } from "db"

export default async function updateEntity(input: Prisma.EntityUpdateArgs) {
  const entity = await db.entity.update(input)
  return entity
}
