import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Title } from "@mantine/core"

const EntityPage: BlitzPage = () => {
  return (
    <Layout title="Объект">
      <Title>Объект динамический</Title>
    </Layout>
  )
}

export default EntityPage
