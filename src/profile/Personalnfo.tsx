import {
  Stack,
  Text,
  Group,
  ActionIcon,
  Avatar,
  TextInput,
  Button,
  FileButton,
} from "@mantine/core"
import { IconCheck, IconCross, IconEdit, IconX } from "@tabler/icons-react"
import { useState } from "react"

const PersonalInfo = () => {
  const [changeName, setChangeName] = useState(false)
  const [changeEmail, setChangeEmail] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  return (
    <Stack spacing={0} align="flex-start">
      <Text weight="bold" size="lg">
        ФИО
      </Text>
      <Group mb="md" spacing={0}>
        {changeName ? (
          <TextInput placeholder="Аркадий Аркадьевич Аркадьев" />
        ) : (
          <Text>Аркадий Аркадьевич Аркадьев</Text>
        )}
        {changeName ? (
          <Group spacing={0}>
            <ActionIcon
              variant="transparent"
              onClick={() => {
                const change = !changeName
                setChangeName(change)
              }}
            >
              <IconX size={16} />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                const change = !changeName
                setChangeName(change)
              }}
              color="green"
              variant="transparent"
            >
              <IconCheck size={16} />
            </ActionIcon>
          </Group>
        ) : (
          <ActionIcon
            variant="transparent"
            onClick={() => {
              const change = !changeName
              setChangeName(change)
            }}
          >
            <IconEdit size={16} />
          </ActionIcon>
        )}
      </Group>
      <Text weight="bold" size="lg">
        Электронная почта
      </Text>
      <Group mb="sm" spacing={0}>
        {changeEmail ? <TextInput placeholder="arcadiy@mail.ru" /> : <Text>arcadiy@mail.ru</Text>}
        {changeEmail ? (
          <Group spacing={0}>
            <ActionIcon
              variant="transparent"
              onClick={() => {
                const change = !changeEmail
                setChangeEmail(change)
              }}
            >
              <IconX size={16} />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                const change = !changeEmail
                setChangeEmail(change)
              }}
              color="green"
              variant="transparent"
            >
              <IconCheck size={16} />
            </ActionIcon>
          </Group>
        ) : (
          <ActionIcon
            variant="transparent"
            onClick={() => {
              const change = !changeEmail
              setChangeEmail(change)
            }}
          >
            <IconEdit size={16} />
          </ActionIcon>
        )}
      </Group>
      <Text weight="bold" size="lg">
        Аватар
      </Text>
      <Avatar
        src="https://ucarecdn.com/68af31a6-8891-4116-8cf9-5ee125913524/noroot.png"
        size={200}
        alt="profile picture"
      />
      <FileButton onChange={setFile} accept="image/png,image/jpeg">
        {(props) => <Button {...props}>Загрузить новое фото профиля</Button>}
      </FileButton>
      {file && (
        <Text size="sm" align="center" mt="sm">
          Выбранная картинка: {file.name}
        </Text>
      )}
    </Stack>
  )
}

export default PersonalInfo
