import { For, createMemo, createSignal } from 'solid-js'
import { groupItemsByDate } from '../lib/date'
import { useKeyboard } from '../lib/keyboard'
import InboxItem from './InboxItem'

import type { Component } from 'solid-js'
import type { InboxItemType } from '../types/inbox'

interface InboxListProps {
  items: Array<InboxItemType>
  onItemClick?: (item: InboxItemType) => void
  onDeleteItem?: (itemId: string) => void
}

const InboxList: Component<InboxListProps> = (props) => {
  const groupedItems = createMemo(() => groupItemsByDate(props.items))
  const [selectedItemId, setSelectedItemId] = createSignal<string | null>(null)
  const itemRefs: Map<string, HTMLDivElement> = new Map()

  const flatItems = createMemo(() => {
    return groupedItems().flatMap((group) => group.items)
  })

  const handleNext = () => {
    if (flatItems().length === 0) return
    if (selectedItemId() === null) {
      setSelectedItemId(flatItems()[0].id)
      return
    }

    const index = flatItems().findIndex((item) => item.id === selectedItemId())
    if (index === -1) return

    const nextIndex = Math.min(index + 1, flatItems().length - 1)
    const nextItemId = flatItems()[nextIndex].id

    setSelectedItemId(nextItemId)
    scrollToItem(nextItemId)
  }

  const handleMoveUp = () => {
    const items = flatItems()
    const currentId = selectedItemId()
    if (!currentId || items.length === 0) return

    const currentIndex = items.findIndex((item) => item.id === currentId)
    if (currentIndex === -1) return

    const prevIndex = Math.max(currentIndex - 1, 0)
    const prevItemId = items[prevIndex].id

    setSelectedItemId(prevItemId)
    scrollToItem(prevItemId)
  }

  const handleClose = () => {
    setSelectedItemId(null)
  }

  const handleBlur = () => {
    setSelectedItemId(null)
  }

  const scrollToItem = (itemId: string) => {
    setTimeout(() => {
      const element = itemRefs.get(itemId)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }, 0)
  }

  useKeyboard({
    onMoveDown: handleNext,
    onMoveUp: handleMoveUp,
    onClose: handleClose,
  })

  return (
    <div class="flex w-full max-w-3xl min-w-xs grow flex-col px-6 pb-24">
      <For each={groupedItems()}>
        {(groupData) => (
          <div class="mb-6">
            <h2 class="text-primary mb-3 flex items-center gap-1.5 text-sm font-semibold tracking-wide">
              <span>{groupData.group}</span>
              <span class="bg-grey-90 text-grey-47 flex items-center justify-center rounded-full px-1 text-xs font-medium">
                {groupData.items.length}
              </span>
            </h2>
            <For each={groupData.items}>
              {(item) => {
                return (
                  <div
                    ref={(el) => itemRefs.set(item.id, el)}
                    class="group mb-3"
                    classList={{
                      'ring-2 ring-orange-flash ring-offset-2 rounded-xl':
                        selectedItemId() === item.id,
                    }}
                    data-open={selectedItemId() === item.id}
                    onFocusOut={() => handleBlur()}
                  >
                    <InboxItem
                      item={item}
                      onClick={() => props.onItemClick?.(item)}
                      isExpanded={true}
                      actions={[
                        {
                          label: 'Approve Contract',
                          isPrimary: true,
                          onClick: () => {
                            props.onDeleteItem?.(item.id)
                          },
                        },
                        { label: 'Find alternatives', onClick: () => {} },
                      ]}
                    />
                  </div>
                )
              }}
            </For>
          </div>
        )}
      </For>
    </div>
  )
}

export default InboxList
