import { Box, Group, Table, useMantineTheme, Text, Stack } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import ThMenu from "src/core/NavigationTable/ThMenu"
import { useForm } from "@mantine/form"
import Link from "src/core/Link"
import dayjs from "dayjs"
import { ExtendedProtocol } from "src/pages/protocols"

const ProtocolsTable = ({ protocols }: { protocols: ExtendedProtocol[] }) => {
  const theme = useMantineTheme()
  const router = useRouter()

  const rows = protocols?.map((protocol) => (
    <Box
      component="tr"
      key={protocol.id}
      onClick={() => router.push(Routes.ProtocolPage({ id: protocol.id }))}
      sx={{ cursor: "pointer", "&:hover": { background: theme.colors.gray[0] } }}
    >
      <td>{dayjs(protocol.createdAt).format("D MMMM YYYY")}</td>
      <td>
        <Stack spacing={0}>
          {protocol.solutions?.map((solution) => (
            <Text key={solution.id}>{solution.entity.address}</Text>
          ))}
        </Stack>
      </td>
      <td>{protocol.id}</td>
      <td>
        <Stack spacing={0}>
          {protocol.solutions?.map((solution) => (
            <Link
              key={solution.id}
              target="_blank"
              href={Routes.EntityPage({ id: solution.entityId })}
              w="fit-content"
            >
              № {solution.entityId}
            </Link>
          ))}
        </Stack>
      </td>
      <td>
        <Stack spacing={0}>
          {protocol.solutions?.map((solution) => (
            <Link key={solution.id} target="_blank" href={Routes.ProfilePage()} w="fit-content">
              Группа № {solution.workgroupId}
            </Link>
          ))}
        </Stack>
      </td>
      <td>
        <Stack spacing={0}>
          {protocol.solutions?.map((solution) => (
            <Link
              key={solution.id}
              target="_blank"
              href={Routes.SolutionPage({ id: solution.id })}
              w="fit-content"
            >
              Решение № {solution.id}
            </Link>
          ))}
        </Stack>
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
      label: "Новые поручения",
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
