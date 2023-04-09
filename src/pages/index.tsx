import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, TextInput, Title } from "@mantine/core"
import EntitiesTable from "src/entities/EntitiesTable"
import FilterAddButtons from "src/core/FilterAddButtons"
import EntityForm from "src/entities/EntityForm"
import { openModal } from "@mantine/modals"
import { useQuery } from "@blitzjs/rpc"
import getEntities from "src/entities/queries/getEntities"
import { Entity, EntityAttribute } from "@prisma/client"

export const AdditionFiltersMock = () => {
  return (
    <>
      <TextInput label="Новое свойство" />
      <TextInput label="Новое свойство" />
      <TextInput label="Новое свойство" />
      <TextInput label="Новое свойство" />
      <TextInput label="Новое свойство" />
      <TextInput label="Новое свойство" />
      <TextInput label="Новое свойство" />
    </>
  )
}

export interface ExtendedEntity extends Entity {
  attributes: EntityAttribute[]
}

const EntitiesPage: BlitzPage = () => {
  const [entities] = useQuery(
    getEntities,
    {
      include: {
        attributes: true,
      },
    },
    { refetchOnReconnect: false, refetchOnWindowFocus: false }
  )

  const openEditModal = () =>
    openModal({
      title: "Добавить объект",
      children: <EntityForm />,
      centered: true,
    })

  return (
    <Layout title="Объекты">
      <Container size="xl">
        <Title mb="xl">Объекты</Title>
        <FilterAddButtons onAddButtonClick={openEditModal} withAddButton={true}>
          {AdditionFiltersMock()}
        </FilterAddButtons>
        <EntitiesTable entities={entities as ExtendedEntity[]} />
      </Container>
    </Layout>
  )
}

export default EntitiesPage
