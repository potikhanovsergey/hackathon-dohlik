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

  const [assignments] = useQuery(
    getAssignments,
    {
      where: {
        // OR: [
        //   {
        //     status: {
        //       in: ["done", "new"],
        //     },
        //     eventId: {
        //       equals: null,
        //     },
        //   },
        //   {
        //     status: {
        //       in: ["inProgress", "new"],
        //     },
        //     deadline: {
        //       lt: new Date(),
        //     },
        //   },
        // ],
        status: {
          in: ["done", "new"],
        },
        eventId: {
          equals: null,
        },
      },
    },
    { refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false, retry: false }
  )

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
          void invalidateQuery(getAssignments)
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
          disabled={assignments?.length === 0}
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
