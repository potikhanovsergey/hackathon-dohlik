import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, Title, Group, Button } from "@mantine/core"
import SolutionsTable from "src/solutions/SolutionsTable"
import { useState } from "react"
import FilterAddButtons from "src/core/FilterAddButtons"
import { AdditionFiltersMock } from ".."
import SolutionForm from "src/solutions/SolutionFrom"
import { openModal } from "@mantine/modals"
import getSolutions from "src/solutions/queries/getSolutions"
import { useQuery } from "@blitzjs/rpc"

const SolutionsPage: BlitzPage = () => {
  const openAddSolutionModal = () =>
    openModal({
      title: "Добавить решение",
      children: <SolutionForm />,
      centered: true,
    })

  const [solutions] = useQuery(getSolutions, {})

  return (
    <Layout title="Решения">
      <Container size="xl">
        <Group position="apart" mb="xl">
          <Title sx={{ cursor: "pointer" }}>Решения</Title>
          <Button size="sm" onClick={openAddSolutionModal}>
            Добавить решение
          </Button>
        </Group>
        <SolutionsTable solutions={solutions} />
      </Container>
    </Layout>
  )
}

export default SolutionsPage
