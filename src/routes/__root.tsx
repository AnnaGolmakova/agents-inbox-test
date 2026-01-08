import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/solid-router'
// import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'

import { HydrationScript } from 'solid-js/web'
import { Suspense } from 'solid-js'

import fontCss from 'beepsans/beep.css?url'
import styleCss from '../styles.css?url'

import { Navigation } from '../components/Navigation'
import DissolveFilter from '../components/DissolveFilter'

export const Route = createRootRouteWithContext()({
  head: () => ({
    links: [
      { rel: 'stylesheet', href: fontCss },
      { rel: 'stylesheet', href: styleCss },
    ],
  }),
  shellComponent: RootComponent,
})

function RootComponent() {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body class="bg-page text-secondary">
        <HeadContent />
        <DissolveFilter />
        <Suspense>
          <div class="flex min-h-screen">
            <Navigation />
            <main class="ml-16 flex grow flex-col items-center justify-center overflow-y-scroll p-8">
              <Outlet />
            </main>
          </div>
          {/*<TanStackRouterDevtools />*/}
        </Suspense>
        <Scripts />
      </body>
    </html>
  )
}
