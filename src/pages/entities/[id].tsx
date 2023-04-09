import { BlitzPage, useParam } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { Container } from "@mantine/core"
import { Entity, EntityFile, EntityAttribute, Attribute } from "@prisma/client"
import Layout from "src/core/layouts/Layout"
import EntityHeader from "src/entities/EntityHeader"
import EntityTabs from "src/entities/EntityTabs"
import getEntitieById from "src/entities/queries/getEntityById"

export interface ExtendedEntityFull extends Entity {
  files: EntityFile[]
  attributes: EntityAttribute & { attribute: Attribute }[]
}

const EntityPage: BlitzPage = () => {
  const id = useParam("id")

  const [entity] = useQuery(
    getEntitieById,
    { where: { id: +id! }, include: { files: true, attributes: { include: { attribute: true } } } },
    { refetchOnReconnect: false, refetchOnWindowFocus: false }
  )

  return (
    <Layout title="Объект">
      <Container size="xl">
        {entity && (
          <>
            <EntityHeader entity={entity} />
            <EntityTabs entity={entity as ExtendedEntityFull} />
          </>
        )}
      </Container>
    </Layout>
  )
}

export default EntityPage
