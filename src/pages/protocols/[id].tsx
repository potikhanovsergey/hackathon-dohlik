import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, Group, Title, Button } from "@mantine/core"
import SolutionsTable from "src/solutions/SolutionsTable"

const ProtocolPage: BlitzPage = () => {
  return (
    <Layout title="Протокол">
      <Container size="xl">
        <Group position="apart" mb="md" noWrap align="center">
          <Title>Протокол №2987</Title>
          <Button>Экспортировать протокол</Button>
        </Group>
        <SolutionsTable />
      </Container>
    </Layout>
  )
}

export default ProtocolPage
