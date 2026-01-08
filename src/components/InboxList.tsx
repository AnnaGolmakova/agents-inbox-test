import { For, createMemo } from 'solid-js'
import { groupItemsByDate } from '../lib/date'
import InboxItem from './InboxItem'

import type { Component } from 'solid-js'
import type { InboxItemType } from '../types/inbox'

interface InboxListProps {
  items: Array<InboxItemType>
  onItemClick?: (item: InboxItemType) => void
}

const InboxList: Component<InboxListProps> = (props) => {
  const groupedItems = createMemo(() => groupItemsByDate(props.items))

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
              {(item) => (
                <div class="group mb-3">
                  <InboxItem
                    item={item}
                    onClick={() => props.onItemClick?.(item)}
                    isExpanded={true}
                    actions={[
                      {
                        label: 'Approve Contract',
                        isPrimary: true,
                        onClick: () => {},
                      },
                      { label: 'Find alternatives', onClick: () => {} },
                    ]}
                  />
                </div>
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  )
}

export default InboxList
