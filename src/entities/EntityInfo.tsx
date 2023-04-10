import { Group, Image, SimpleGrid, Stack, Text, TextInput } from "@mantine/core"
import { supabase } from "lib/supabase"
import Link from "src/core/Link"
import { ExtendedEntity } from "src/pages"

const extensions = ["jpg", "png", "jpeg"]

const EntityDoc = ({ name, entityId }: { name: string; entityId: number }) => {
  const { data } = supabase.storage.from("bucket").getPublicUrl(`${entityId}/${name}`)
  return (
    <Link target="_blank" href={data.publicUrl}>
      {name}
    </Link>
  )
}

const EntityImage = ({ name, entityId }: { name: string; entityId: number }) => {
  const { data } = supabase.storage.from("bucket").getPublicUrl(`${entityId}/${name}`)
  return <Image src={data.publicUrl} alt={name} height={200} />
}

const EntityInfo = ({ entity }: { entity: ExtendedEntity }) => {
  const images = entity.files.filter((f) => {
    const splitted = f.name.split(".")
    return extensions.includes(splitted[splitted.length - 1])
  })
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
                (value, i) => value + (i < entity.attributes.length - 1 ? ", " : "")
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
            <EntityDoc name={file.name} entityId={entity.id} key={file.id} />
          ))
        ) : (
          <Text>Документов по объекту нет</Text>
        )}
      </Group>
      <Text weight="bold" size="lg">
        Фотоматериалы по объекту
      </Text>
      <SimpleGrid cols={3} spacing="md">
        {images.length > 0 ? (
          images.map((image) => (
            <EntityImage key={image.id} name={image.name} entityId={entity.id} />
          ))
        ) : (
          <Text>Фотоматериалов по объекту нет</Text>
        )}
      </SimpleGrid>
    </Stack>
  )
}

export default EntityInfo
