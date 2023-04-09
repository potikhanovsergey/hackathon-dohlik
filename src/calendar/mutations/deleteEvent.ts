import db, { Prisma } from "db"

export default async function deleteEvent(input: Prisma.EventDeleteArgs) {
  const event = await db.event.delete(input)
  return event
}
