import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, Group, Title, Button } from "@mantine/core"
import SolutionsTable from "src/solutions/SolutionsTable"
import { dehydrate } from "@blitzjs/rpc"
import db from "db"
import { GetServerSideProps } from "next"
import { gSSP } from "src/blitz-server"
import { ExtendedProtocol } from "."

const ProtocolPage: BlitzPage = ({ protocol }: { protocol: ExtendedProtocol }) => {
  return (
    <Layout title="Протокол">
      <Container size="xl">
        <Group position="apart" mb="md" noWrap align="center">
          <Title>Протокол №{protocol.id}</Title>
          <Button>Экспортировать протокол</Button>
        </Group>
        <SolutionsTable solutions={protocol.solutions} />
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = gSSP(async ({ params }) => {
  const id = params?.id as string

  let protocol: ExtendedProtocol | null = null

  if (!isNaN(+id)) {
    protocol = await db.protocol.findFirst({
      where: {
        id: +id,
      },
      include: { solutions: { include: { assignments: true, entity: true } } },
    })
  }

  if (!protocol) {
    return {
      notFound: true,
      props: {} as { [key: string]: any },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      protocol,
    },
  }
})

export default ProtocolPage
