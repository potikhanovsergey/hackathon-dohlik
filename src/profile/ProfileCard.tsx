import { Paper, Group, Avatar, Stack, Text, ActionIcon, Menu, Button } from "@mantine/core"
import { User } from "@prisma/client"
import { IconTrash } from "@tabler/icons-react"
import { useState } from "react"

const ProfileCard = ({ withDelete = false, user }: { withDelete?: boolean; user: User }) => {
  const [menuOpened, setMenuOpened] = useState(false)

  return (
    <Paper withBorder>
      <Group noWrap>
        <Avatar alt="" src={user.avatar} size="lg" />
        <Stack spacing={0}>
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
        </Stack>
        {withDelete && (
          <Menu width={200} opened={menuOpened} onChange={setMenuOpened}>
            <Menu.Target>
              <ActionIcon color="red" variant="transparent">
                <IconTrash size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown p="sm">
              <Text align="right" size="sm" mb="xs">
                Вы уверены, что хотите удалить пользователя из группы?
              </Text>
              <Group position="right" spacing={4}>
                <Button onClick={() => setMenuOpened(false)}>Отмена</Button>
                <Button color="red" onClick={() => setMenuOpened(false)}>
                  Удалить
                </Button>
              </Group>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </Paper>
  )
}

export default ProfileCard
