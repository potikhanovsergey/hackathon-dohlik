import db, { Prisma } from "db"

export default async function getAgendas(input: Prisma.AgendaFindManyArgs) {
  const agendas = await db.agenda.findMany(input)
  return agendas
}
