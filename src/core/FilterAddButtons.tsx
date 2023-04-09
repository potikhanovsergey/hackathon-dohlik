import { Group, Button, Paper, TextInput } from "@mantine/core"
import { ReactNode, useState } from "react"

const FilterAddButtons = ({
  children,
  onAddButtonClick,
  withAddButton = false,
}: {
  children: ReactNode
  onAddButtonClick?: () => void
  withAddButton?: boolean
}) => {
  const [showFilters, toggleShowFilters] = useState(false)

  return (
    <>
      <Group position="apart" mb="md">
        <Button
          onClick={() => {
            const show = !showFilters
            toggleShowFilters(show)
          }}
        >
          Фильтры
        </Button>
        {withAddButton && <Button onClick={onAddButtonClick}>Добавить</Button>}
      </Group>
      {showFilters && (
        <Paper my="md" withBorder>
          <Group>{children}</Group>
        </Paper>
      )}
    </>
  )
}

export default FilterAddButtons
