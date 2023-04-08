import { Indicator, useMantineTheme } from "@mantine/core"
import { DayProps, Calendar as MantineCalendar } from "@mantine/dates"
import dayjs from "dayjs"
import { EventsProps } from "./types"
import { useSelector } from "@legendapp/state/react"
import { datesFilter } from "./store"

interface CalendarProps {
  events: EventsProps
}
const Calendar = ({ events }: CalendarProps) => {
  const selectedDates = useSelector(datesFilter)
  const handleSelect = (date: Date) => {
    const isSelected = selectedDates.some((d) => dayjs(d).isSame(date, "day"))

    if (isSelected) {
      datesFilter.set((prev) => prev.filter((d) => !dayjs(d).isSame(date, "day")))
    } else {
      datesFilter.set((prev) => [...prev, date])
    }
  }

  return (
    <MantineCalendar
      getDayProps={(date) => {
        const dayProps: Partial<DayProps> = {
          selected: selectedDates.some((d) => dayjs(d).isSame(date, "day")),
          onClick: () => handleSelect(date),
        }

        if (dayjs().isSame(date, "day")) {
          return {
            ...dayProps,
            sx: (theme) => ({
              backgroundColor: theme.colors.blue[0],
            }),
          }
        }

        return dayProps
      }}
      renderDay={(date) => {
        const day = date.getDate()

        if (events.find((e) => dayjs(e.date).isSame(date, "day"))) {
          return (
            <Indicator size={6} color="green" offset={-2}>
              <div>{day}</div>
            </Indicator>
          )
        }

        return <div>{day}</div>
      }}
    />
  )
}

export default Calendar
