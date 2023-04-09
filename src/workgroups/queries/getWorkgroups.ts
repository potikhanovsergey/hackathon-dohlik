import db, { Prisma } from "db"

export default async function getWorkgroups(input: Prisma.WorkgroupFindManyArgs) {
  const workgroups = await db.workgroup.findMany(input)
  return workgroups
}
