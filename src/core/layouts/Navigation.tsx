import { Routes } from "@blitzjs/next"
import { createStyles, Group, Text } from "@mantine/core"
import Link from "next/link"

const useStyles = createStyles((theme) => ({
  link: {
    color: theme.colors[theme.primaryColor][5],
    borderBottom: "1px solid transparent",
    transition: "all 0.2s ease",
    ":hover": {
      borderBottom: `1px solid ${theme.colors[theme.primaryColor][5]}`,
    },
  },
}))

const navigationItems = [
  {
    label: "Объекты",
    route: Routes.EntitiesPage(),
  },
  {
    label: "Календарь",
    route: Routes.CalendarPage(),
  },
  {
    label: "Решения",
    route: Routes.SolutionsPage(),
  },
  {
    label: "Дашборд",
    route: Routes.DashboardPage(),
  },
]

const Navigation = () => {
  const { classes } = useStyles()

  return (
    <nav>
      <Group spacing="xl">
        {navigationItems.map((navItem) => (
          <Text
            key={navItem.label}
            size="sm"
            component={Link}
            href={navItem.route}
            className={classes.link}
          >
            {navItem.label}
          </Text>
        ))}
      </Group>
    </nav>
  )
}

export default Navigation
