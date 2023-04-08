import { Grid, Image, Title, Text } from "@mantine/core"

const EntityHeader = () => {
  return (
    <Grid gutter={64}>
      <Grid.Col span={4}>
        <Image
          alt=""
          src="https://img.freepik.com/premium-vector/real-estate-house-sign-drawing_753539-160.jpg"
        />
      </Grid.Col>
      <Grid.Col span={8}>
        <Title order={1} mb="xs">
          Адрес || ...
        </Title>
        <Text>Описание аттрибуты лалалала</Text>
      </Grid.Col>
    </Grid>
  )
}

export default EntityHeader
