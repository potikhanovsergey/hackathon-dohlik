import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Box, Button, Group, Stack, Title } from "@mantine/core"
import Calendar from "src/calendar/Calendar"
import Events from "src/calendar/Events"

const CalendarPage: BlitzPage = () => {
  return (
    <Layout title="Календарь">
      <Title mb="xl">Ближайшие события</Title>
      <Group noWrap spacing={64} align="flex-start">
        <Box sx={{ flex: 1 }}>
          <Events />
        </Box>
        <Stack w="fit-content">
          <Calendar />
          <Button>Добавить событие</Button>
        </Stack>
      </Group>
    </Layout>
  )
}

export default CalendarPage
