import { createSignal } from 'solid-js'
import { createFileRoute } from '@tanstack/solid-router'
import InboxList from '../components/InboxList'
import ChatInput from '../components/ChatInput'
import EtherealTorus from '../components/EtherealTorus'
import { mockInboxItems } from '../mock/inboxItems'

export const Route = createFileRoute('/')({ component: App })

type TabType = 'needs-you' | 'ai-handling'

function App() {
  const [items, setItems] = createSignal(mockInboxItems)
  const [aiHandlingItems, setAiHandlingItems] = createSignal<
    typeof mockInboxItems
  >([])
  const [activeTab, setActiveTab] = createSignal<TabType>('needs-you')

  const handleDeleteItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const handleDeleteAiItem = (itemId: string) => {
    setAiHandlingItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  return (
    <>
      <div class="flex w-full max-w-3xl min-w-xs flex-col px-6 pt-6">
        <div class="border-grey-90 mb-6 flex gap-2 border-b">
          <button
            class="relative px-4 pb-3 text-sm font-semibold transition-colors"
            classList={{
              'text-primary': activeTab() === 'needs-you',
              'text-grey-47 hover:text-primary': activeTab() !== 'needs-you',
            }}
            onClick={() => setActiveTab('needs-you')}
          >
            <span class="flex items-center gap-2">
              Needs You
              <span
                class="flex min-w-[24px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium"
                classList={{
                  'bg-orange-flash text-white': activeTab() === 'needs-you',
                  'bg-grey-90 text-grey-47': activeTab() !== 'needs-you',
                }}
              >
                {items().length}
              </span>
            </span>
            {activeTab() === 'needs-you' && (
              <div class="bg-orange-flash absolute right-0 bottom-0 left-0 h-0.5" />
            )}
          </button>
          <button
            class="relative px-4 pb-3 text-sm font-semibold transition-colors"
            classList={{
              'text-primary': activeTab() === 'ai-handling',
              'text-grey-47 hover:text-primary': activeTab() !== 'ai-handling',
            }}
            onClick={() => setActiveTab('ai-handling')}
          >
            <span class="flex items-center gap-2">
              AI Handling
              <span
                class="flex min-w-[24px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium"
                classList={{
                  'bg-orange-flash text-white': activeTab() === 'ai-handling',
                  'bg-grey-90 text-grey-47': activeTab() !== 'ai-handling',
                }}
              >
                {aiHandlingItems().length}
              </span>
            </span>
            {activeTab() === 'ai-handling' && (
              <div class="bg-orange-flash absolute right-0 bottom-0 left-0 h-0.5" />
            )}
          </button>
        </div>
      </div>

      {activeTab() === 'needs-you' && (
        <InboxList items={items()} onDeleteItem={handleDeleteItem} />
      )}

      {activeTab() === 'ai-handling' && (
        <>
          {aiHandlingItems().length === 0 ? (
            <div class="flex w-full max-w-3xl min-w-xs grow flex-col items-center justify-center px-6 pb-24">
              <EtherealTorus />
              <p class="text-grey-47 mt-6 text-sm">
                No items being handled by AI
              </p>
            </div>
          ) : (
            <InboxList
              items={aiHandlingItems()}
              onDeleteItem={handleDeleteAiItem}
            />
          )}
        </>
      )}

      <div class="from-page to-page/0 fixed right-0 bottom-0 left-16 transform bg-linear-to-t pb-5">
        <ChatInput />
      </div>
    </>
  )
}
