import { Button, Select, Stack, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { closeAllModals } from "@mantine/modals"

const EntityForm = () => {
  const form = useForm({
    initialValues: {
      address: "",
      type: "",
      square: "",
      state: "",
      owner: "",
      realUser: "",
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack spacing={0}>
        <TextInput
          label="Адрес"
          placeholder="Малая Семеновская..."
          {...form.getInputProps("address")}
        />
        <Select
          label="Тип объекта"
          placeholder="Дом многоэтажный"
          data={[
            { labele: "Дом многожтажный", value: "1" },
            { labele: "Обжещитие", value: "1" },
          ]}
          {...form.getInputProps("type")}
        />
        <TextInput label="Площадь" placeholder="400" {...form.getInputProps("square")} />
        <Select
          label="Состояние"
          placeholder="Хорошее"
          data={[
            { label: "Хорошее", value: "1" },
            { label: "Плохое", value: "2" },
            { label: "Критическое", value: "3" },
          ]}
          {...form.getInputProps("state")}
        />
        <TextInput label="Собственник" placeholder="Аркадий..." {...form.getInputProps("owner")} />
        <TextInput
          label="Фактический пользователь"
          placeholder="Мосполитех.."
          {...form.getInputProps("realUser")}
          mb="md"
        />
        <Button type="submit" onClick={() => closeAllModals()}>
          Готово
        </Button>
      </Stack>
    </form>
  )
}

export default EntityForm
