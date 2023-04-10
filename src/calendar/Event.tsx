import { Group, Text, Button, Stack, Paper, Box } from "@mantine/core"
import { IconCalendar, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react"
import dayjs from "dayjs"
import Link from "src/core/Link"
import { openConfirmModal, openModal } from "@mantine/modals"
import EventForm from "./EventForm"
import { ExtendedEvent } from "src/pages/calendar"
import { Routes } from "@blitzjs/next"
import React from "react"
import deleteEvent from "./mutations/deleteEvent"
import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import getEvents from "./queries/getEvents"
import { notifications } from "@mantine/notifications"
import getAssignments from "src/assigments/queries/getAssignments"
import { ProtocolFormButton } from "src/pages/protocols"

const Event = ({ event }: { event: ExtendedEvent }) => {
  const [deleteEventMutation] = useMutation(deleteEvent)

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
      onConfirm: async () => {
        try {
          await deleteEventMutation({ where: { id: event.id } })
          notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            message: "Встреча успешно удалена",
            color: "green",
          })
          void invalidateQuery(getEvents)
          void invalidateQuery(getAssignments)
        } catch (e) {
          notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            title: "Ошибка при удалении встречи",
            message: e?.toString(),
            color: "red",
          })
        }
      },
    })

  const openEditModal = () =>
    openModal({
      title: "Редактировать событие",
      children: <EventForm event={event} />,
      centered: true,
    })

  return (
    event && (
      <Paper withBorder>
        <Group position="apart" align="flex-start" noWrap pb="sm">
          <Group align="flex-start">
            <div>
              <Text weight="bold" mb={4}>
                {event.name}
              </Text>
              <Group spacing="xs">
                <Text size="sm" color="dimmed">
                  <Group spacing="xs">
                    <IconCalendar size={20} />
                    {dayjs(event.date).format("D MMMM YYYY")}
                  </Group>
                </Text>
              </Group>
              <Group>
                <Link target="_blank" href={Routes.ProfilePage()}>
                  Рабочая группа
                </Link>
                <Link target="_blank" href={event.meetingUrl}>
                  Ссылка на встречу
                </Link>
              </Group>

              <Box mt="xs">
                <Text weight="bold">Обсуждаемые поручения: </Text>
                <Group>
                  <Text>
                    {event.assignments.map((assignment, i) => (
                      <React.Fragment key={assignment.id}>
                        {assignment.name}
                        {i < event.assignments.length - 1 && ", "}
                      </React.Fragment>
                    ))}
                  </Text>
                </Group>
              </Box>
              <Box mt="xs">
                <Text weight="bold">По объектам соответственно: </Text>
                <Group>
                  {event.assignments.map((assignment, i) => (
                    <Link
                      key={assignment.id}
                      href={Routes.EntityPage({ id: assignment.solution.entityId })}
                    >
                      №{assignment.solution.entityId}
                      {i < event.assignments.length - 1 && ", "}
                    </Link>
                  ))}
                </Group>
              </Box>
            </div>
          </Group>
          <Stack spacing="xs">
            {dayjs(event.date).isBefore(new Date()) && <ProtocolFormButton />}
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
  )
}

export default Event
