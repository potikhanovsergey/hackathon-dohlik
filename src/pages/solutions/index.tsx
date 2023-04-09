import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Container, Title, Group } from "@mantine/core"
import SolutionsTable from "src/solutions/SolutionsTable"
import { useState } from "react"
import FilterAddButtons from "src/core/FilterAddButtons"
import { AdditionFiltersMock } from ".."

const SolutionsPage: BlitzPage = () => {
  return (
    <Layout title="Решения">
      <Container size="xl">
        <Title mb="md" sx={{ cursor: "pointer" }}>
          Решения
        </Title>
        <FilterAddButtons>{AdditionFiltersMock()}</FilterAddButtons>
        <SolutionsTable />
      </Container>
    </Layout>
  )
}

export default SolutionsPage
