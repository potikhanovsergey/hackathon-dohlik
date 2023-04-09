import { Stack, Group, Button } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import Workgroups from "src/profile/Workgroups"

const DashboardGroups = () => {
  return (
    <Stack>
      <Group align="flex-end" position="right" mb="md">
        <Button leftIcon={<IconPlus size={16} />}>Создать группу</Button>
      </Group>
      <Workgroups />
    </Stack>
  )
}

export default DashboardGroups
