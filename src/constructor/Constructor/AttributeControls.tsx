import { Group, Button } from "@mantine/core"
import { IconCopy, IconEyeOff, IconArrowUp, IconArrowDown, IconTrash } from "@tabler/icons-react"

interface AttributeControlsProps {
  isFirst: boolean
  isLast: boolean
}

const AttributeControls = ({ isFirst, isLast }: AttributeControlsProps) => {
  return (
    <Group spacing="xs">
      <Button variant="subtle" rightIcon={<IconCopy size={16} />} compact>
        Дублировать
      </Button>
      <Button variant="subtle" rightIcon={<IconEyeOff size={16} />} compact>
        Выключить
      </Button>
      {!isFirst && (
        <Button variant="subtle" rightIcon={<IconArrowUp size={16} />} compact>
          Выше
        </Button>
      )}
      {!isLast && (
        <Button variant="subtle" rightIcon={<IconArrowDown size={16} />} compact>
          Ниже
        </Button>
      )}
      <Button rightIcon={<IconTrash size={16} />} compact color="red">
        Удалить
      </Button>
    </Group>
  )
}

export default AttributeControls
