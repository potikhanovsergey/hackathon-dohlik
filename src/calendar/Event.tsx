import { Group, Avatar, Text, Button, Stack } from "@mantine/core"
import { IconCalendar, IconEdit, IconTrash } from "@tabler/icons-react"
import { EventProps } from "./types"
import dayjs from "dayjs"
import Link from "src/core/Link"
import { openConfirmModal, openModal } from "@mantine/modals"
import EventForm from "./EventForm"

const Event = ({ avatar, name, date, entityId }: EventProps) => {
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
    <Group
      position="apart"
      pb="sm"
      sx={(theme) => ({ borderBottom: `1px solid ${theme.colors.gray[1]}` })}
    >
      <Group align="flex-start">
        <div>
          <Text weight="bold" mb={4}>
            {name}
          </Text>
          <Group spacing="xs">
            <Text size="sm" color="dimmed">
              <Group spacing="xs">
                <IconCalendar size={20} />
                {dayjs(date).format("DD MMMM YYYY")}
              </Group>
            </Text>
            <Link target="_blank" href="/">
              Ссылка на встречу
            </Link>
          </Group>
          <Link target="_blank" href={"/"}>
            Группа
          </Link>
        </div>
      </Group>
      <Stack spacing="xs">
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
  )
}

export default Event
