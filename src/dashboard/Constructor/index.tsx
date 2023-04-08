import { Box, Button, Stack } from "@mantine/core"
import { useState } from "react"
import Attribute from "./Attribute"

const Constructor = () => {
  const [attributes, setAttributes] = useState<number[]>([])
  const addAttribute = () => {
    const last = attributes[attributes.length - 1]
    setAttributes((prev) => [...prev, last ? last + 1 : 1])
  }
  return (
    <div>
      <Button size="xs" mb="xl" onClick={addAttribute}>
        Добавить свойство
      </Button>
      <Stack spacing="xl">
        {attributes.map((attribute, i) => (
          <Attribute
            index={i}
            isFirst={i === 0}
            isLast={i === attributes.length - 1}
            key={attribute}
          />
        ))}
      </Stack>
    </div>
  )
}

export default Constructor
