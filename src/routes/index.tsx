import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main class="min-h-screen">
      <h1>Hellow world!</h1>
    </main>
  )
}
