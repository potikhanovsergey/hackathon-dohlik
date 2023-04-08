import { BlitzPage } from "@blitzjs/next"
import { Container } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import EntityHeader from "src/entities/EntityHeader"
import EntityTabs from "src/entities/EntityTabs"

const EntityPage: BlitzPage = () => {
  return (
    <Layout title="Объект">
      <Container size="xl">
        <EntityHeader />
        <EntityTabs />
      </Container>
    </Layout>
  )
}

export default EntityPage
