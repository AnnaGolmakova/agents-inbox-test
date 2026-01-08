import { createFileRoute } from '@tanstack/solid-router'
import EtherealTorus from '../components/EtherealTorus'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <>
      <EtherealTorus />
      <h1>Hello world!</h1>
    </>
  )
}
