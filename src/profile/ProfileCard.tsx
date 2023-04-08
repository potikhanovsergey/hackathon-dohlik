import { Paper, Group, Avatar, Stack, Text, ActionIcon } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"

const ProfileCard = ({ withDelete = false }: { withDelete?: boolean }) => {
  return (
    <Paper shadow="md">
      <Group noWrap>
        <Avatar size="lg" />
        <Stack spacing={0}>
          <Text>Аркадий А.А.</Text>
          <Text>arcadyi@mail.ru</Text>
        </Stack>
        {withDelete && (
          <ActionIcon color="red" variant="transparent">
            <IconTrash size={16} />
          </ActionIcon>
        )}
      </Group>
    </Paper>
  )
}

export default ProfileCard
