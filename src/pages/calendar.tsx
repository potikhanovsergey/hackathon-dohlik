import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Box, Button, Group, Stack, Title, Container, TextInput, Select } from "@mantine/core"
import Calendar from "src/calendar/Calendar"
import Events from "src/calendar/Events"
import { eventsMock } from "src/calendar/mock"
import { useSelector } from "@legendapp/state/react"
import dayjs from "dayjs"
import { datesFilter } from "src/calendar/store"
import { useMemo, useState } from "react"
import { openModal } from "@mantine/modals"
import EventForm from "src/calendar/EventForm"
import { IconSearch } from "@tabler/icons-react"
import { useDebouncedValue } from "@mantine/hooks"

const CalendarPage: BlitzPage = () => {
  const openAddEventModal = () =>
    openModal({
      title: "Добавить событие",
      children: <EventForm />,
      centered: true,
    })

  const [searchValue, setSearchValue] = useState("")
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 200)

  const [groupValue, setGroupValue] = useState<string | null>(null)
  const [entityValue, setEntityValue] = useState<string | null>(null)

  const filteredEvents = useSelector(datesFilter)
  const events = useMemo(() => {
    let result = eventsMock
    if (debouncedSearchValue.length > 0) {
      result = result.filter((d) =>
        d.name.toLocaleLowerCase().includes(debouncedSearchValue.toLowerCase())
      )
    }
    if (groupValue) {
      result = result.filter((d) => d.groupId === +groupValue)
    }
    if (entityValue) {
      result = result.filter((d) => d.entityId === +entityValue)
    }
    if (!filteredEvents.length) return result
    return result.filter((d) => {
      const inFilteredDates = filteredEvents.some((date) => dayjs(date).isSame(d.date, "day"))
      return inFilteredDates
    })
  }, [debouncedSearchValue, entityValue, filteredEvents, groupValue])

  return (
    <Layout title="Календарь">
      <Container size="xl">
        <Title mb="xl">Ближайшие события</Title>
        <Group mb="xl" noWrap>
          <TextInput
            label="Поиск по названию"
            placeholder="Встреча по сносу..."
            icon={<IconSearch size={16} />}
            onChange={(event) => setSearchValue(event.currentTarget.value)}
          />
          <Select
            label="Рабочая группа"
            placeholder="Первая..."
            data={[
              {
                label: "Первая",
                value: "1",
              },
              {
                label: "Вторая",
                value: "2",
              },
              {
                label: "Третья",
                value: "3",
              },
            ]}
            clearable
            value={groupValue}
            onChange={setGroupValue}
          />
          <Select
            label="Объект"
            placeholder="Малая Семеновская, 12"
            data={[
              {
                label: "Малая Семеновская, 12",
                value: "1",
              },
              {
                label: "Большая Семеновская, 12",
                value: "2",
              },
              {
                label: "Мизерная Семеновская, 12",
                value: "3",
              },
            ]}
            clearable
            value={entityValue}
            onChange={setEntityValue}
          />
        </Group>
        <Group noWrap spacing={64} align="flex-start">
          <Box sx={{ flex: 1 }}>
            <Events events={events} />
          </Box>
          <Stack w="fit-content">
            <Calendar events={eventsMock} />
            <Button onClick={openAddEventModal}>Добавить событие</Button>
          </Stack>
        </Group>
      </Container>
    </Layout>
  )
}

export default CalendarPage
