import {
  Box,
  Group,
  HoverCard,
  Menu,
  Stack,
  Table,
  TextInput,
  Text,
  useMantineTheme,
  BoxProps,
  packSx,
} from "@mantine/core"
import {
  IconChevronDown,
  IconInfoCircle,
  IconSearch,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react"
import { entitiesTableMock } from "./entitiesTableMock"
import Link from "src/core/Link"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"

const FunctionalTh = ({ children, ...props }: BoxProps) => {
  const theme = useMantineTheme()
  return (
    <Box component="th" {...props} p="0 !important">
      <Menu>
        <Menu.Target>
          <Box
            px="xs"
            py={4}
            sx={{
              cursor: "pointer",
              "&:hover": { background: theme.colors.gray[0] },
              borderRadius: theme.radius.sm,
            }}
          >
            {children}
          </Box>
        </Menu.Target>
      </Menu>
    </Box>
  )
}

const EntitiesTable = () => {
  const theme = useMantineTheme()
  const router = useRouter()

  const rows = entitiesTableMock.map((solution) => (
    <Box
      component="tr"
      key={solution.id}
      onClick={() => router.push(Routes.SolutionPage({ id: 0 }))}
      sx={{ cursor: "pointer", "&:hover": { background: theme.colors.gray[0] } }}
    >
      <td>{solution.creationDate.toLocaleString()}</td>
      <td>{solution.description}</td>
      <td>{solution.deadline.toLocaleString()}</td>
      <td>{solution.inCharge}</td>
      <td>
        <Link target="_blank" href="/">
          Протокол
        </Link>
      </td>
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

  const titles = [
    { label: "Дата создания решения", type: "sort" },
    { label: "Формулировка", type: "searchSort" },
    {
      label: "Срок исполнения",
      type: "sort",
    },
    {
      label: "Ответственный",
      type: "searchSort",
    },
  ]

  return (
    <Table fontSize="xs">
      <thead>
        <tr>
          {titles.map((title) => (
            <FunctionalTh key={title.label} sx={{ whiteSpace: "nowrap" }}>
              <Menu closeOnItemClick={false}>
                <Menu.Target>
                  <Group noWrap spacing={4} position="apart" sx={{ cursor: "pointer" }}>
                    {title.label}
                    <IconChevronDown size={16} />
                  </Group>
                </Menu.Target>

                <Menu.Dropdown>
                  {(title.type === "sort" || title.type === "searchSort") && (
                    <>
                      <Menu.Label>Сортировка</Menu.Label>
                      <Menu.Item icon={<IconSortAscending size={16} />}>
                        Сортировка по возрастанию
                      </Menu.Item>
                      <Menu.Item icon={<IconSortDescending size={16} />}>
                        Сортировка по убыванию
                      </Menu.Item>
                    </>
                  )}

                  {title.type === "searchSort" && (
                    <>
                      <Menu.Item
                        sx={(theme) => ({ "&[data-hovered]": { background: theme.white } })}
                      >
                        <TextInput
                          size="xs"
                          label={<Menu.Label pl={0}>Поиск</Menu.Label>}
                          placeholder="Поиск..."
                          icon={<IconSearch size={16} />}
                        />
                      </Menu.Item>
                    </>
                  )}
                </Menu.Dropdown>
              </Menu>
            </FunctionalTh>
          ))}
          <th>Протокол</th>
          <th>Подробнее</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}

export default EntitiesTable
