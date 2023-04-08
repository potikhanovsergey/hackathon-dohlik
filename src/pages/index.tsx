import Layout from "src/core/layouts/Layout"
import { supabase } from "lib/supabase"
import { useState } from "react"
import { BlitzPage } from "@blitzjs/next"
import {
  Avatar,
  Badge,
  Button,
  Container,
  FileButton,
  Group,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import dynamic from "next/dynamic"

const Home: BlitzPage = () => {
  const [uploading, setUploading] = useState(false)
  const [url, setUrl] = useState("")
  const uploadFile = async (file: File | null) => {
    if (file) {
      setUploading(true)
      const filename = `${new Date().toISOString()}-${file.name}`

      const { data, error } = await supabase.storage.from("bucket").upload(filename, file, {
        cacheControl: "3600",
        upsert: false,
      })

      const filepath = data?.path

      if (filepath) {
        const { data } = await supabase.storage
          .from("bucket")
          .createSignedUrl(filepath, 60 * 60 * 24)
        data?.signedUrl && setUrl(data.signedUrl)
      }
      setUploading(false)
      // save filepath in database
    }
  }
  return (
    <Layout title="Home">
      <Container mt="xl">
        <Button>Кнопка</Button>
        <Text>
          Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.
          Страну первую путь безопасную! Пояс.
        </Text>
        <Title>
          Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные тексты.
        </Title>
        <Group>
          <FileButton onChange={uploadFile} accept="image/png,image/jpeg">
            {(props) => (
              <Button loading={uploading} {...props}>
                Upload file
              </Button>
            )}
          </FileButton>
          <Avatar src={url} />
        </Group>
        <TextInput label="Label" placeholder="Placeholder..." />
        <Badge>Label</Badge>
        <footer>
          <a
            href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Blitz.js
          </a>
        </footer>
      </Container>
    </Layout>
  )
}

export default Home
