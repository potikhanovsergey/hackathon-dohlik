import db, { Prisma } from "db"

export default async function getProtocols(input: Prisma.ProtocolFindManyArgs) {
  const protocols = await db.protocol.findMany(input)
  return protocols
}
