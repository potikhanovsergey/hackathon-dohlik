import { Stack } from "@mantine/core"
import WorkGroup from "./WorkGroup"

const PersonalGroups = () => {
  return (
    <Stack>
      {[1, 2, 3].map((i) => (
        <WorkGroup key={i} />
      ))}
    </Stack>
  )
}

export default PersonalGroups
