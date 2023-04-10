import { Box, Group, HoverCard, Stack, Table, Text, useMantineTheme } from "@mantine/core"
import { IconChevronDown, IconInfoCircle } from "@tabler/icons-react"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import ThMenu from "src/core/NavigationTable/ThMenu"
import { useForm } from "@mantine/form"
import { ExtendedEntity } from "src/pages"

const EntitiesTable = ({ entities }: { entities: ExtendedEntity[] }) => {
  const theme = useMantineTheme()
  const router = useRouter()

  const rows = entities?.map((entity) => (
    <Box
      component="tr"
      key={entity.id}
      onClick={() => router.push(Routes.EntityPage({ id: entity.id }))}
      sx={{ cursor: "pointer", "&:hover": { background: theme.colors.gray[0] } }}
    >
      <td>{`${entity.district} ${entity.region} ${entity.address}`}</td>
      <td>{entity.type}</td>
      <td>{entity.area}</td>
      <td>{entity.state}</td>
      <td>{entity.owner}</td>
      <td>{entity.actualUser}</td>
      <td>
        {entity.attributes ? (
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
                  {entity.attributes?.map((entityAttribute) => (
                    <Group key={entityAttribute.id}>
                      <Text weight="bold" size="xs">
                        {entityAttribute.attribute.name}:{" "}
                      </Text>
                      <Text size="xs">{entityAttribute.value}</Text>
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
    { label: "Полный адрес", value: "address", type: ["search"] },
    { label: "Тип объекта", value: "type", type: ["sort", "search"] },
    {
      label: "Площадь объекта",
      value: "area",
      type: ["sort"],
    },
    {
      label: "Состояние объекта",
      value: "state",
      type: ["search"],
    },
    {
      label: "Собственник",
      value: "owner",
      type: ["sort", "search"],
    },
    {
      label: "Фактический пользователь",
      value: "actualUser",
      type: ["sort", "search"],
    },
  ]

  const form = useForm({
    initialValues: {
      search: {
        address: "",
        type: "",
        state: "",
        owner: "",
        actualUser: "",
      },
      sort: {
        type: null,
        area: null,
        owner: null,
        actualUser: null,
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
          <th>Подробнее</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}

export default EntitiesTable
