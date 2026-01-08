import { createSignal } from 'solid-js'
import { createFileRoute } from '@tanstack/solid-router'
import InboxList from '../components/InboxList'
import ChatInput from '../components/ChatInput'
import { mockInboxItems } from '../mock/inboxItems'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [items, setItems] = createSignal(mockInboxItems)

  const handleDeleteItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  return (
    <>
      <InboxList items={items()} onDeleteItem={handleDeleteItem} />
      <div class="from-page to-page/0 fixed right-0 bottom-0 left-16 transform bg-linear-to-t pb-5">
        <ChatInput />
      </div>
    </>
  )
}
