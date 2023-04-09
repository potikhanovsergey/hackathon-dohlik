import { Stack, TextInput, Group, Button } from "@mantine/core"
import { IconPlus, IconSearch } from "@tabler/icons-react"
import WorkGroup from "src/profile/WorkGroup"

const DashboardGroups = () => {
  return (
    <Stack>
      <Group align="flex-end" position="apart" mb="md">
        <TextInput
          label="Поиск по номеру группы"
          placeholder="12314.."
          icon={<IconSearch size={16} />}
        />
        <Button leftIcon={<IconPlus size={16} />}>Создать группу</Button>
      </Group>
      {[1, 2, 3].map((i) => (
        <WorkGroup key={i} withUserDelete={true} withButtons={true} />
      ))}
    </Stack>
  )
}

export default DashboardGroups
