import Layout from "src/core/layouts/Layout"
import forgotPassword from "src/auth/mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <Layout title="Forgot Your Password?">
      <h1>Forgot your password?</h1>
    </Layout>
  )
}

export default ForgotPasswordPage
