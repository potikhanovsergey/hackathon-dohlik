import { Box, Group, Table, useMantineTheme } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import ThMenu from "src/core/NavigationTable/ThMenu"
import { useForm } from "@mantine/form"
import { protocolsTableMock } from "./protocolsTableMock"
import Link from "src/core/Link"

const ProtocolsTable = () => {
  const theme = useMantineTheme()
  const router = useRouter()

  const rows = protocolsTableMock.map((protocol) => (
    <Box
      component="tr"
      key={protocol.id}
      onClick={() => router.push(Routes.ProtocolPage({ id: protocol.id }))}
      sx={{ cursor: "pointer", "&:hover": { background: theme.colors.gray[0] } }}
    >
      <td>{protocol.creationDate.toLocaleString()}</td>
      <td>{protocol.address}</td>
      <td>{protocol.protocolNumber}</td>
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
        <Link target="_blank" href="/">
          Новое решение
        </Link>
      </td>
    </Box>
  ))

  const columns = [
    { label: "Дата создания", value: "creationDate", type: ["sort"] },
    {
      label: "Адрес объекта",
      value: "address",
      type: ["sort", "search"],
    },
    {
      label: "Номер протокола",
      value: "protocolNumber",
      type: ["sort", "search"],
    },
    {
      label: "Объект",
      value: "entityId",
      type: ["sort"],
    },
    {
      label: "Рабочая группа",
      value: "groupId",
      type: ["sort"],
    },
    {
      label: "Новое поручение",
      value: "newSolutionId",
      type: ["sort"],
    },
  ]

  const form = useForm({
    initialValues: {
      search: {
        address: "",
        protocolNumber: "",
      },
      sort: {
        creationDate: null,
        address: null,
        protocolNumber: null,
        entityId: null,
        groupId: null,
        newSolutionId: null,
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
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}

export default ProtocolsTable
