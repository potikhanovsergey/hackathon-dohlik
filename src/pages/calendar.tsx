import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Box, Button, Group, Stack, Title, Container, TextInput, Select } from "@mantine/core"
import Calendar from "src/calendar/Calendar"
import Events from "src/calendar/Events"
import { useSelector } from "@legendapp/state/react"
import dayjs from "dayjs"
import { datesFilter } from "src/calendar/store"
import { useEffect, useMemo, useState } from "react"
import { openModal } from "@mantine/modals"
import EventForm from "src/calendar/EventForm"
import { IconSearch } from "@tabler/icons-react"
import { useDebouncedValue } from "@mantine/hooks"
import getEvents from "src/calendar/queries/getEvents"
import { useQuery } from "@blitzjs/rpc"
import { Assignment, Solution, Event, Entity } from "db"
import getEntities from "src/entities/queries/getEntities"
import getWorkgroups from "src/workgroups/queries/getWorkgroups"

export interface ExtendedEvent extends Event {
  assignments: (Assignment & {
    solution: Solution & {
      entity: Entity
    }
  })[]
}

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

  const [eventsFromDB] = useQuery(
    getEvents,
    {
      include: {
        assignments: {
          include: {
            solution: {
              include: {
                entity: true,
              },
            },
          },
        },
      },
    },
    { refetchOnReconnect: false, refetchOnWindowFocus: false }
  )

  const [entities] = useQuery(
    getEntities,
    {
      include: {
        attributes: true,
      },
    },
    { refetchOnReconnect: false, refetchOnWindowFocus: false }
  )

  const [workgroups] = useQuery(getWorkgroups, {})

  const filteredEvents = useSelector(datesFilter)
  const events = useMemo(() => {
    if (!eventsFromDB) return []
    let result = eventsFromDB as ExtendedEvent[]
    if (debouncedSearchValue.length > 0) {
      result = result.filter((d) =>
        d.name.toLocaleLowerCase().includes(debouncedSearchValue.toLowerCase())
      )
    }
    // Фильтр событий по выбранной рабочей группе
    if (groupValue) {
      result = result.filter((d) =>
        d.assignments.some((assignment) => assignment.solution.workgroupId === +groupValue)
      )
    }
    if (entityValue) {
      result = result.filter((d) =>
        d.assignments.some((assignment) => assignment.solution.entityId === +entityValue)
      )
    }
    if (!filteredEvents.length) return result
    return result.filter((d) => {
      const inFilteredDates = filteredEvents.some((date) => dayjs(date).isSame(d.date, "day"))
      return inFilteredDates
    })
  }, [debouncedSearchValue, entityValue, eventsFromDB, filteredEvents, groupValue])

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
            placeholder="Первая"
            data={
              workgroups?.map((workgroup) => ({
                label: workgroup.name || `№ ${workgroup.id}`,
                value: workgroup.id.toString(),
              })) || []
            }
            clearable
            value={groupValue}
            onChange={setGroupValue}
          />
          <Select
            label="Объект"
            placeholder="Малая Семеновская, 12"
            data={
              entities?.map((entity) => ({
                label: entity.address || `№ ${entity.id}`,
                value: entity.id.toString(),
              })) || []
            }
            clearable
            value={entityValue}
            onChange={setEntityValue}
          />
        </Group>
        <Group noWrap spacing={64} align="flex-start">
          <Box sx={{ flex: 1 }}>
            <Events events={events as ExtendedEvent[]} />
          </Box>
          <Stack w="fit-content">
            <Calendar events={eventsFromDB as ExtendedEvent[]} />
            <Button onClick={openAddEventModal}>Добавить событие</Button>
          </Stack>
        </Group>
      </Container>
    </Layout>
  )
}

export default CalendarPage
