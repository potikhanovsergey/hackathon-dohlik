import db, { Prisma } from "db"

export default async function deleteFiles(input: Prisma.EntityFileDeleteManyArgs) {
  const files = await db.entityFile.deleteMany(input)
  return files
}
