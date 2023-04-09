import { Grid, Paper, Stack, Text, Group, Button, Badge } from "@mantine/core"
import { openConfirmModal } from "@mantine/modals"
import Link from "src/core/Link"

const SolutionCard = () => {
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
        <Text>Дата создания решения: 18.22.3234</Text>
        <Button color="red" onClick={openConfirmDeleteModal}>
          Удалить решение
        </Button>
      </Group>
      <Paper withBorder>
        <Grid columns={12} gutter="xl">
          <Grid.Col span={9}>
            <Stack spacing={0}>
              <Text size="md" weight="bold">
                Формулировка
              </Text>
              <Text mb="md">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas vel odio dolorum
                repudiandae iste explicabo corporis architecto optio incidunt autem?
              </Text>
              <Text size="md" weight="bold">
                Добавленное поле
              </Text>
              <Text mb="md">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas vel odio dolorum
                repudiandae iste explicabo corporis architecto optio incidunt autem?
              </Text>
              <Text size="md" weight="bold">
                Добавленное поле
              </Text>
              <Text mb="md">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas vel odio dolorum
                repudiandae iste explicabo corporis architecto optio incidunt autem?
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={2}>
            <Stack spacing={0}>
              <Text size="md" weight="bold">
                Срок исполнения
              </Text>
              <Text mb="md">23.32.2342</Text>
              <Link href="lkdsjflsk" w="fit-content" target="_blank">
                Группа
              </Link>
              <Link href="lkdsjflsk" w="fit-content" target="_blank">
                Объект
              </Link>
              <Link href="lkdsjflsk" w="fit-content" target="_blank">
                Протокол
              </Link>
            </Stack>
          </Grid.Col>
          <Grid.Col span={1}>
            <Badge color="yellow" size="xl">
              2/6
            </Badge>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  )
}

export default SolutionCard
