import { Stack } from "@mantine/core"
import Event from "./Event"
import { eventsMock } from "./mock"

const Events = () => {
  return (
    <Stack>
      {eventsMock.map((event) => (
        <Event key={event.name + event.date.toString()} {...event} />
      ))}
    </Stack>
  )
}

export default Events
