// import Head from 'next/head'
// import {ErrorComponent, Routes} from "@blitzjs/next"

// // ------------------------------------------------------
// // This page is rendered if a route match is not found
// // ------------------------------------------------------
// export default function Page404() {
//   const statusCode = 404
//   const title = "This page could not be found"
//   return (
//     <>
//       <Head>
//         <title>
//           {statusCode}: {title}
//         </title>
//       </Head>
//       <ErrorComponent statusCode={statusCode} title={title} />
//     </>
//   )
// }

import { Routes } from "@blitzjs/next"
import { createStyles, Title, Text, Button, Container, Group, rem } from "@mantine/core"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"

const useStyles = createStyles((theme) => ({
  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}))

export default function Page404() {
  const { classes } = useStyles()

  return (
    <Layout title="404">
      <Container>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>You have found a secret place.</Title>
        <Text color="dimmed" size="lg" align="center" className={classes.description}>
          Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
          been moved to another URL.
        </Text>
        <Group position="center">
          <Button variant="subtle" size="md" component={Link} href={Routes.EntitiesPage()}>
            Take me back to home page
          </Button>
        </Group>
      </Container>
    </Layout>
  )
}
