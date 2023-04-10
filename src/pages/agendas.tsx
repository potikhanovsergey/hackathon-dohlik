import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, Title } from "@mantine/core"
import AgendasTable from "src/agendas/AgendasTable"
import getAssignments from "src/assigments/queries/getAssignments"
import { useQuery } from "@blitzjs/rpc"
import { Assignment, Solution, Event, Entity } from "@prisma/client"

export interface ExtendedAssignments extends Assignment {
  solution: Solution & { entity: Entity }
  event: Event
}

const now = new Date()

const AgendasPage: BlitzPage = () => {
  const [assignments] = useQuery(getAssignments, {
    include: {
      solution: {
        include: {
          assignments: true,
        },
      },
      event: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      OR: [
        {
          status: {
            in: ["done", "new"],
          },
        },
        {
          deadline: {
            lt: now,
          },
        },
      ],
    },
  })

  return (
    <Layout title="Повестки">
      <Container size="xl">
        <Title mb="md">Повестки</Title>
        <AgendasTable assignments={assignments as ExtendedAssignments[]} />
      </Container>
    </Layout>
  )
}

export default AgendasPage
