import { invalidateQuery, useMutation, useQuery } from "@blitzjs/rpc"
import { Stack, TextInput, Select, Button, Text, ActionIcon, Group } from "@mantine/core"
import { DatePicker, DatePickerInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { closeAllModals } from "@mantine/modals"
import { Assignment } from "@prisma/client"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import getEntities from "src/entities/queries/getEntities"
import getWorkgroups from "src/workgroups/queries/getWorkgroups"
import createSolution from "./mutations/createSolution"
import getSolutions from "./queries/getSolutions"

export const statusesRussian = [
  {
    value: "new",
    label: "Новое",
  },
  {
    value: "inProgress",
    label: "В работе",
  },
  { value: "done", label: "Завершено" },
  { value: "doneAndVerified", label: "Звершено и верифицировано" },
]

type AssignmentValues = Omit<
  Assignment,
  "id" | "createdAt" | "updatedAt" | "solutionId" | "eventId"
>

const defaultAssignment: AssignmentValues = {
  deadline: new Date(),
  name: "",
  responsible: "",
  status: "inProgress",
}

interface SolutionFormProps {
  entityId: number
  name: string
  workgroupId: number
  protocolId: number | null
  assignments: AssignmentValues[]
}

const SolutionForm = () => {
  const form = useForm<SolutionFormProps>({
    initialValues: {
      entityId: 0,
      name: "",
      workgroupId: 0,
      protocolId: null,
      assignments: [],
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
        // const response = await createSolutionMutation({ data: values })
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
            entities?.map((entity) => ({
              label: entity.address || "Адрес",
              value: entity.id.toString(),
            })) || []
          }
          required
          withinPortal
        />
        <Select
          label="Рабочая группа"
          placeholder="93823"
          {...form.getInputProps("workgroupId")}
          data={
            workgroups?.map((workgroup) => ({
              label: workgroup.name,
              value: workgroup.id.toString(),
            })) || []
          }
          required
          withinPortal
        />
        <TextInput
          label="Номер протокола"
          placeholder="438975"
          disabled
          {...form.getInputProps("protocolId")}
        />
        <Group position="apart" my="md">
          <Text size="lg" weight="bold">
            Поручения
          </Text>
          <ActionIcon
            onClick={() =>
              form.setFieldValue("assignments", [
                { ...defaultAssignment },
                ...form.values.assignments,
              ])
            }
          >
            <IconPlus size={16} />
          </ActionIcon>
        </Group>
        <Stack>
          {form.values.assignments.map((assignment, i) => (
            <Stack key={i} mb="sm">
              <Group position="apart">
                <Text>Поручение</Text>
                <ActionIcon
                  color="red"
                  onClick={() => {
                    const newAssignments = [...form.values.assignments]
                    newAssignments.splice(i, 1)
                    form.setFieldValue("assignments", newAssignments)
                  }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
              <DatePickerInput
                label="Срок исполнения"
                placeholder="18.22.3214"
                popoverProps={{ withinPortal: true }}
                {...form.getInputProps(`assignments.${i}.deadline`)}
              />
              <TextInput
                label="Формулировка"
                placeholder="Нужно сделать..."
                {...form.getInputProps(`assignments.${i}.name`)}
              />
              <TextInput
                label="Ответственный"
                placeholder="Михаил..."
                {...form.getInputProps(`assignments.${i}.responsible`)}
              />
              <Select
                label="Статус"
                placeholder="Новое"
                {...form.getInputProps(`assignments.${i}.status`)}
                data={statusesRussian}
                disabled
                value={"new"}
              />
            </Stack>
          ))}
        </Stack>

        <Button type="submit" onClick={() => closeAllModals()}>
          Создать решение
        </Button>
      </Stack>
    </form>
  )
}

export default SolutionForm
