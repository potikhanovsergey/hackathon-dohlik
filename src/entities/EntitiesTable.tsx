import { Box, Group, Menu, Table, TextInput } from "@mantine/core"
import {
  IconChevronDown,
  IconSearch,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react"
import { SolutionsMock } from "./SolutionsMock"

const EntitiesTable = () => {
  const rows = SolutionsMock.map((solution) => (
    <tr key={solution.description}>
      <td>{solution.creationDate.toLocaleString()}</td>
      <td>{solution.description}</td>
      <td>{solution.deadline.toLocaleString()}</td>
      <td>{solution.inCharge}</td>
      <td>{solution.protocol}</td>
      <td>Подробнее</td>
    </tr>
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
    <Table>
      <thead>
        <tr>
          {titles.map((title) => (
            <Box component="th" key={title.label} sx={{ whiteSpace: "nowrap" }}>
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
                      <Menu.Label>Поиск</Menu.Label>
                      <Menu.Item>
                        <TextInput placeholder="Поиск..." icon={<IconSearch size={16} />} />
                      </Menu.Item>
                    </>
                  )}
                </Menu.Dropdown>
              </Menu>
            </Box>
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
