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
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import Navigation from "./Navigation"

const Header = () => {
  const session = useSession({ suspense: false })

  const [logoutMutation] = useMutation(logout)

  return (
    <MantineHeader height={60}>
      <Container size="xl" h="100%">
        <Group position="apart" h="100%">
          <Text component={Link} href={Routes.Home()}>
            Template
          </Text>
          <Navigation />
          <Group>
            {session.userId ? (
              <>
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
              </>
            ) : (
              <>
                <Button size="xs" variant="outline" component={Link} href={Routes.LoginPage()}>
                  Войти
                </Button>
                <Button size="xs" component={Link} href={Routes.SignupPage()}>
                  Зарегистрироваться
                </Button>
              </>
            )}
          </Group>
        </Group>
      </Container>
    </MantineHeader>
  )
}

export default Header
