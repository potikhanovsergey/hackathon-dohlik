import { Routes } from "@blitzjs/next"
import { Group } from "@mantine/core"
import Link from "../Link"
import { useRouter } from "next/router"

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
    label: "Настройки",
    route: Routes.DashboardPage(),
  },
  {
    label: "Протоколы",
    route: Routes.ProtocolsPage(),
  },
  {
    label: "Повестки",
    route: Routes.AgendasPage(),
  },
]

const Navigation = () => {
  const router = useRouter()

  return (
    <nav>
      <Group spacing="xl">
        {navigationItems.map((navItem) => (
          <Link
            key={navItem.label}
            size="sm"
            active={router.asPath === navItem.route.href}
            href={navItem.route}
          >
            {navItem.label}
          </Link>
        ))}
      </Group>
    </nav>
  )
}

export default Navigation
