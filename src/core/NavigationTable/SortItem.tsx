import { Menu, MenuItemProps, useMantineTheme } from "@mantine/core"

interface SortItemProps extends MenuItemProps {
  active: boolean
  onClick?: () => void
}

const SortItem = ({ active, ...props }: SortItemProps) => {
  const theme = useMantineTheme()
  return <Menu.Item sx={{ color: active ? theme.fn.primaryColor() : undefined }} {...props} />
}

export default SortItem
