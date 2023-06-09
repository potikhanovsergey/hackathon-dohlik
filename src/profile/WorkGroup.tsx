import { Group, Text, ActionIcon, Button, Menu, MultiSelect, Tooltip } from "@mantine/core"
import { openConfirmModal } from "@mantine/modals"
import { IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import ProfileCard from "./ProfileCard"
import { ExtendedWorkgroup } from "./Workgroups"

const WorkGroup = ({
  withButtons = false,
  withUserDelete = false,
  workgroup,
}: {
  withButtons?: boolean
  withUserDelete?: boolean
  workgroup: ExtendedWorkgroup
}) => {
  const [menuOpened, setMenuOpened] = useState(false)

  const openConfirmDeleteModal = () =>
    openConfirmModal({
      title: "Пожалуйста, подтвердите свое действие",
      children: (
        <Text size="sm">
          Пожалуйста, подвтердите, что вы хотите удалить группу. Это действия необратимо.
        </Text>
      ),
      centered: true,
      confirmProps: { color: "red" },
      labels: { confirm: "Удалить", cancel: "Отмена" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    })

  return (
    <>
      <Group position="apart" align="center">
        <Group spacing={0} align="center">
          <Text weight="bold" size="lg">
            Группа №{workgroup.id}
          </Text>
          {withButtons && (
            <Tooltip label="Удалить рабочую группу">
              <ActionIcon color="red" variant="transparent" onClick={openConfirmDeleteModal}>
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
        {withButtons && (
          <Menu
            closeOnItemClick={false}
            closeOnClickOutside={false}
            width={400}
            opened={menuOpened}
            onChange={setMenuOpened}
          >
            <Menu.Target>
              <Button size="xs" variant="outline">
                Добавить пользователей
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <MultiSelect
                px="sm"
                label="Пользователи"
                placeholder="Нечаев И.В..."
                data={[
                  {
                    label: "Аркадий Ф.Ф.",
                    value: "524235",
                  },
                  {
                    label: "Федор Ф.Ф.",
                    value: "845489",
                  },
                  {
                    label: "Дуров Ф.Ф.",
                    value: "656875",
                  },
                ]}
              />
              <Group position="right" spacing="sm" m="sm">
                <Button onClick={() => setMenuOpened(false)} variant="outline" size="xs">
                  Закрыть
                </Button>
                <Button onClick={() => setMenuOpened(false)} size="xs">
                  Добавить
                </Button>
              </Group>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
      <Group>
        {workgroup.participations.map((participation) => (
          <ProfileCard
            user={participation.user}
            key={participation.id}
            withDelete={withUserDelete}
          />
        ))}
      </Group>
    </>
  )
}

export default WorkGroup
