import { Routes } from "@blitzjs/next"
import { Group, Button } from "@mantine/core"
import Link from "next/link"

const Navigation = () => {
  return (
    <nav>
      <Group spacing="xs">
        <Button size="xs" component={Link} href={Routes.EntitiesPage()}>
          Объекты
        </Button>
        <Button size="xs" component={Link} href={Routes.CalendarPage()}>
          Календарь
        </Button>
        <Button size="xs" component={Link} href={Routes.SolutionsPage()}>
          Решения
        </Button>
        <Button size="xs" component={Link} href={Routes.DashboardPage()}>
          Дэшборд
        </Button>
      </Group>
    </nav>
  )
}

export default Navigation
