import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Box, Button, Group, Stack, Title } from "@mantine/core"
import Calendar from "src/calendar/Calendar"
import Events from "src/calendar/Events"
import { eventsMock } from "src/calendar/mock"
import { useComputed, useSelector } from "@legendapp/state/react"
import dayjs from "dayjs"
import { datesFilter } from "src/calendar/store"
import { EventsProps } from "src/calendar/types"
import { useMemo } from "react"

const CalendarPage: BlitzPage = () => {
  const filteredDates = useSelector(datesFilter)
  const events = useMemo(() => {
    if (!filteredDates.length) return eventsMock
    return eventsMock.filter((d) => {
      const inFilteredDates = filteredDates.some((date) => dayjs(date).isSame(d.date, "day"))
      return inFilteredDates
    })
  }, [filteredDates])
  return (
    <Layout title="Календарь">
      <Title mb="xl">Ближайшие события</Title>
      <Group noWrap spacing={64} align="flex-start">
        <Box sx={{ flex: 1 }}>
          <Events events={events} />
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
