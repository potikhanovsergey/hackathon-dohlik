import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Title } from "@mantine/core"

const CalendarPage: BlitzPage = () => {
  return (
    <Layout title="Календарь">
      <Title>Календарь</Title>
    </Layout>
  )
}

export default CalendarPage
