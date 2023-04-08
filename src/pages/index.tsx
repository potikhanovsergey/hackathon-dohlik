import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, Title } from "@mantine/core"
import EntitiesTable from "src/entities/EntitiesTable"

const EntitiesPage: BlitzPage = () => {
  return (
    <Layout title="Объекты">
      <Container size="xl">
        <Title mb="xl">Объекты</Title>
        <EntitiesTable />
      </Container>
    </Layout>
  )
}

export default EntitiesPage
