import { BlitzPage, useParam } from "@blitzjs/next"
import { dehydrate, useQuery } from "@blitzjs/rpc"
import { Container } from "@mantine/core"
import db from "db"
import { GetServerSideProps } from "next"
import { gSSP } from "src/blitz-server"
import Layout from "src/core/layouts/Layout"
import EntityHeader from "src/entities/EntityHeader"
import EntityTabs from "src/entities/EntityTabs"
import { ExtendedEntity } from ".."

const EntityPage: BlitzPage = ({ entity }: { entity: ExtendedEntity }) => {
  return (
    <Layout title="Объект">
      <Container size="xl">
        <EntityHeader entity={entity} />
        <EntityTabs entity={entity as ExtendedEntity} />
      </Container>
    </Layout>
  )
}

export default EntityPage

export const getServerSideProps: GetServerSideProps = gSSP(async ({ params }) => {
  const id = params?.id as string

  let entity: ExtendedEntity | null = null

  if (!isNaN(+id)) {
    entity = await db.entity.findFirst({
      where: {
        id: +id,
      },
      include: { solutions: true, files: true, attributes: { include: { attribute: true } } },
    })
  }

  if (!entity) {
    return {
      notFound: true,
      props: {} as { [key: string]: any },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      entity,
    },
  }
})
