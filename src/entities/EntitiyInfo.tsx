import { Group, Image, SimpleGrid, Stack, Text, TextInput } from "@mantine/core"
import Link from "next/link"
import { ExtendedEntity } from "src/pages"

const EntityInfo = ({ entity }: { entity: ExtendedEntity }) => {
  return (
    <Stack>
      <Text weight="bold" size="lg">
        Дополнительные свойства объекта
      </Text>
      <SimpleGrid cols={3}>
        {entity.attributes.length > 0 ? (
          entity.attributes.map((a) => (
            <Text key={a.attribute.id}>
              {a.attribute.name}:{" "}
              {a.attribute.defaultValue.map(
                (value, i) => value + (i < entity.attributes.length ? ", " : "")
              )}
            </Text>
          ))
        ) : (
          <Text>Файлов по объекту нет</Text>
        )}
      </SimpleGrid>
      <Text weight="bold" size="lg">
        Документы по объекту
      </Text>
      <Group>
        {entity.files.length > 0 ? (
          entity.files.map((file) => (
            <Link href="sldkflk" key={file.id}>
              {file.name}
            </Link>
          ))
        ) : (
          <Text>Файлов по объекту нет</Text>
        )}
      </Group>
      <Text weight="bold" size="lg">
        Фотоматериалы по объекту
      </Text>
      <SimpleGrid cols={3} spacing="md">
        {entity.files.length > 0 ? (
          entity.files.map((file) => (
            <Image
              key={file.id}
              src={file.path}
              alt={file.name}
              height={200}
              sx={{
                cursor: "pointer",
                transition: "all .2s ease-in-out",
                ":hover": { scale: "1.02" },
              }}
            />
          ))
        ) : (
          <Text>Фотоматериалов по объекту нет</Text>
        )}
      </SimpleGrid>
    </Stack>
  )
}

export default EntityInfo
