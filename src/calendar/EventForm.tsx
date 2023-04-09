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

const EventForm = () => {
  const form = useForm({
    initialValues: {
      name: "",
      date: new Date(),
      meetingUrl: "",
      assignments: [],
    },
  })

  const [assignments] = useQuery(getAssignments, {
    where: {
      status: {
        in: ["done", "new"],
      },
      eventId: {
        equals: null,
      },
    },
  })

  const [createEventMutation] = useMutation(createEvent)

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        try {
          const response = await createEventMutation({
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
            title: "Событие запланировано!",
            message: `${response.name} на дату ${dayjs(response.date).format("D MMMM")}`,
            color: "green",
          })

          void invalidateQuery(getEvents)
        } catch (e) {
          notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            title: "Ошибка при создании события",
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
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Ссылка на встречу"
          placeholder="https://sldkfdfj..."
          {...form.getInputProps("meetingUrl")}
        />
        <DatePickerInput
          label="Дата события"
          {...form.getInputProps("date")}
          popoverProps={{ withinPortal: true }}
        />
        <MultiSelect
          label="Повестки"
          placeholder="Снос дома"
          {...form.getInputProps("assignments")}
          data={
            assignments
              ? assignments.length > 0
                ? assignments.map((assignment: Assignment) => ({
                    label: assignment.name || "Повестка без имени",
                    value: assignment.id.toString(),
                  }))
                : []
              : []
          }
          required
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
