import { Group, Avatar, Text, ActionIcon, Menu, Anchor, Button, Stack } from "@mantine/core"
import { IconCalendar, IconEdit, IconLink, IconSettings, IconTrash } from "@tabler/icons-react"
import { EventProps } from "./types"
import dayjs from "dayjs"
import Link from "src/core/Link"

const Event = ({ avatar, name, date, entityId }: EventProps) => {
  return (
    <Group
      position="apart"
      pb="sm"
      sx={(theme) => ({ borderBottom: `1px solid ${theme.colors.gray[1]}` })}
    >
      <Group align="flex-start">
        <Avatar size={64} alt="" src={avatar} />
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
            <Link target="_blank" href={`/entities/${entityId}`}>
              Объект
            </Link>
          </Group>
        </div>
      </Group>
      <Stack spacing="xs">
        <Button size="xs" variant="outline" leftIcon={<IconEdit size={16} />}>
          Редактировать
        </Button>
        <Button color="red" size="xs" leftIcon={<IconTrash size={16} />}>
          Удалить встречу
        </Button>
      </Stack>
    </Group>
  )
}

export default Event
