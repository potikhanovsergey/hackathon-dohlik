import db, { Prisma } from "db"

export default async function deleteProtocol(input: Prisma.ProtocolDeleteArgs) {
  const protocol = await db.protocol.delete(input)
  return protocol
}
