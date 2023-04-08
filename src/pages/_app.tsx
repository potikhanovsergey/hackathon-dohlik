import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import { withBlitz } from "src/blitz-client"
import { MantineProvider } from "@mantine/core"
import theme from "src/theme"
import { ModalsProvider } from "@mantine/modals"
import RouterTransition from "src/core/layouts/RouterTransition"
import { YMaps } from "@pbe/react-yandex-maps"
import "dayjs/locale/ru"
import dayjs from "dayjs"
dayjs.locale("ru")

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <YMaps>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <ModalsProvider>
            <RouterTransition />
            {getLayout(<Component {...pageProps} />)}
          </ModalsProvider>
        </MantineProvider>
      </YMaps>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
