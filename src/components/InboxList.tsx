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
    <div class="flex w-full max-w-3xl min-w-xs grow flex-col gap-3 overflow-hidden px-6">
      <For each={props.items}>
        {(item) => (
          <InboxItem
            item={item}
            onClick={() => props.onItemClick?.(item)}
            isExpanded={Math.random() > 0.5}
            actions={[
              { label: 'Approve Contract', isPrimary: true, onClick: () => {} },
              { label: 'Find alternatives', onClick: () => {} },
            ]}
          />
        )}
      </For>
    </div>
  )
}

export default InboxList
