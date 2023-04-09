import db, { Prisma } from "db"

export default async function updateEvent(input: Prisma.EventUpdateArgs) {
  const event = await db.event.update(input)
  return event
}
