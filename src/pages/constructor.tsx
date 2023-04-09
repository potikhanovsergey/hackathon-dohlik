import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, Title } from "@mantine/core"
import DashboardTabs from "src/constructor/DashboardTabs"

const ConstructorPage: BlitzPage = () => {
  return (
    <Layout title="Настройка форм">
      <Container size="xl">
        <Title mb="md">Настройка форм</Title>
        <DashboardTabs />
      </Container>
    </Layout>
  )
}

export default ConstructorPage
