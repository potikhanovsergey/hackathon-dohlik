import db, { Prisma } from "db"

export default async function getEvents(input: Prisma.EventFindManyArgs) {
  const events = await db.event.findMany(input)
  return events
}
