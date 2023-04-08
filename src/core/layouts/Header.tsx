import { useSession } from "@blitzjs/auth"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Container, Header as MantineHeader, Text, Group, Button, Avatar } from "@mantine/core"
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
                <Button size="xs" onClick={() => logoutMutation()}>
                  Выйти
                </Button>
                <Avatar component={Link} href={Routes.ProfilePage()} />
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
