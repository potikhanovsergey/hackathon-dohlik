import { Box, Group, Button, Table, Text, Badge, Stack } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react"
import Link from "src/core/Link"
import ThMenu from "src/core/NavigationTable/ThMenu"
import { useForm } from "@mantine/form"
import { agendasTableMock } from "./agendasTableMock"
import { ExtendedAssignments } from "src/pages/agendas"
import dayjs from "dayjs"
import { Routes } from "@blitzjs/next"
import { openModal } from "@mantine/modals"
import EventForm from "src/calendar/EventForm"
import { Assignment } from "@prisma/client"

const now = new Date()

const BadgeStatus = ({ status, deadline }: { status: Assignment["status"]; deadline: Date }) => {
  const color = {
    done: "violet",
    expired: "red",
  }

  const label = {
    done: "Завершен",
    expired: "Истек",
    new: "Новый",
    default: "В работе",
  }

  const badgeStatus =
    status === "done"
      ? "done"
      : deadline.getMilliseconds() < now.getMilliseconds()
      ? "expired"
      : status === "new"
      ? "new"
      : "default"
  return (
    <Badge size="xs" color={color[badgeStatus]}>
      {label[badgeStatus]}
    </Badge>
  )
}

const AgendasTable = ({ assignments }: { assignments: ExtendedAssignments[] }) => {
  const openAddEventModal = () =>
    openModal({
      title: "Добавить событие",
      children: <EventForm />,
      centered: true,
    })

  const rows = assignments?.map((assignment) => (
    <Box component="tr" key={assignment.id}>
      <td>{dayjs(assignment.createdAt).format("D MMMM YYYY")}</td>
      <td>
        <BadgeStatus status={assignment.status} deadline={assignment.deadline} />
      </td>
      <td>
        <Link target="_blank" href={Routes.SolutionPage({ id: assignment.solutionId })}>
          Решение
        </Link>
      </td>
      <td>{assignment.name}</td>
      <td>
        {assignment.solution.protocolId ? (
          <Link target="_blank" href={Routes.ProtocolPage({ id: assignment.solution.protocolId })}>
            34534
          </Link>
        ) : (
          <Text>-</Text>
        )}
      </td>
      <td>
        <Link target="_blank" href={Routes.EntityPage({ id: assignment.solution.entityId })}>
          Объект
        </Link>
      </td>
      <td>
        <Link target="_blank" href="/">
          Группа
        </Link>
      </td>
      <td>
        {assignment.eventId ? (
          <Link target="_blank" href={Routes.CalendarPage()}>
            Встреча: {assignment.event.name} {dayjs(assignment.event.date).format("D MMMM YYYY")}
          </Link>
        ) : (
          <Button compact onClick={openAddEventModal}>
            Запланировать встречу
          </Button>
        )}
      </td>
    </Box>
  ))

  const columns = [
    { label: "Дата", value: "creationDate", type: ["sort"] },
    { label: "Статус", value: "status", type: ["search"] },
  ]

  const form = useForm({
    initialValues: {
      sort: {
        date: null,
      },
      search: {
        status: "",
      },
    },
  })

  const handleExport = async () => {
    const excelExport = await (await import("src/excelExport")).default

    await excelExport({ fileName: "Решения по объекту", excelData: assignments })
  }

  return (
    <Stack mt="md">
      <Group position="right">
        <Button color="green" onClick={handleExport}>
          Экспортировать таблицу
        </Button>
      </Group>
      <Table fontSize="xs">
        <thead>
          <tr>
            {columns.map((column) => (
              <ThMenu
                key={column.label}
                sx={{ whiteSpace: "nowrap" }}
                sort={
                  column.type.includes("sort")
                    ? { ...form.getInputProps(`sort.${column.value}`) }
                    : undefined
                }
                search={
                  column.type.includes("search")
                    ? { ...form.getInputProps(`search.${column.value}`) }
                    : undefined
                }
              >
                <Group noWrap spacing={4} position="apart" sx={{ cursor: "pointer" }}>
                  {column.label}
                  <IconChevronDown size={16} />
                </Group>
              </ThMenu>
            ))}
            <th>Решение</th>
            <th>Поручение</th>
            <th>Протокол</th>
            <th>Объект</th>
            <th>Рабочая группа</th>
            <th>Планирование встречи рабочей группы</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Stack>
  )
}

export default AgendasTable
