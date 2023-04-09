import db, { Prisma } from "db"

export default async function deleteAgenda(input: Prisma.AgendaDeleteArgs) {
  const agenda = await db.agenda.delete(input)
  return agenda
}
