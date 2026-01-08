import { For } from 'solid-js'
import InboxItem from './InboxItem'

import type { Component } from 'solid-js'
import type { InboxItemType } from '../types/inbox'

interface InboxListProps {
  items: Array<InboxItemType>
  onItemClick?: (item: InboxItemType) => void
}

const InboxList: Component<InboxListProps> = (props) => {
  return (
    <div class="flex w-full max-w-3xl min-w-xs grow flex-col px-6 pb-24">
      <For each={props.items}>
        {(item) => (
          <div class="mb-3">
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
  )
}

export default InboxList
