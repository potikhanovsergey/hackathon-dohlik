import { Autocomplete, Box, BoxProps, Menu, MenuItemProps, useMantineTheme } from "@mantine/core"
import { IconSearch, IconSortAscending, IconSortDescending } from "@tabler/icons-react"
import SortItem from "./SortItem"

interface ThMenuProps extends BoxProps {
  sort?: {
    value: "asc" | "desc" | null
    onChange: (value: "asc" | "desc" | null) => void
  }
  search?: {
    value: string
    onChange: (value: string) => void
  }
}

const ThMenu = ({ children, sort, search, ...props }: ThMenuProps) => {
  const theme = useMantineTheme()
  const handleSortAscending = () => sort?.onChange?.(sort.value == "asc" ? null : "asc")
  const handleSortDescending = () => sort?.onChange?.(sort.value === "desc" ? null : "desc")
  return (
    <Box component="th" {...props} p="0 !important">
      <Menu closeOnItemClick={false}>
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
        <Menu.Dropdown>
          {sort && (
            <>
              <Menu.Label>Сортировка</Menu.Label>
              <SortItem
                active={sort.value === "asc"}
                onClick={handleSortAscending}
                icon={<IconSortAscending size={16} />}
              >
                Сортировка по возрастанию
              </SortItem>
              <SortItem
                active={sort.value === "desc"}
                onClick={handleSortDescending}
                icon={<IconSortDescending size={16} />}
              >
                Сортировка по убыванию
              </SortItem>
            </>
          )}

          {search && (
            <>
              <Menu.Item sx={(theme) => ({ "&[data-hovered]": { background: theme.white } })}>
                <Autocomplete
                  value={search.value}
                  onChange={search.onChange}
                  size="xs"
                  data={[]}
                  label={<Menu.Label pl={0}>Поиск</Menu.Label>}
                  placeholder="Поиск..."
                  icon={<IconSearch size={16} />}
                />
              </Menu.Item>
            </>
          )}
        </Menu.Dropdown>
      </Menu>
    </Box>
  )
}

export default ThMenu
