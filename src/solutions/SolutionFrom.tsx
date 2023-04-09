import { invalidateQuery, useMutation, useQuery } from "@blitzjs/rpc"
import { Stack, TextInput, Select, Button } from "@mantine/core"
import { useForm } from "@mantine/form"
import { closeAllModals } from "@mantine/modals"
import getEntities from "src/entities/queries/getEntities"
import getWorkgroups from "src/workgroups/queries/getWorkgroups"
import createSolution from "./mutations/createSolution"
import getSolutions from "./queries/getSolutions"

const SolutionForm = () => {
  const form = useForm({
    initialValues: {
      entityId: 0,
      name: "",
      workgroupId: 0,
      protocolId: null,
    },
  })

  const [entities] = useQuery(
    getEntities,
    {
      include: {
        attributes: true,
      },
    },
    { refetchOnReconnect: false, refetchOnWindowFocus: false }
  )

  const [workgroups] = useQuery(
    getWorkgroups,
    {},
    { refetchOnReconnect: false, refetchOnWindowFocus: false }
  )

  const [createSolutionMutation] = useMutation(createSolution)

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        const response = await createSolutionMutation({ data: values })
        void invalidateQuery(getSolutions)
      })}
    >
      <Stack>
        <TextInput
          label="Формулировка"
          placeholder="Нужно сделать..."
          {...form.getInputProps("name")}
          required
        />
        <Select
          label="Объект"
          placeholder="Малая Семеновская.."
          {...form.getInputProps("entityId")}
          data={
            entities
              ? entities.length > 0
                ? entities.map((entity) => ({
                    label: entity.address || "Адрес",
                    value: entity.id.toString(),
                  }))
                : []
              : []
          }
          required
          withinPortal
        />
        <Select
          label="Рабочая группа"
          placeholder="93823"
          {...form.getInputProps("workgroupId")}
          data={
            workgroups
              ? workgroups.length > 0
                ? workgroups.map((workgroup) => ({
                    label: workgroup.name,
                    value: workgroup.id.toString(),
                  }))
                : []
              : []
          }
          required
          withinPortal
        />
        <Button type="submit" onClick={() => closeAllModals()}>
          Создать протокол
        </Button>
      </Stack>
    </form>
  )
}

export default SolutionForm
