import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, Title, Group, Button } from "@mantine/core"
import ProtocolsTable from "src/protocols/ProtocolsTable"
import { openModal } from "@mantine/modals"
import ProtocolForm from "src/protocols/ProtocolForm"
import getProtocols from "src/protocols/queries/getProtocols"
import { useQuery } from "@blitzjs/rpc"
import { Assignment, Entity, Protocol, Solution } from "@prisma/client"

export interface ExtendedProtocol extends Protocol {
  solutions: (Solution & { assignments: Assignment[] } & { entity: Entity })[]
}

const ProtocolsPage: BlitzPage = () => {
  const openAddProtocalModal = () =>
    openModal({
      title: "Добавить протокол",
      children: <ProtocolForm />,
      centered: true,
    })

  const [protocols] = useQuery(getProtocols, {
    include: {
      solutions: {
        include: {
          assignments: true,
          entity: true,
        },
      },
    },
  })

  return (
    <Layout title="Протоколы">
      <Container size="xl">
        <Group position="apart" mb="md" noWrap align="center">
          <Title>Протоколы</Title>
          <Button onClick={() => openAddProtocalModal()}>Добавить протокол</Button>
        </Group>
        <ProtocolsTable protocols={protocols as ExtendedProtocol[]} />
      </Container>
    </Layout>
  )
}

export default ProtocolsPage
