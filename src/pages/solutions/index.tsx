import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, Title, Group } from "@mantine/core"
import SolutionsTable from "src/solutions/SolutionsTable"
import { useState } from "react"

const SolutionsPage: BlitzPage = () => {
  const [page, setPage] = useState<"решения" | "поручения">("решения")

  return (
    <Layout title="Решения">
      <Container size="xl">
        <Group noWrap>
          <Title
            mb="md"
            onClick={() => setPage("решения")}
            color={page === "поручения" ? "dimmed" : undefined}
            sx={{ cursor: "pointer" }}
          >
            Решения
          </Title>
          <Title
            mb="md"
            onClick={() => setPage("поручения")}
            color={page === "решения" ? "dimmed" : undefined}
            sx={{ cursor: "pointer" }}
          >
            Поручения
          </Title>
        </Group>
        {page === "решения" ? <SolutionsTable /> : <SolutionsTable />}
      </Container>
    </Layout>
  )
}

export default SolutionsPage
