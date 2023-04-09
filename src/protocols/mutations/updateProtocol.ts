import db, { Prisma } from "db"

export default async function updateProtocol(input: Prisma.ProtocolUpdateArgs) {
  const protocol = await db.protocol.update(input)
  return protocol
}
