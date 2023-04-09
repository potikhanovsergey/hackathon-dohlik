import db, { Prisma } from "db"

export default async function createEvent(input: Prisma.EventCreateArgs) {
  const event = await db.event.create(input)
  return event
}
