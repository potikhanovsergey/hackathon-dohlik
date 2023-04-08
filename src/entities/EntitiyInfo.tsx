import { Box, Group, Image, ScrollArea, SimpleGrid, Stack, Text, TextInput } from "@mantine/core"
import { openModal } from "@mantine/modals"
import Link from "next/link"

const images = [
  "https://ucarecdn.com/68af31a6-8891-4116-8cf9-5ee125913524/noroot.png",
  "https://ucarecdn.com/1359520b-8f81-40fa-9dba-6a31dcd88717/images",
  "https://ucarecdn.com/481a2d73-ea4c-4821-ba86-3882d30f10f1/Gradient_builder_2.jpg",
  "https://ucarecdn.com/fd860466-9bb2-4b99-a276-23e25c61c889/images",
  "https://ucarecdn.com/68af31a6-8891-4116-8cf9-5ee125913524/noroot.png",
  "https://ucarecdn.com/1359520b-8f81-40fa-9dba-6a31dcd88717/images",
]

const EntityInfo = () => {
  return (
    <Stack>
      <Text weight="bold" size="lg">
        Дополнительные свойства объекта
      </Text>
      <SimpleGrid cols={3}>
        <TextInput label="Какой нибудь номер" placeholder="38479387" disabled />
        <TextInput label="Какой нибудь номер" placeholder="38479387" disabled />
        <TextInput label="Какой нибудь номер" placeholder="38479387" disabled />
        <TextInput label="Какой нибудь номер" placeholder="38479387" disabled />
        <TextInput label="Какой нибудь номер" placeholder="38479387" disabled />
        <TextInput label="Какой нибудь номер" placeholder="38479387" disabled />
      </SimpleGrid>
      <Text weight="bold" size="lg">
        Документы по объекту
      </Text>
      <Group>
        <Link href="sldkflk">file.pdf</Link>
        <Link href="sldkflk">file.pdf</Link>
        <Link href="sldkflk">file.pdf</Link>
      </Group>
      <Text weight="bold" size="lg">
        Фотоматериалы по объекту
      </Text>
      <SimpleGrid cols={3} spacing="md">
        {images.map((image) => (
          <Image
            key={image}
            src={image}
            alt=""
            height={200}
            sx={{
              cursor: "pointer",
              transition: "all .2s ease-in-out",
              ":hover": { scale: "1.02" },
            }}
          />
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default EntityInfo
