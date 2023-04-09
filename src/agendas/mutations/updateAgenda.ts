import db, { Prisma } from "db"

export default async function updateAgenda(input: Prisma.AgendaUpdateArgs) {
  const agenda = await db.agenda.update(input)
  return agenda
}
