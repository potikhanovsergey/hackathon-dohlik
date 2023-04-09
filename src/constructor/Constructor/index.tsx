import { Box, Button, Stack } from "@mantine/core"
import { useState } from "react"
import Attribute from "./Attribute"
import { invalidateQuery, useMutation, useQuery } from "@blitzjs/rpc"
import getAttributes from "src/attributes/queries/getAttributes"
import { Attribute as AttributeProps } from "@prisma/client"
import deleteAttribute from "src/attributes/mutations/deleteAttribute"

export interface ConstructorAttribute {
  id?: AttributeProps["id"]
  name: AttributeProps["name"]
  placeholder: AttributeProps["placeholder"]
  defaultValue: AttributeProps["defaultValue"]
  autoFill: AttributeProps["autoFill"]
  data: AttributeProps["data"]
  attributeType: AttributeProps["attributeType"] | null
}

const Constructor = () => {
  const [dbAttributes] = useQuery(getAttributes, { where: { parent: "entity" } })

  const [attributes, setAttributes] = useState<ConstructorAttribute[]>([])
  const addAttribute = () => {
    setAttributes((prev) => [
      ...prev,
      {
        attributeType: null,
        autoFill: false,
        placeholder: "",
        name: "",
        defaultValue: [],
        data: [],
      },
    ])
  }

  const [deleteAttributeMutation] = useMutation(deleteAttribute)

  return (
    <div>
      <Button size="xs" mb="xl" onClick={addAttribute}>
        Добавить свойство
      </Button>
      <Stack spacing="xl">
        {[...attributes, ...(dbAttributes || [])]?.map((attribute, i) => (
          <Attribute
            onDelete={async () => {
              if (attribute.id) {
                await deleteAttributeMutation({ where: { id: attribute.id } })
                await invalidateQuery(getAttributes)
              } else {
                const newAttributes = [...attributes]
                newAttributes.splice(i, 1)
                setAttributes(newAttributes)
              }
            }}
            attribute={attribute}
            index={i}
            key={i}
          />
        ))}
      </Stack>
    </div>
  )
}

export default Constructor
