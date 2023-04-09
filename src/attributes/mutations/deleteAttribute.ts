import db, { Prisma } from "db"

export default async function deleteAttribute(input: Prisma.AttributeDeleteArgs) {
  const attribute = await db.attribute.delete(input)
  return attribute
}
