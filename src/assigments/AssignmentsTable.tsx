import { Badge, Box, Group, Table } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react"
import ThMenu from "src/core/NavigationTable/ThMenu"
import { useForm } from "@mantine/form"
import { ExtendedSolution } from "src/pages/solutions/[id]"
import dayjs from "dayjs"

const AssignmentsTable = ({ solution }: { solution: ExtendedSolution }) => {
  const rows = solution.assignments.map((assignment) => (
    <Box component="tr" key={assignment.id}>
      <td>{dayjs(assignment.createdAt).format("D MMMM YYYY")}</td>
      <td>{assignment.name}</td>
      <td>{dayjs(assignment.deadline).format("D MMMM YYYY")}</td>
      <td>{assignment.responsible}</td>
      <td>
        <Badge
          color={
            assignment.status === "doneAndVerified"
              ? "green"
              : assignment.status === "new"
              ? "blue"
              : assignment.status === "inProgress"
              ? "yellow"
              : "violet"
          }
        >
          {assignment.status === "new"
            ? "Новый"
            : assignment.status === "done"
            ? "Завершен"
            : assignment.status === "inProgress"
            ? "В работе"
            : "Завершено и верефицировано"}
        </Badge>
      </td>
    </Box>
  ))

  const columns = [
    { label: "Дата создания", value: "creationDate", type: ["sort"] },
    { label: "Формулировка", value: "description", type: ["sort", "search"] },
    {
      label: "Срок исполнения",
      value: "deadline",
      type: ["sort"],
    },
    {
      label: "Ответственный",
      value: "personInCharge",
      type: ["sort", "search"],
    },
  ]

  const form = useForm({
    initialValues: {
      search: {
        description: "",
        personInCharge: "",
      },
      sort: {
        creationDate: null,
        deadline: null,
        description: null,
        personInCharge: null,
      },
    },
  })

  return (
    <Table fontSize="xs">
      <thead>
        <tr>
          {columns.map((column) => (
            <ThMenu
              key={column.label}
              sx={{ whiteSpace: "nowrap" }}
              sort={
                column.type.includes("sort")
                  ? { ...form.getInputProps(`sort.${column.value}`) }
                  : undefined
              }
              search={
                column.type.includes("search")
                  ? { ...form.getInputProps(`search.${column.value}`) }
                  : undefined
              }
            >
              <Group noWrap spacing={4} position="apart" sx={{ cursor: "pointer" }}>
                {column.label}
                <IconChevronDown size={16} />
              </Group>
            </ThMenu>
          ))}
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}

export default AssignmentsTable
