import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import login from "src/auth/mutations/login"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { Form, useForm } from "@mantine/form"
import { Button, Container, PasswordInput, TextInput } from "@mantine/core"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  const [loginMutation] = useMutation(login)

  const handleSubmit = form.onSubmit((values) => {
    loginMutation({ email: values.email, password: values.password })
  })

  return (
    <div>
      <Container>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <TextInput label="Почта" {...form.getInputProps("email")} />
          <PasswordInput label="Пароль" {...form.getInputProps("password")} />
          <Button mt="md" type="submit">
            Войти в аккаунт
          </Button>
        </form>
        <div style={{ marginTop: "1rem" }}>
          Or <Link href={Routes.SignupPage()}>Sign Up</Link>
        </div>
      </Container>
    </div>
  )
}

export default LoginForm
