import db, { Prisma } from "db"

export default async function createAgendas(input: Prisma.AgendaCreateManyArgs) {
  const agendas = await db.agenda.createMany(input)
  return agendas
}
