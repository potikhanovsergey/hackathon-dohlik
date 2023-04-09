import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Button, NumberInput, Select, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { closeAllModals } from "@mantine/modals"
import createEntity from "./mutations/createEntity"
import getEntities from "./queries/getEntities"

const EntityForm = () => {
  const form = useForm({
    initialValues: {
      district: "",
      region: "",
      address: "",
      type: "",
      area: "",
      state: "",
      owner: "",
      actualUser: "",
    },
  })

  const [createEntityMutation] = useMutation(createEntity)

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        const response = await createEntityMutation({ data: values })
        void invalidateQuery(getEntities)
      })}
    >
      <Stack spacing={0}>
        <TextInput
          label="Округ"
          placeholder="Восточный административный"
          {...form.getInputProps("district")}
        />
        <TextInput label="Район" placeholder="Соколиная гора" {...form.getInputProps("region")} />
        <TextInput
          label="Адрес"
          placeholder="Малая Семеновская, д12 "
          {...form.getInputProps("address")}
        />
        <Select
          label="Тип объекта"
          placeholder="Дом многоэтажный"
          data={[
            { value: "Дом многоэтажный", label: "Дом многоэтажный" },
            { value: "Обжещитие", label: "Обжещитие" },
            { value: "Университет", label: "Университет" },
            { value: "Торговый центр", label: "Торговый центр" },
            { value: "Общежитие", label: "Общежитие" },
            { value: "Малоэтажная постройка", label: "Малоэтажная постройка" },
            { value: "Иное", label: "Иное" },
          ]}
          {...form.getInputProps("type")}
        />
        <NumberInput label="Площадь" placeholder="400" {...form.getInputProps("area")} />
        <Select
          label="Состояние"
          placeholder="Хорошее"
          data={[
            { value: "В использовании", label: "В использовании" },
            { value: "Аварийное", label: "Аварийное" },
            { value: "Закрыто", label: "Закрыто" },
            { value: "Временно закрыто", label: "Временно закрыто" },
            { value: "Иное", label: "Иное" },
          ]}
          {...form.getInputProps("state")}
        />
        <TextInput label="Собственник" placeholder="Аркадий..." {...form.getInputProps("owner")} />
        <TextInput
          label="Фактический пользователь"
          placeholder="Мосполитех.."
          {...form.getInputProps("actualUser")}
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
