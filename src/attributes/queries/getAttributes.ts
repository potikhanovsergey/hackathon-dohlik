import db, { Prisma } from "db"

export default async function getAttributes(input: Prisma.AttributeFindManyArgs) {
  const attributes = await db.attribute.findMany(input)
  return attributes
}
