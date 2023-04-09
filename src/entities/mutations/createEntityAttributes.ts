import db, { Prisma } from "db"

export default async function createEntityAttributes(input: Prisma.EntityAttributeCreateManyArgs) {
  const entityAttributes = await db.entityAttribute.createMany(input)
  return entityAttributes
}
