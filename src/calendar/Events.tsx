import { Stack } from "@mantine/core"
import Event from "./Event"

const Events = () => {
  return (
    <Stack>
      {[0, 1, 2, 3, 4].map((event) => (
        <Event key={event} />
      ))}
    </Stack>
  )
}

export default Events
