import { Box, Group, HoverCard, Button, Table, Text, useMantineTheme } from "@mantine/core"
import { IconChevronDown, IconInfoCircle } from "@tabler/icons-react"
import Link from "src/core/Link"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import ThMenu from "src/core/NavigationTable/ThMenu"
import { useForm } from "@mantine/form"
import { agendasTableMock } from "./AgendasTableMock"

const AgendasTable = () => {
  const theme = useMantineTheme()
  const router = useRouter()

  const rows = agendasTableMock.map((agenda) => (
    <Box component="tr" key={agenda.id}>
      <td>{agenda.date.toLocaleString()}</td>
      <td>
        <Link target="_blank" href="/">
          Решение/Поручение
        </Link>
      </td>
      <td>
        <Link target="_blank" href="/">
          34534
        </Link>
      </td>
      <td>
        <Link target="_blank" href="/">
          Объект
        </Link>
      </td>
      <td>
        <Link target="_blank" href="/">
          Группа
        </Link>
      </td>
      <td>
        <Button compact>Запланировать встречу</Button>
      </td>
    </Box>
  ))

  const columns = [{ label: "Дата", value: "creationDate", type: ["sort"] }]

  const form = useForm({
    initialValues: {
      sort: {
        date: null,
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
          <th>Истекшиее решение/поручение</th>
          <th>Протокол истекшего решения/поручения</th>
          <th>Объект</th>
          <th>Рабочая группа</th>
          <th>Планирование встречи рабочей группы</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}

export default AgendasTable
