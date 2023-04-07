import signup from "src/auth/mutations/signup"
import { useMutation } from "@blitzjs/rpc"
import { Button, Container, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"

const SignupForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  const [signupMutation] = useMutation(signup)

  const handleSubmit = form.onSubmit((values) => {
    signupMutation({ email: values.email, password: values.password })
  })

  return (
    <Container>
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <TextInput label="Почта" {...form.getInputProps("email")} />
        <PasswordInput label="Пароль" {...form.getInputProps("password")} />
        <Button mt="md" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </Container>
  )
}

export default SignupForm
