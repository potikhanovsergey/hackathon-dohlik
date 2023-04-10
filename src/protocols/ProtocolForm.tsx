import { invalidateQuery, useMutation, useQuery } from "@blitzjs/rpc"
import { Stack, TextInput, Select, Button, MultiSelect } from "@mantine/core"
import { useForm } from "@mantine/form"
import { closeAllModals } from "@mantine/modals"
import getSolutions from "src/solutions/queries/getSolutions"
import createProtocol from "./mutations/createProtocol"
import getProtocols from "./queries/getProtocols"

const ProtocolForm = () => {
  const form = useForm({
    initialValues: {
      solutionsIds: [],
    },
  })

  const [solutions] = useQuery(getSolutions, {})

  const [createProtocolMutation] = useMutation(createProtocol)

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        await createProtocolMutation({
          data: { solutions: { connect: values.solutionsIds.map((id) => ({ id: +id })) } },
        })

        await invalidateQuery(getProtocols)
        closeAllModals()
      })}
    >
      <Stack>
        <MultiSelect
          label="Решения"
          placeholder="Включите решения в протокол"
          withinPortal
          {...form.getInputProps("solutionsIds")}
          data={
            solutions
              ? solutions.map((solution) => ({ label: solution.name, value: solution.id + "" }))
              : []
          }
          required
        />
        <Button type="submit">Создать протокол</Button>
      </Stack>
    </form>
  )
}

export default ProtocolForm
