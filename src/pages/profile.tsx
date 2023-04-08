import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, Title } from "@mantine/core"
import ProfileTabs from "src/profile/ProfileTabs"

const ProfilePage: BlitzPage = () => {
  return (
    <Layout title="Профиль">
      <Container size="xl">
        <Title>Профиль</Title>
        <ProfileTabs />
      </Container>
    </Layout>
  )
}

export default ProfilePage
