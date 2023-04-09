import db, { Prisma } from "db"

export default async function upsertAttribute(input: Prisma.AttributeUpsertArgs) {
  const attribute = await db.attribute.upsert(input)
  return attribute
}
