import { Group, Button, Menu, Text } from "@mantine/core"
import { IconCopy, IconEyeOff } from "@tabler/icons-react"
import { useState } from "react"

const AttributeControls = ({ onDelete }: { onDelete: () => void }) => {
  const [menuOpened, setMenuOpened] = useState(false)

  return (
    <Group spacing="xs">
      <Button variant="subtle" rightIcon={<IconCopy size={16} />} compact>
        Дублировать
      </Button>
      <Button variant="subtle" rightIcon={<IconEyeOff size={16} />} compact>
        Выключить
      </Button>

      <Menu width={300} opened={menuOpened} onChange={setMenuOpened}>
        <Menu.Target>
          <Button color="red" onClick={() => setMenuOpened(false)}>
            Удалить
          </Button>
        </Menu.Target>

        <Menu.Dropdown p="sm">
          <Text align="right" size="sm" mb="xs">
            Вы уверены, что хотите удалить это свойство для всех объектов?
          </Text>
          <Group position="right" spacing={4}>
            <Button onClick={() => setMenuOpened(false)}>Отмена</Button>
            <Button
              color="red"
              onClick={() => {
                onDelete()
                setMenuOpened(false)
              }}
            >
              Удалить
            </Button>
          </Group>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}

export default AttributeControls
