import { Button, Select, Stack, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { closeAllModals } from "@mantine/modals"

const EditEventForm = () => {
  const form = useForm({
    initialValues: {
      name: "",
      date: null,
      entity: "",
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack>
        <TextInput
          label="Название события"
          placeholder="Проверить дом..."
          {...form.getInputProps("name")}
        />
        <DatePickerInput
          label="Дата события"
          {...form.getInputProps("date")}
          popoverProps={{ withinPortal: true }}
        />
        <Select
          label="Объект"
          placeholder="Дом..."
          data={[
            { label: "Малая Семеновская, Измайлово, 37", value: "8283489" },
            { label: "Большая Семеновская, Измайлово, 19", value: "423428" },
          ]}
        />
        <Button type="submit" onClick={() => closeAllModals()}>
          Готово
        </Button>
      </Stack>
    </form>
  )
}

export default EditEventForm
