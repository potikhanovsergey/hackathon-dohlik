import { Tabs } from "@mantine/core"
import { IconBuildingCommunity, IconBulbFilled, IconMap2 } from "@tabler/icons-react"
import EntitiesTable from "./EntitiesTable"
import EntityInfo from "./EntitiyInfo"

const EntityTabs = () => {
  return (
    <Tabs defaultValue="entity">
      <Tabs.List>
        <Tabs.Tab value="entity" icon={<IconBuildingCommunity size="0.8rem" />}>
          Объект
        </Tabs.Tab>
        <Tabs.Tab value="solutions" icon={<IconBulbFilled size="0.8rem" />}>
          Решения
        </Tabs.Tab>
        <Tabs.Tab value="map" icon={<IconMap2 size="0.8rem" />}>
          Карта
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="entity" pt="xs">
        <EntityInfo />
      </Tabs.Panel>

      <Tabs.Panel value="solutions" pt="xs">
        <EntitiesTable />
      </Tabs.Panel>

      <Tabs.Panel value="map" pt="xs">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  )
}

export default EntityTabs
