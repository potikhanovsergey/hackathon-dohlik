import { Badge, Box, Group, Table, useMantineTheme } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react"
import Link from "src/core/Link"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import ThMenu from "src/core/NavigationTable/ThMenu"
import { useForm } from "@mantine/form"
import getSolutions from "./queries/getSolutions"
import { useQuery } from "@blitzjs/rpc"

const SolutionsTable = () => {
  const theme = useMantineTheme()
  const router = useRouter()

  const [solutions] = useQuery(
    getSolutions,
    {},
    { refetchOnReconnect: false, refetchOnWindowFocus: false }
  )

  const rows = solutions?.map((solution) => (
    <Box
      component="tr"
      key={solution.id}
      onClick={() => router.push(Routes.SolutionPage({ id: solution.id }))}
      sx={{ cursor: "pointer", "&:hover": { background: theme.colors.gray[0] } }}
    >
      <td>{solution.createdAt.toLocaleString()}</td>
      <td>{solution.name}</td>
      <td>{solution.createdAt.toLocaleString()}</td>
      <td>
        <Link target="_blank" href="/">
          Группа
        </Link>
      </td>
      <td>
        <Link target="_blank" href="/">
          Протокол
        </Link>
      </td>
      <td>
        <Badge color="yellow">4/6</Badge>
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
          <th>Группа</th>
          <th>Протокол</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}

export default SolutionsTable
