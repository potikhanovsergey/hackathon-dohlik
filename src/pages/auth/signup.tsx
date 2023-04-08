import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import SignupForm from "src/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  return (
    <Layout title="Sign Up">
      <SignupForm />
    </Layout>
  )
}

SignupPage.redirectAuthenticatedTo = Routes.EntitiesPage()

export default SignupPage
