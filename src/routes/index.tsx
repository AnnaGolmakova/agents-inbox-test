import { createFileRoute } from '@tanstack/solid-router'
import InboxList from '../components/InboxList'
import { mockInboxItems } from '../mock/inboxItems'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <>
      <InboxList items={mockInboxItems} />
    </>
  )
}
