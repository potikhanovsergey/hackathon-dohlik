import { Stack } from "@mantine/core"
import WorkGroup from "src/profile/WorkGroup"

const DashboardGroups = () => {
  return (
    <Stack>
      {[1, 2, 3].map((i) => (
        <WorkGroup key={i} withUserDelete={true} withButtons={true} />
      ))}
    </Stack>
  )
}

export default DashboardGroups
