import { Stack } from "@mantine/core"
import Event from "./Event"
import { ExtendedEvent } from "src/pages/calendar"

const Events = ({ events }: { events: ExtendedEvent[] }) => {
  return (
    <Stack>
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </Stack>
  )
}

export default Events
