import { Tabs } from "@mantine/core"
import { IconArticle, IconHome, IconUsersGroup } from "@tabler/icons-react"
import DashboardGroups from "./DashboardGroups"

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="entities">
      <Tabs.List>
        <Tabs.Tab value="entities" icon={<IconHome size="0.8rem" />}>
          Свойства объектов
        </Tabs.Tab>
        <Tabs.Tab value="solutions" icon={<IconArticle size="0.8rem" />}>
          Свойства решений
        </Tabs.Tab>
        <Tabs.Tab value="groups" icon={<IconUsersGroup size="0.8rem" />}>
          Состав рабочих групп
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="entities" pt="xs">
        Свойства объектов
      </Tabs.Panel>

      <Tabs.Panel value="solutions" pt="xs">
        Свойства решений
      </Tabs.Panel>
      <Tabs.Panel value="groups" pt="xs">
        <DashboardGroups />
      </Tabs.Panel>
    </Tabs>
  )
}

export default DashboardTabs
