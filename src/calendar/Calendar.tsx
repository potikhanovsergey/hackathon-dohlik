import { Anchor, Button, Chip, Group, Indicator, Stack, useMantineTheme } from "@mantine/core"
import { DayProps, Calendar as MantineCalendar } from "@mantine/dates"
import dayjs from "dayjs"
import { EventsProps } from "./types"
import { useObservable, useObserve, useSelector } from "@legendapp/state/react"
import { datesFilter } from "./store"
import { useEffect, useMemo } from "react"
import Link from "src/core/Link"

interface CalendarProps {
  events: EventsProps
}

const startOfWeek = dayjs().startOf("week")
const thisWeekDates: Date[] = []
for (let i = 0; i < 7; i++) {
  thisWeekDates.push(startOfWeek.add(i, "day").toDate())
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

  const activeChips = useObservable([] as string[])
  const chipsValue = useSelector(activeChips)

  useEffect(() => {
    for (let i = 0; i < chipsValue.length; i++) {
      if (chipsValue[i] === "day") {
        datesFilter.set([new Date()])
      }
      if (chipsValue[i] === "week") {
        datesFilter.set(thisWeekDates)
      }
    }
  }, [chipsValue])

  const handleDayChipToggle = (checked: boolean) => {
    if (checked) {
      datesFilter.set((prev) => [...prev, new Date()])
    } else {
      datesFilter.set((prev) => prev.filter((date) => !dayjs().isSame(date, "day")))
    }
  }

  const handleWeekChipToggle = (checked: boolean) => {
    if (checked) {
      datesFilter.set((prev) => [...prev, ...thisWeekDates])
    } else {
      datesFilter.set((prev) =>
        prev.filter((date) => !thisWeekDates.some((d) => dayjs(d).isSame(date, "day")))
      )
    }
  }

  const dayChipChecked = selectedDates.some((d) => dayjs().isSame(d, "day"))

  const weekChipChecked = useMemo(() => {
    for (let i = 0; i < thisWeekDates.length; i++) {
      if (!selectedDates.some((d) => dayjs(thisWeekDates[i]).isSame(d, "day"))) return false
    }
    return true
  }, [selectedDates])

  const resetFilters = () => {
    datesFilter.set([])
  }

  return (
    <Stack>
      <Group spacing="xs">
        <Chip value="day" onChange={handleDayChipToggle} checked={dayChipChecked}>
          Сегодня
        </Chip>
        <Chip onChange={handleWeekChipToggle} checked={weekChipChecked} value="week">
          Эта неделя
        </Chip>
      </Group>

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
      {selectedDates.length > 0 && (
        <Button variant="outline" size="xs" onClick={resetFilters}>
          Сбросить фильтры
        </Button>
      )}
    </Stack>
  )
}

export default Calendar
