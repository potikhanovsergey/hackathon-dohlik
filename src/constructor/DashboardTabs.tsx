import { Tabs } from "@mantine/core"
import { IconArticle, IconHome, IconUsersGroup } from "@tabler/icons-react"
import DashboardGroups from "./DashboardGroups"
import Constructor from "./Constructor"

const panels = [
  {
    value: "entities",
    children: <Constructor />,
  },
  {
    value: "groups",
    children: <DashboardGroups />,
  },
]

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="entities">
      <Tabs.List>
        <Tabs.Tab value="entities" icon={<IconHome size="0.8rem" />}>
          Свойства объектов
        </Tabs.Tab>
        <Tabs.Tab value="groups" icon={<IconUsersGroup size="0.8rem" />}>
          Состав рабочих групп
        </Tabs.Tab>
      </Tabs.List>

      {panels.map((panel) => (
        <Tabs.Panel key={panel.value} pt="xl" {...panel} />
      ))}
    </Tabs>
  )
}

export default DashboardTabs
