import db, { Prisma } from "db"

export default async function createProtocol(input: Prisma.ProtocolCreateArgs) {
  const protocol = await db.protocol.create(input)
  return protocol
}
