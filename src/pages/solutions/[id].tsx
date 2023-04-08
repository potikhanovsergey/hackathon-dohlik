import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, Title } from "@mantine/core"
import SolutionCard from "src/solutions/SolutionCard"

const SolutionPage: BlitzPage = () => {
  return (
    <Layout title="Решение">
      <Container size="xl">
        <Title mb="md">Решение</Title>
        <SolutionCard />
      </Container>
    </Layout>
  )
}

export default SolutionPage
