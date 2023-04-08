import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Grid, Title } from "@mantine/core"
import Calendar from "src/calendar/Calendar"
import Events from "src/calendar/Events"

const CalendarPage: BlitzPage = () => {
  return (
    <Layout title="Календарь">
      <Title mb="xl">Ближайшие события</Title>
      <Grid gutter={64}>
        <Grid.Col span={8}>
          <Events />
        </Grid.Col>
        <Grid.Col span={4}>
          <Calendar />
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export default CalendarPage
