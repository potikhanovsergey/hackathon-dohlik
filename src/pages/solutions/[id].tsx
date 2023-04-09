import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, Title, Text } from "@mantine/core"
import SolutionCard from "src/solutions/SolutionCard"
import AssignmentsTable from "src/assigments/AssignmentsTable"
import db, { Assignment, Solution } from "db"
import { GetServerSideProps } from "next"
import { gSSP } from "src/blitz-server"
import { dehydrate } from "@blitzjs/rpc"

export interface ExtendedSolution extends Solution {
  assignments: Assignment[]
}

const SolutionPage: BlitzPage = ({ solution }: { solution: ExtendedSolution }) => {
  return (
    <Layout title="Решение">
      <Container size="xl">
        <Title mb="md">Решение №{solution.id}</Title>
        <SolutionCard solution={solution} />
        <Text size="xl" weight="bold" my="md">
          Поручения по решению
        </Text>
        <AssignmentsTable solution={solution} />
      </Container>
    </Layout>
  )
}

export default SolutionPage

export const getServerSideProps: GetServerSideProps = gSSP(async ({ params }) => {
  const id = params?.id as string

  let solution: ExtendedSolution | null = null

  if (!isNaN(+id)) {
    solution = await db.solution.findFirst({
      where: {
        id: +id,
      },
      include: {
        assignments: true,
      },
    })
  }

  if (!solution) {
    return {
      notFound: true,
      props: {} as { [key: string]: any },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      solution,
    },
  }
})
