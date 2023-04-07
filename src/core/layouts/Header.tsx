import { useSession } from "@blitzjs/auth"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Container, Header as MantineHeader, Text, Group, Button } from "@mantine/core"
import Link from "next/link"
import logout from "src/auth/mutations/logout"

const Header = () => {
  const session = useSession({ suspense: false })

  const [logoutMutation] = useMutation(logout)

  return (
    <MantineHeader height={60}>
      <Container size="xl" h="100%">
        <Group position="apart" h="100%">
          <Text>Template</Text>
          <Group>
            {session.userId ? (
              <Button size="xs" onClick={() => logoutMutation()}>
                Выйти
              </Button>
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
