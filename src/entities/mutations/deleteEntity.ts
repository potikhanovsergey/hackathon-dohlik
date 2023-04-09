import db, { Prisma } from "db"

export default async function deleteEntity(input: Prisma.EntityDeleteArgs) {
  const entity = await db.entity.delete(input)
  return entity
}
