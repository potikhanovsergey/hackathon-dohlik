import { Tabs } from "@mantine/core"
import {
  IconBuildingCommunity,
  IconBulbFilled,
  IconInfoCircle,
  IconMap2,
  IconUsersGroup,
} from "@tabler/icons-react"
import PersonalGroups from "./PersonalGroups"
import PersonalInfo from "./Personalnfo"

const ProfileTabs = () => {
  return (
    <Tabs defaultValue="info">
      <Tabs.List>
        <Tabs.Tab value="info" icon={<IconInfoCircle size="0.8rem" />}>
          Персональные данные
        </Tabs.Tab>
        <Tabs.Tab value="groups" icon={<IconUsersGroup size="0.8rem" />}>
          Группы
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="info" pt="xs">
        <PersonalInfo />{" "}
      </Tabs.Panel>

      <Tabs.Panel value="groups" pt="xs">
        <PersonalGroups />
      </Tabs.Panel>
    </Tabs>
  )
}

export default ProfileTabs
