import db, { Prisma } from "db"

export default async function getAgendas(input: Prisma.AgendaCreateManyArgs) {
  const agendas = await db.agenda.createMany(input)
  return agendas
}
