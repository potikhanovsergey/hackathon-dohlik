import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Box, Button, Group, Stack, Title } from "@mantine/core"
import Calendar from "src/calendar/Calendar"
import Events from "src/calendar/Events"
import { eventsMock } from "src/calendar/mock"

const CalendarPage: BlitzPage = () => {
  return (
    <Layout title="Календарь">
      <Title mb="xl">Ближайшие события</Title>
      <Group noWrap spacing={64} align="flex-start">
        <Box sx={{ flex: 1 }}>
          <Events events={eventsMock} />
        </Box>
        <Stack w="fit-content">
          <Calendar events={eventsMock} />
          <Button>Добавить событие</Button>
        </Stack>
      </Group>
    </Layout>
  )
}

export default CalendarPage
