import { Box, Group, Button, Table, Text, Badge } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react"
import Link from "src/core/Link"
import ThMenu from "src/core/NavigationTable/ThMenu"
import { useForm } from "@mantine/form"
import { agendasTableMock } from "./agendasTableMock"

const AgendasTable = () => {
  const rows = agendasTableMock.map((agenda) => (
    <Box component="tr" key={agenda.id}>
      <td>{agenda.date.toLocaleString()}</td>
      <td>
        <Badge size="xs" color={agenda.status === "Истекшее" ? "red" : "green"}>
          {agenda.status}
        </Badge>
      </td>
      <td>
        <Link target="_blank" href="/">
          Решение
        </Link>
      </td>
      <td>Снести дом</td>
      <td>
        {agenda.oldProtocolId ? (
          <Link target="_blank" href="/">
            34534
          </Link>
        ) : (
          <Text>-</Text>
        )}
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

  const columns = [
    { label: "Дата", value: "creationDate", type: ["sort"] },
    { label: "Статус", value: "status", type: ["search"] },
  ]

  const form = useForm({
    initialValues: {
      sort: {
        date: null,
      },
      search: {
        status: "",
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
          <th>Решение</th>
          <th>Поручение</th>
          <th>Протокол</th>
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
