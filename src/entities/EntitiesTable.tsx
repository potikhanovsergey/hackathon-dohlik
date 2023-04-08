import { Box, Group, HoverCard, Stack, Table, Text, useMantineTheme } from "@mantine/core"
import { IconChevronDown, IconInfoCircle } from "@tabler/icons-react"
import { entitiesTableMock } from "./entitiesTableMock"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import ThMenu from "src/core/NavigationTable/ThMenu"

const EntitiesTable = () => {
  const theme = useMantineTheme()
  const router = useRouter()

  const rows = entitiesTableMock.map((entity) => (
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
        {entity.additionalInfo ? (
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
                  {Object.keys(entity.additionalInfo).map((key) => (
                    <Group key={key}>
                      <Text weight="bold" size="xs">
                        {entity.additionalInfo![key].label}:{" "}
                      </Text>
                      <Text size="xs">{entity.additionalInfo![key].value}</Text>
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

  const titles = [
    { label: "Полный адрес", type: ["search"] },
    { label: "Тип объекта", type: ["sort", "search"] },
    {
      label: "Площадь объекта",
      type: ["sort"],
    },
    {
      label: "Состояние объекта",
      type: ["sort", "search"],
    },
    {
      label: "Собственник",
      type: ["sort", "search"],
    },
    {
      label: "Фактический пользователь",
      type: ["sort", "search"],
    },
  ]

  return (
    <Table fontSize="xs">
      <thead>
        <tr>
          {titles.map((title) => (
            <ThMenu
              key={title.label}
              sx={{ whiteSpace: "nowrap" }}
              sort={
                title.type.includes("sort") ? { value: "asc", onChange: (value) => 1 } : undefined
              }
              search={
                title.type.includes("search") ? { value: "", onChange: (value) => 1 } : undefined
              }
            >
              <Group noWrap spacing={4} position="apart" sx={{ cursor: "pointer" }}>
                {title.label}
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
