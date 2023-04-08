import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Title } from "@mantine/core"
import EntitiesTable from "src/entities/EntitiesTable"

const EntitiesPage: BlitzPage = () => {
  return (
    <Layout title="Объекты">
      <Title mb="xl">Объекты</Title>
      <EntitiesTable />
    </Layout>
  )
}

export default EntitiesPage
