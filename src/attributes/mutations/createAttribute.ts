import db, { Prisma } from "db"

export default async function createAttribute(input: Prisma.AttributeCreateArgs) {
  const attribute = await db.attribute.create(input)
  return attribute
}
