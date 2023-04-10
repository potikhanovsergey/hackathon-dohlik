import {
  Stack,
  Text,
  Group,
  ActionIcon,
  Avatar,
  TextInput,
  Button,
  FileButton,
  Tooltip,
} from "@mantine/core"
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react"
import { useState } from "react"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"

const PersonalInfo = () => {
  const [changeName, setChangeName] = useState(false)
  const [changeEmail, setChangeEmail] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const user = useCurrentUser()

  return user ? (
    <Stack spacing={0} align="flex-start">
      <Text weight="bold" size="lg">
        ФИО
      </Text>
      <Group mb="md" spacing={0}>
        {changeName ? <TextInput placeholder={user.name} /> : <Text>{user.name}</Text>}
        {changeName ? (
          <Group spacing={0}>
            <Tooltip label="Отменить редактирование">
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  const change = !changeName
                  setChangeName(change)
                }}
              >
                <IconX size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Сохранить">
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
            </Tooltip>
          </Group>
        ) : (
          <Tooltip label="Редактировать ФИО">
            <ActionIcon
              variant="transparent"
              onClick={() => {
                const change = !changeName
                setChangeName(change)
              }}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
      <Text weight="bold" size="lg">
        Электронная почта
      </Text>
      <Group mb="sm" spacing={0}>
        {changeEmail ? <TextInput placeholder={user.email} /> : <Text>{user.email}</Text>}
        {changeEmail ? (
          <Group spacing={0}>
            <Tooltip label="Отменть редактирование">
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  const change = !changeEmail
                  setChangeEmail(change)
                }}
              >
                <IconX size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Сохранить">
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
            </Tooltip>
          </Group>
        ) : (
          <Tooltip label="Редактировать эл.почту">
            <ActionIcon
              variant="transparent"
              onClick={() => {
                const change = !changeEmail
                setChangeEmail(change)
              }}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
      <Text weight="bold" size="lg">
        Аватар
      </Text>
      <Avatar radius={200} my="xs" src={user.avatar} size={200} alt="Profile picture" />
      <FileButton onChange={setFile} accept="image/png,image/jpeg">
        {(props) => <Button {...props}>Загрузить новое фото профиля</Button>}
      </FileButton>
      {file && (
        <Text size="sm" align="center" mt="sm">
          Выбранная картинка: {file.name}
        </Text>
      )}
    </Stack>
  ) : (
    <></>
  )
}

export default PersonalInfo
