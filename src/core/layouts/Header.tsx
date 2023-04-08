import { useSession } from "@blitzjs/auth"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import {
  Container,
  Header as MantineHeader,
  Text,
  Group,
  Button,
  Avatar,
  Menu,
  Stack,
} from "@mantine/core"
import Link from "next/link"
import logout from "src/auth/mutations/logout"
import Navigation from "./Navigation"
import { Suspense } from "react"

const HeaderProfile = () => {
  const session = useSession()
  const [logoutMutation] = useMutation(logout)

  return session.userId ? (
    <Menu>
      <Menu.Target>
        <Avatar sx={{ cursor: "pointer" }} />
      </Menu.Target>

      <Menu.Dropdown>
        <Stack spacing={0} px="sm">
          <Text size="sm">Аркадий А.А.</Text>
          <Text size="sm" color="dimmed">
            arcadyi@mail.ru
          </Text>
        </Stack>
        <Menu.Divider />

        <Menu.Item component={Link} href={Routes.ProfilePage()}>
          Перейти в профиль
        </Menu.Item>
        <Menu.Item color="red" onClick={() => logoutMutation()}>
          Выйти
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <Group>
      <Button size="xs" variant="outline" component={Link} href={Routes.LoginPage()}>
        Войти
      </Button>
      <Button size="xs" component={Link} href={Routes.SignupPage()}>
        Зарегистрироваться
      </Button>
    </Group>
  )
}

const Header = () => {
  return (
    <MantineHeader height={60}>
      <Container size="xl" h="100%">
        <Group position="apart" h="100%">
          <Text weight="bold" size={28} component={Link} href={Routes.EntitiesPage()}>
            ГИН
          </Text>
          <Navigation />
          <Suspense>
            <HeaderProfile />
          </Suspense>
        </Group>
      </Container>
    </MantineHeader>
  )
}

export default Header
