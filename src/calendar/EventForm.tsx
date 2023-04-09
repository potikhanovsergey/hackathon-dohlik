import { invalidateQuery, useMutation, useQuery } from "@blitzjs/rpc"
import { Button, MultiSelect, Select, Stack, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { closeAllModals } from "@mantine/modals"
import { Agenda, Assignment } from "@prisma/client"
import getAgendas from "src/agendas/queries/getAgendas"
import createEvent from "./mutations/createEvent"
import getEvents from "./queries/getEvents"

export interface ExtendedAgenda extends Agenda {
  assignment: Assignment
}

const EventForm = () => {
  const form = useForm({
    initialValues: {
      name: "",
      date: new Date(),
      meetingUrl: "",
      agendas: [],
    },
  })

  const [agendas] = useQuery(
    getAgendas,
    { include: { assignment: true } },
    { refetchOnReconnect: false, refetchOnWindowFocus: false }
  )

  console.log(agendas)
  const [createEventMutation] = useMutation(createEvent)

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        const response = await createEventMutation({ data: values })
        void invalidateQuery(getEvents)
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
          {...form.getInputProps("agendas")}
          data={
            agendas
              ? agendas.length > 0
                ? agendas.map((agenda: ExtendedAgenda) => ({
                    label: agenda.assignment.name || "Повестка без имени",
                    value: agenda.id.toString(),
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
