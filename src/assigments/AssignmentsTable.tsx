import { Box, Group, HoverCard, Stack, Table, Text, useMantineTheme } from "@mantine/core"
import { IconChevronDown, IconInfoCircle } from "@tabler/icons-react"
import { useRouter } from "next/router"
import ThMenu from "src/core/NavigationTable/ThMenu"
import { useForm } from "@mantine/form"
import { assignmentsTableMock } from "./assignmentsTableMock"

const AssignmentsTable = () => {
  const theme = useMantineTheme()

  const rows = assignmentsTableMock.map((solution) => (
    <Box component="tr" key={solution.id}>
      <td>{solution.creationDate.toLocaleString()}</td>
      <td>{solution.description}</td>
      <td>{solution.deadline.toLocaleString()}</td>
      <td>{solution.inCharge}</td>
      <td>{solution.status}</td>
      <td>
        {solution.additionalInfo ? (
          <HoverCard position="left" withinPortal withArrow>
            <HoverCard.Target>
              <IconInfoCircle size={20} stroke={1.5} color={theme.colors.gray[5]} />
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <>
                <Text weight="bold" mb="xs" size="sm">
                  Дополнительные поля
                </Text>
                <Stack spacing={4}>
                  {Object.keys(solution.additionalInfo).map((key) => (
                    <Group key={key}>
                      <Text weight="bold" size="xs">
                        {solution.additionalInfo![key].label}:{" "}
                      </Text>
                      <Text size="xs">{solution.additionalInfo![key].value}</Text>
                    </Group>
                  ))}
                </Stack>
              </>
            </HoverCard.Dropdown>
          </HoverCard>
        ) : (
          <Text>Нет</Text>
        )}
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
          <th>Подробнее</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}

export default AssignmentsTable
