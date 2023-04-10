import { useMutation, invalidateQuery } from "@blitzjs/rpc"
import { Grid, Image, Title, Text, ActionIcon, Group, Paper, Tooltip } from "@mantine/core"
import { openConfirmModal, openModal } from "@mantine/modals"
import { notifications } from "@mantine/notifications"
import { Entity } from "@prisma/client"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { useRouter } from "next/router"
import getAssignments from "src/assigments/queries/getAssignments"
import getEvents from "src/calendar/queries/getEvents"
import EntityForm from "./EntityForm"
import deleteEntity from "./mutations/deleteEntity"
import getEntities from "./queries/getEntities"

const EntityHeader = ({ entity }: { entity: Entity }) => {
  const router = useRouter()

  const [deleteEntityMutation] = useMutation(deleteEntity)

  const openConfirmDeleteModal = () =>
    openConfirmModal({
      title: "Пожалуйста, подтвердите свое действие",
      children: (
        <Text size="sm">
          Пожалуйста, подвтердите, что вы хотите удалить объект. Это действия необратимо.
        </Text>
      ),
      centered: true,
      confirmProps: { color: "red" },
      labels: { confirm: "Удалить", cancel: "Отмена" },
      onConfirm: async () => {
        try {
          await deleteEntityMutation({ where: { id: entity.id } })
          notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            message: "Объект успешно удален",
            color: "green",
          })

          void invalidateQuery(getEntities)
          void router.push("/")
        } catch (e) {
          notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            title: "Ошибка при удалении объекта",
            message: e?.toString(),
            color: "red",
          })
        }
      },
    })
  const openEditModal = () =>
    openModal({
      title: "Редактировать объект",
      children: <EntityForm entity={entity} />,
      centered: true,
    })

  return (
    <Paper withBorder mb="xl">
      <Title order={1} mb="xs">
        {entity.district + " округ, " + entity.region + " р-н, " + entity.address}
        <Group spacing="xs">
          <Tooltip label="Удалить объект">
            <ActionIcon onClick={openConfirmDeleteModal} variant="transparent" color="red">
              <IconTrash />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Редактировать объект">
            <ActionIcon onClick={openEditModal} variant="transparent">
              <IconEdit />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Title>
      <Text>Тип: {entity.type}</Text>
      <Text>Состояние: {entity.state}</Text>
      <Text>Площадь: {entity.area}</Text>
      <Text>Собственник: {entity.owner}</Text>
      <Text>Фактический пользователь: {entity.actualUser}</Text>
    </Paper>
  )
}

export default EntityHeader
