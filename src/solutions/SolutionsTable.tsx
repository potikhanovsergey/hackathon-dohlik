import { Box, Group, HoverCard, Stack, Table, Text, useMantineTheme } from "@mantine/core"
import { IconChevronDown, IconInfoCircle } from "@tabler/icons-react"
import { solutionsTableMock } from "./solutionsTableMock"
import Link from "src/core/Link"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import ThMenu from "src/core/NavigationTable/ThMenu"

const SolutionsTable = () => {
  const theme = useMantineTheme()
  const router = useRouter()

  const rows = solutionsTableMock.map((solution) => (
    <Box
      component="tr"
      key={solution.id}
      onClick={() => router.push(Routes.SolutionPage({ id: solution.id }))}
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
    { label: "Дата создания решения", type: ["sort"] },
    { label: "Формулировка", type: ["sort", "search"] },
    {
      label: "Срок исполнения",
      type: ["sort"],
    },
    {
      label: "Ответственный",
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
          <th>Протокол</th>
          <th>Подробнее</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}

export default SolutionsTable
