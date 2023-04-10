import { Routes } from "@blitzjs/next"
import { Grid, Paper, Stack, Text, Group, Button, Badge } from "@mantine/core"
import { openConfirmModal } from "@mantine/modals"
import dayjs from "dayjs"
import Link from "src/core/Link"
import { ExtendedSolution } from "src/pages/solutions/[id]"

const SolutionCard = ({ solution }: { solution: ExtendedSolution }) => {
  const openConfirmDeleteModal = () =>
    openConfirmModal({
      title: "Пожалуйста, подтвердите свое действие",
      children: (
        <Text size="sm">
          Пожалуйста, подвтердите, что вы хотите удалить решение. Это действия необратимо.
        </Text>
      ),
      centered: true,
      confirmProps: { color: "red" },
      labels: { confirm: "Удалить", cancel: "Отмена" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    })

  return (
    <>
      <Group position="apart" align="center" mb="md">
        <Text>Дата создания решения: {dayjs(solution.createdAt).format("D MMMM YYYY")}</Text>
        <Button color="red" onClick={openConfirmDeleteModal}>
          Удалить решение
        </Button>
      </Group>
      <Paper withBorder>
        <Group position="apart" align="flex-start">
          <div>
            <Text size="md" weight="bold">
              Формулировка
            </Text>
            <Text mb="md">{solution.name}</Text>
          </div>
          <div>
            <Stack spacing={0}>
              <Text size="md" weight="bold">
                Срок исполнения
              </Text>
              <Text mb="md">23.32.2342</Text>
              <Link href={Routes.ProfilePage()} w="fit-content" target="_blank">
                Группа
              </Link>
              <Link
                href={Routes.EntityPage({ id: solution.entityId })}
                w="fit-content"
                target="_blank"
              >
                Объект
              </Link>
              {solution.protocolId && (
                <Link
                  href={Routes.ProtocolPage({ id: solution.protocolId })}
                  w="fit-content"
                  target="_blank"
                >
                  Протокол
                </Link>
              )}
            </Stack>
          </div>
          <div>
            <Badge color="orange" size="xl">
              2/6 поручений завершено
            </Badge>
          </div>
        </Group>
      </Paper>
    </>
  )
}

export default SolutionCard
