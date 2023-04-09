import { Group, Text, Button, Stack, Paper, Box } from "@mantine/core"
import { IconCalendar, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react"
import dayjs from "dayjs"
import Link from "src/core/Link"
import { openConfirmModal, openModal } from "@mantine/modals"
import EventForm from "./EventForm"
import { ExtendedEvent } from "src/pages/calendar"
import { Routes } from "@blitzjs/next"

const Event = ({ name, date, meetingUrl, assignments }: ExtendedEvent) => {
  const openConfirmDeleteModal = () =>
    openConfirmModal({
      title: "Пожалуйста, подтвердите свое действие",
      children: (
        <Text size="sm">
          Пожалуйста, подвтердите, что вы хотите удалить встречу. Это действия необратимо.
        </Text>
      ),
      centered: true,
      confirmProps: { color: "red" },
      labels: { confirm: "Удалить", cancel: "Отмена" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    })

  const openEditModal = () =>
    openModal({
      title: "Редактировать событие",
      children: <EventForm />,
      centered: true,
    })

  return (
    <Paper withBorder>
      <Group position="apart" align="flex-start" noWrap pb="sm">
        <Group align="flex-start">
          <div>
            <Text weight="bold" mb={4}>
              {name}
            </Text>
            <Group spacing="xs">
              <Text size="sm" color="dimmed">
                <Group spacing="xs">
                  <IconCalendar size={20} />
                  {dayjs(date).format("D MMMM YYYY")}
                </Group>
              </Text>
            </Group>
            <Group>
              <Link target="_blank" href={"/"}>
                Рабочая группа
              </Link>
              <Link target="_blank" href={meetingUrl}>
                Ссылка на встречу
              </Link>
            </Group>

            <Box mt="xs">
              <Text weight="bold">Обсуждаемые поручения: </Text>
              <Group>
                <Text>
                  {assignments.map((assignment, i) => (
                    <>
                      {assignment.name}
                      {i < assignments.length - 1 && ", "}
                    </>
                  ))}
                </Text>
              </Group>
            </Box>
            <Box mt="xs">
              <Text weight="bold">По объектам соответственно: </Text>
              <Group>
                {assignments.map((assignment, i) => (
                  <Link
                    key={assignment.solution.entityId}
                    href={Routes.EntityPage({ id: assignment.solution.entityId })}
                  >
                    №{assignment.solution.entityId}
                    {i < assignments.length - 1 && ", "}
                  </Link>
                ))}
              </Group>
            </Box>
          </div>
        </Group>
        <Stack spacing="xs">
          {dayjs(date).isBefore(new Date()) && (
            <Button size="xs" leftIcon={<IconPlus size={16} />} compact>
              Создать протокол
            </Button>
          )}
          <Button
            size="xs"
            variant="outline"
            leftIcon={<IconEdit size={16} />}
            onClick={openEditModal}
            compact
          >
            Редактировать
          </Button>
          <Button
            color="red"
            size="xs"
            leftIcon={<IconTrash size={16} />}
            onClick={openConfirmDeleteModal}
            compact
          >
            Удалить встречу
          </Button>
        </Stack>
      </Group>
    </Paper>
  )
}

export default Event
