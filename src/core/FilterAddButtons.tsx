import { Group, Button, Paper } from "@mantine/core"
import { ReactNode, useState } from "react"

const FilterAddButtons = ({ children, right }: { children: ReactNode; right: ReactNode }) => {
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
        {right && right}
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
