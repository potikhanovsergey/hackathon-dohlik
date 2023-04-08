import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, Title } from "@mantine/core"
import DashboardTabs from "src/dashboard/DashboardTabs"

const DashboardPage: BlitzPage = () => {
  return (
    <Layout title="Настройка форм">
      <Container size="xl">
        <Title>Настройка форм</Title>
        <DashboardTabs />
      </Container>
    </Layout>
  )
}

export default DashboardPage
