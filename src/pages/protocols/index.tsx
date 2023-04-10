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

export const ProtocolFormButton = () => {
  const openAddProtocalModal = () =>
    openModal({
      title: "Добавить протокол",
      children: <ProtocolForm />,
      centered: true,
    })

  return <Button onClick={() => openAddProtocalModal()}>Добавить протокол</Button>
}

const ProtocolsPage: BlitzPage = () => {
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
          <ProtocolFormButton />
        </Group>
        <ProtocolsTable protocols={protocols as ExtendedProtocol[]} />
      </Container>
    </Layout>
  )
}

export default ProtocolsPage
function openAddProtocalModal(): void {
  throw new Error("Function not implemented.")
}
