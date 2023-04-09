import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Button, Container, Group, Title } from "@mantine/core"
import AgendasTable from "src/agendas/AgendasTable"

const AgendasPage: BlitzPage = () => {
  return (
    <Layout title="Повестки">
      <Container size="xl">
        <Title mb="md">Повестки</Title>
        <AgendasTable />
      </Container>
    </Layout>
  )
}

export default AgendasPage
