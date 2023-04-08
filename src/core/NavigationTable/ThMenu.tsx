import { Box, BoxProps, Menu, TextInput, useMantineTheme } from "@mantine/core"
import { IconSearch, IconSortAscending, IconSortDescending } from "@tabler/icons-react"
import { ChangeEventHandler, ReactNode } from "react"

interface ThMenuProps extends BoxProps {
  sort?: {
    value: "asc" | "desc"
    onChange: (value: "asc" | "desc") => void
  }
  search?: {
    value: string
    onChange: (value: string) => void
  }
}

const ThMenu = ({ children, sort, search, ...props }: ThMenuProps) => {
  const theme = useMantineTheme()
  const handleSortAscending = () => sort?.onChange?.("asc")
  const handleSortDescending = () => sort?.onChange?.("desc")
  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    search?.onChange?.(e.currentTarget.value)

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
              <Menu.Item onClick={handleSortAscending} icon={<IconSortAscending size={16} />}>
                Сортировка по возрастанию
              </Menu.Item>
              <Menu.Item onClick={handleSortDescending} icon={<IconSortDescending size={16} />}>
                Сортировка по убыванию
              </Menu.Item>
            </>
          )}

          {search && (
            <>
              <Menu.Item sx={(theme) => ({ "&[data-hovered]": { background: theme.white } })}>
                <TextInput
                  value={search.value}
                  onChange={handleSearchChange}
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
    </Box>
  )
}

export default ThMenu
