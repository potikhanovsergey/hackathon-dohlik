import { invalidateQuery, useMutation, useQuery } from "@blitzjs/rpc"
import { Button, MultiSelect, Select, Stack, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { closeAllModals } from "@mantine/modals"
import { Assignment } from "@prisma/client"
import createEvent from "./mutations/createEvent"
import getEvents from "./queries/getEvents"
import getAssignments from "src/assigments/queries/getAssignments"
import { notifications } from "@mantine/notifications"
import dayjs from "dayjs"
import { ExtendedEvent } from "src/pages/calendar"
import updateEvent from "./mutations/updateEvent"

const EventForm = ({ event }: { event?: ExtendedEvent }) => {
  const form = useForm({
    initialValues: {
      name: event?.name || "",
      date: event?.date || new Date(),
      meetingUrl: event?.meetingUrl || "",
      assignments: event ? event.assignments.map((a) => a.id + "") : [],
    },
  })

  const [assignments] = useQuery(
    getAssignments,
    {
      where: {
        status: {
          in: ["done", "new"],
        },
        ...(event
          ? {
              OR: [
                {
                  eventId: event.id,
                },
                {
                  eventId: null,
                },
              ],
            }
          : { eventId: null }),
      },
    },
    { refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false, retry: false }
  )

  const [createEventMutation] = useMutation(createEvent)
  const [updateEventMutation] = useMutation(updateEvent)

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        try {
          const response = event
            ? await updateEventMutation({
                where: { id: event?.id },
                data: {
                  date: values.date,
                  meetingUrl: values.meetingUrl,
                  name: values.name,
                  assignments: {
                    disconnect: event.assignments.map((a) => ({ id: a.id })),
                    connect: values.assignments.map((assignmentId) => ({ id: +assignmentId })),
                  },
                },
              })
            : await createEventMutation({
                data: {
                  date: values.date,
                  meetingUrl: values.meetingUrl,
                  name: values.name,
                  assignments: {
                    connect: values.assignments.map((assignmentId) => ({ id: +assignmentId })),
                  },
                },
              })

          notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            title: `Событие ${event ? "перенесено" : "запланировано"}!`,
            message: `${response.name} на дату ${dayjs(response.date).format("D MMMM")}`,
            color: "green",
          })

          void invalidateQuery(getEvents)
          void invalidateQuery(getAssignments)
        } catch (e) {
          notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            title: `Ошибка при ${event ? "переносе" : "созданиии"}!`,
            message: e?.toString(),
            color: "red",
          })
        }
      })}
    >
      <Stack>
        <TextInput
          label="Название события"
          placeholder="Проверить дом..."
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Ссылка на встречу"
          required
          placeholder="https://sldkfdfj..."
          {...form.getInputProps("meetingUrl")}
        />
        <DatePickerInput
          label="Дата события"
          required
          {...form.getInputProps("date")}
          popoverProps={{ withinPortal: true }}
        />
        <MultiSelect
          label="Повестки"
          required
          disabled={!event && assignments?.length === 0}
          placeholder="Снос дома"
          {...form.getInputProps("assignments")}
          data={
            assignments?.map((assignment: Assignment) => ({
              label: assignment.name || "Повестка без имени",
              value: assignment.id.toString(),
            })) || []
          }
          withinPortal
        />
        <Button type="submit" onClick={() => closeAllModals()}>
          Готово
        </Button>
      </Stack>
    </form>
  )
}

export default EventForm
