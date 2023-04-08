import { Group, Text, ActionIcon, Button } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"
import ProfileCard from "./ProfileCard"

const WorkGroup = ({
  withButtons = false,
  withUserDelete = false,
}: {
  withButtons?: boolean
  withUserDelete?: boolean
}) => {
  return (
    <>
      <Group position="apart" align="center">
        <Group spacing={0} align="center">
          <Text weight="bold" size="lg">
            Группа №9485
          </Text>
          {withButtons && (
            <ActionIcon color="red" variant="transparent">
              <IconTrash size={16} />
            </ActionIcon>
          )}
        </Group>
        {withButtons && <Button size="sm">Добавить пользователя в группу</Button>}
      </Group>
      <Group>
        {[1, 2, 3, 4, 5].map((i) => (
          <ProfileCard key={i} withDelete={withUserDelete} />
        ))}
      </Group>
    </>
  )
}

export default WorkGroup
