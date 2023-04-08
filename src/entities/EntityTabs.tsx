import { Tabs } from "@mantine/core"
import { IconBuildingCommunity, IconBulbFilled, IconMap2 } from "@tabler/icons-react"

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
        Объект хахаха
      </Tabs.Panel>

      <Tabs.Panel value="solutions" pt="xs">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="map" pt="xs">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  )
}

export default EntityTabs
