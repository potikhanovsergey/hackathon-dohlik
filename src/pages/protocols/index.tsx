import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, Title, Group, Button } from "@mantine/core"
import ProtocolsTable from "src/protocols/ProtocolsTable"
import { openModal } from "@mantine/modals"
import ProtocolForm from "src/protocols/ProtocolForm"

const ProtocolsPage: BlitzPage = () => {
  const openAddProtocalModal = () =>
    openModal({
      title: "Добавить протокол",
      children: <ProtocolForm />,
      centered: true,
    })

  return (
    <Layout title="Протоколы">
      <Container size="xl">
        <Group position="apart" mb="md" noWrap align="center">
          <Title>Протоколы</Title>
          <Button onClick={() => openAddProtocalModal()}>Добавить протокол</Button>
        </Group>
        <ProtocolsTable />
      </Container>
    </Layout>
  )
}

export default ProtocolsPage
