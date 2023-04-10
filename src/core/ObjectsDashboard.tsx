import { Paper, RingProgress, Group, Text, Title, Progress } from "@mantine/core"

const Overview = () => {
  return (
    <Paper withBorder mb="xl">
      <Title mb="xl">Дашборд</Title>
      <Group>
        <RingProgress
          size={170}
          thickness={16}
          label={
            <Text size="xs" align="center" px="xs" sx={{ pointerEvents: "none" }}>
              Статусы повесток
            </Text>
          }
          sections={[
            { value: 40, color: "blue", tooltip: "Новые — 40" },
            { value: 25, color: "orange", tooltip: "В работе — 25" },
            { value: 15, color: "green", tooltip: "Завершенные — 15" },
          ]}
        />
        <RingProgress
          size={170}
          thickness={16}
          label={
            <Text size="xs" align="center" px="xs" sx={{ pointerEvents: "none" }}>
              Статусы поручений
            </Text>
          }
          sections={[
            { value: 33, color: "teal", tooltip: "Новые — 40" },
            { value: 17, color: "violet", tooltip: "В работе — 25" },
            { value: 28, color: "green", tooltip: "Завершенные — 15" },
            { value: 6, color: "red", tooltip: "Просроченные — 15" },
          ]}
        />
      </Group>
      <Progress
        radius="xl"
        size={24}
        styles={{
          root: {
            width: "100%",
          },
        }}
        sections={[
          { value: 50, color: "pink", label: "Жилой дом", tooltip: "Жилой дом — 33" },
          { value: 25, color: "grape", label: "Общежитие", tooltip: "Общежитие — 28" },
          { value: 25, color: "violet", label: "Самострой", tooltip: "Самострой — 25" },
        ]}
      />
    </Paper>
  )
}

export default Overview
