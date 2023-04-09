import { Grid, Image, Title, Text } from "@mantine/core"
import { Entity } from "@prisma/client"

const EntityHeader = ({ entity }: { entity: Entity }) => {
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
          {entity.district + " округ, " + entity.region + " р-н, " + entity.address}
        </Title>
        <Text>Тип: {entity.type}</Text>
        <Text>Состояние: {entity.state}</Text>
        <Text>Площадь: {entity.area}</Text>
        <Text>Собственник: {entity.owner}</Text>
        <Text>Фактический пользователь: {entity.actualUser}</Text>
      </Grid.Col>
    </Grid>
  )
}

export default EntityHeader
