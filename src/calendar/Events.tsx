import { Stack } from "@mantine/core"
import Event from "./Event"
import { EventsProps } from "./types"

const Events = ({ events }: { events: EventsProps }) => {
  return (
    <Stack>
      {events.map((event) => (
        <Event key={event.name + event.date.toString()} {...event} />
      ))}
    </Stack>
  )
}

export default Events
