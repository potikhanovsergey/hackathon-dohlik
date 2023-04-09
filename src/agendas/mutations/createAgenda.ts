import db, { Prisma } from "db"

export default async function createAgenda(input: Prisma.AgendaCreateArgs) {
  const agenda = await db.agenda.create(input)
  return agenda
}
