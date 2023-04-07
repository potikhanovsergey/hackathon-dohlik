import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Title } from "@mantine/core"

const ProfilePage: BlitzPage = () => {
  return (
    <Layout title="Профиль">
      <Title>Профиль</Title>
    </Layout>
  )
}

export default ProfilePage
