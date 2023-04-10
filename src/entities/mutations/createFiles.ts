import db, { Prisma } from "db"

export default async function createFiles(input: Prisma.EntityFileCreateManyArgs) {
  const files = await db.entityFile.createMany(input)
  return files
}
