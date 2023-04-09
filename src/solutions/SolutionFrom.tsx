import { Stack, TextInput, Select, Button } from "@mantine/core"
import { useForm } from "@mantine/form"
import { closeAllModals } from "@mantine/modals"

const SolutionForm = () => {
  const form = useForm({
    initialValues: {
      entityId: "",
      description: "",
      deadline: "",
      personInCharge: "",
      protocolId: "",
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack>
        <TextInput
          label="Номер протокола"
          placeholder="3470"
          {...form.getInputProps("protocolNumber")}
          required
        />
        <Select
          label="Объект"
          placeholder="Малая Семеновская.."
          {...form.getInputProps("entityId")}
          data={[
            { label: "Малая Семеновская", value: "1" },
            { label: "Большая Семеновская", value: "2" },
            { label: "Крошка Семеновская", value: "3" },
          ]}
          required
        />
        <Select
          label="Рабочая группа"
          placeholder="93823"
          {...form.getInputProps("groupId")}
          data={[
            { label: "2452", value: "1" },
            { label: "2325", value: "2" },
            { label: "90980", value: "3" },
          ]}
          required
        />
        <Button type="submit" onClick={() => closeAllModals()}>
          Создать протокол
        </Button>
      </Stack>
    </form>
  )
}

export default SolutionForm
