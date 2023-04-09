import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Button, Container, FileButton, Group, TextInput, Title } from "@mantine/core"
import EntitiesTable from "src/entities/EntitiesTable"
import FilterAddButtons from "src/core/FilterAddButtons"
import EntityForm from "src/entities/EntityForm"
import { openModal } from "@mantine/modals"
import { invalidateQuery, useMutation, useQuery } from "@blitzjs/rpc"
import getEntities from "src/entities/queries/getEntities"
import { Attribute, Entity, EntityAttribute, EntityFile, Solution } from "@prisma/client"
import { useEffect, useState } from "react"
import { xmlToJson } from "src/helpers/xmlToJson"
import createEntities from "src/entities/mutations/createEntities"
import { notifications } from "@mantine/notifications"

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
  attributes: (EntityAttribute & { attribute: Attribute })[]
  files: EntityFile[]
  solutions: Solution[]
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

  const [file, setFile] = useState<File | null>(null)

  const [createEntitiesMutation] = useMutation(createEntities, {})

  useEffect(() => {
    const readFile = async () => {
      if (file) {
        const text = await file.text()

        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(text, "text/xml")
        const json = xmlToJson(xmlDoc) as any

        let isSuccess = false

        if (typeof json === "object" && Object.hasOwn(json, "root")) {
          const root = json.root
          if (typeof root === "object" && Object.hasOwn(root, "data")) {
            const data = root.data
            if (Array.isArray(data)) {
              try {
                const mappedData = data.map((item) => ({
                  ...item,
                  area: typeof item.area === "string" && !isNaN(item.area) ? +item.area : undefined,
                }))
                console.log("DATA", mappedData)
                const response = await createEntitiesMutation({
                  data: mappedData,
                  skipDuplicates: true,
                })

                notifications.show({
                  withCloseButton: true,
                  autoClose: 5000,
                  title: "Успешный импорт",
                  message: `Добавлено ${response.count}шт. новых объектов в базу данных`,
                  color: "green",
                })

                isSuccess = true
                void invalidateQuery(getEntities)
              } catch (e) {}
            }
          }
        }

        if (!isSuccess) {
          notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            title: "Ошибка импорта",
            message: "Не удалось найти данные объектов внутри структуры XML",
            color: "red",
          })
        }

        setFile(null)
      }
    }

    void readFile()
  }, [file])

  return (
    <Layout title="Объекты">
      <Container size="xl">
        <Title mb="xl">Объекты</Title>
        <FilterAddButtons
          right={
            <Group>
              <FileButton onChange={setFile} accept="text/xml">
                {(props) => (
                  <Button color="green" {...props}>
                    Импорт из XML
                  </Button>
                )}
              </FileButton>
              <Button onClick={openEditModal}>Добавить объект</Button>
            </Group>
          }
        >
          <AdditionFiltersMock />
        </FilterAddButtons>
        <EntitiesTable entities={entities as ExtendedEntity[]} />
      </Container>
    </Layout>
  )
}

export default EntitiesPage
