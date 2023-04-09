import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, Title, Text } from "@mantine/core"
import SolutionCard from "src/solutions/SolutionCard"
import AssignmentsTable from "src/assigments/AssignmentsTable"

const SolutionPage: BlitzPage = () => {
  return (
    <Layout title="Решение">
      <Container size="xl">
        <Title mb="md">Решение </Title>
        <SolutionCard />
        <Text size="xl" weight="bold" my="md">
          Поручения по решению
        </Text>
        <AssignmentsTable />
      </Container>
    </Layout>
  )
}

export default SolutionPage
