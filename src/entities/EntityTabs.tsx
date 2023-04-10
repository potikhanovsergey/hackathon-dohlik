import { Group, Stack, Tabs, Text } from "@mantine/core"
import { IconBuildingCommunity, IconBulbFilled, IconMap2 } from "@tabler/icons-react"
import EntityInfo from "./EntityInfo"
import dynamic from "next/dynamic"
import { Placemark } from "@pbe/react-yandex-maps"
import SolutionsTable from "src/solutions/SolutionsTable"
import { ExtendedEntity } from "src/pages"
const Map = dynamic(() => import("@pbe/react-yandex-maps").then((m) => m.Map), { ssr: false })

const EntityTabs = ({ entity }: { entity: ExtendedEntity }) => {
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
        <EntityInfo entity={entity as ExtendedEntity} />
      </Tabs.Panel>

      <Tabs.Panel value="solutions" pt="xs">
        <SolutionsTable solutions={entity.solutions} />
      </Tabs.Panel>

      <Tabs.Panel value="map" pt="xs">
        <Stack py="xl" w="fit-content">
          <Group sx={{ alignSelf: "flex-start" }}>
            <Text weight="bold">Адрес:</Text>
            <Text>Район Соколиная гора, улица Малая Семеновская, д.12</Text>
          </Group>
          <Map width={800} height={400} defaultState={{ center: [55.75, 37.57], zoom: 15 }}>
            <Placemark defaultGeometry={[55.75, 37.57]} />
          </Map>
        </Stack>
      </Tabs.Panel>
    </Tabs>
  )
}

export default EntityTabs
