import signup from "src/auth/mutations/signup"
import { useMutation } from "@blitzjs/rpc"
import { Button, Container, Paper, PasswordInput, TextInput, Title, Text } from "@mantine/core"
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

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      void signupMutation({ email: values.email, password: values.password })
    } catch (err) {
      if (err.code === "P2002") {
        form.setFieldError("email", "Пользователь с такой почтой уже существует")
      }
    }
  })

  return (
    <Container size={420} mt={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Создать аккаунт
      </Title>
      <form onSubmit={handleSubmit}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Почта" {...form.getInputProps("email")} required />
          <PasswordInput label="Пароль" {...form.getInputProps("password")} required />
          <Button fullWidth mt="xl" type="submit">
            Зарегистрироваться
          </Button>
        </Paper>
      </form>
    </Container>
  )
}

export default SignupForm
