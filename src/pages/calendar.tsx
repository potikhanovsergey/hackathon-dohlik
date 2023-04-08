import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Box, Button, Group, Stack, Title } from "@mantine/core"
import Calendar from "src/calendar/Calendar"
import Events from "src/calendar/Events"
import { eventsMock } from "src/calendar/mock"
import { useSelector } from "@legendapp/state/react"
import dayjs from "dayjs"
import { datesFilter } from "src/calendar/store"
import { useMemo } from "react"
import { openModal } from "@mantine/modals"
import EventForm from "src/calendar/EventForm"

const CalendarPage: BlitzPage = () => {
  const openAddEventModal = () =>
    openModal({
      title: "Добавить событие",
      children: <EventForm />,
      centered: true,
    })

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
          <Button onClick={openAddEventModal}>Добавить событие</Button>
        </Stack>
      </Group>
    </Layout>
  )
}

export default CalendarPage
