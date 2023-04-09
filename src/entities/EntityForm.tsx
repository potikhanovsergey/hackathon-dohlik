import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Button, NumberInput, Select, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { closeAllModals } from "@mantine/modals"
import createEntity from "./mutations/createEntity"
import getEntities from "./queries/getEntities"
import { notifications } from "@mantine/notifications"
import { Entity } from "@prisma/client"
import updateEntity from "./mutations/updateEntity"
import { useRouter } from "next/router"

const EntityForm = ({ entity }: { entity?: Entity }) => {
  const router = useRouter()

  const form = useForm({
    initialValues: {
      district: entity?.district || "",
      region: entity?.region || "",
      address: entity?.address || "",
      type: entity?.type || "",
      area: entity?.area || "",
      state: entity?.state || "",
      owner: entity?.owner || "",
      actualUser: entity?.actualUser || "",
    },
  })

  const [createEntityMutation] = useMutation(createEntity)
  const [updateEntityMutation] = useMutation(updateEntity)

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        try {
          const response = entity
            ? await updateEntityMutation({
                where: { id: entity?.id },
                data: { ...values, area: !isNaN(+values.area) ? +values.area : null },
              })
            : await createEntityMutation({
                data: { ...values, area: !isNaN(+values.area) ? +values.area : null },
              })

          notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            message: entity ? "Объект успешно изменен" : "Объект успешно добавлен в базу данных",
            color: "green",
          })

          void router.replace(router.asPath)
        } catch (e) {
          notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            title: `Ошибка при ${entity ? "изменении" : "добавлении"}!`,
            message: e?.toString(),
            color: "red",
          })
        }
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
