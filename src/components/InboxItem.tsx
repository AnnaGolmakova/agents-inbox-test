import { For, Show } from 'solid-js'
import { formatTimeAgo } from '../lib/time'
import Badge from './Badge'
import { getDissolveFilter } from './DissolveFilter'

import type { Component } from 'solid-js'
import type { InboxItemType } from '../types/inbox'

interface InboxItemProps {
  item: InboxItemType
  isExpanded?: boolean
  actions?: Array<InboxItemAction>
  onClick?: () => void
}

interface InboxItemAction {
  label: string
  isPrimary?: boolean
  onClick: () => void
}

const InboxItem: Component<InboxItemProps> = (props) => {
  let itemRef!: HTMLDivElement

  const getPriorityBadge = () => {
    switch (props.item.priority) {
      case 'urgent':
        return <Badge label="Emergency" type="error" />
      case 'high':
        return <Badge label="High" type="error" />
      case 'medium':
        return <Badge label="Medium" />
    }
  }

  const getAvatarContent = () => {
    if (props.item.requester.avatar) {
      return (
        <img
          src={props.item.requester.avatar}
          alt={props.item.requester.name}
          class="h-full w-full object-cover"
        />
      )
    }
    return (
      <div class="bg-grey-87 text-grey-47 flex h-full w-full items-center justify-center text-lg font-medium">
        {props.item.requester.name.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <div
      ref={itemRef}
      class="flex h-14 cursor-pointer items-start gap-3 overflow-hidden rounded-xl bg-white p-3 shadow-sm group-hover:h-max group-data-[open=true]:h-max has-focus:h-max"
      style="interpolate-size: allow-keywords; transition: height ease-out 0.25s 0.1s;"
      onClick={() => props.onClick?.()}
    >
      <div class="h-8 w-8 shrink-0 overflow-hidden rounded-lg inset-shadow-2xs/50">
        {getAvatarContent()}
      </div>

      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-baseline gap-2">
            <h3 class="text-primary text-xs font-semibold">
              {props.item.requester.name}
            </h3>
            <span class="text-secondary text-xs">
              {props.item.requester.team}
            </span>
            <span class="text-secondary text-xs">•</span>
            <span class="text-secondary text-xs">
              {formatTimeAgo(props.item.created_at)}
            </span>
          </div>
          <div class="flex shrink-0 items-center gap-2 text-[10px]">
            <Show when={props.item.priority !== 'low'}>
              {getPriorityBadge()}
            </Show>
          </div>
        </div>

        <p class="text-primary text-xs font-normal">{props.item.subject}</p>

        <Show when={props.isExpanded}>
          <p class="text-secondary mt-2 text-xs font-normal">
            {props.item.summary}
          </p>
          <Show when={props.actions}>
            <div class="flex flex-row gap-2">
              <For each={props.actions}>
                {(item) => (
                  <button
                    class="focus-within:outline-orange-flash mt-2 h-6 rounded-md px-4 text-[11px] transition-colors focus-within:outline-2 focus-within:outline-offset-1"
                    classList={{
                      'bg-white text-primary font-medium border border-grey-87 hover:bg-grey-94':
                        !item.isPrimary,
                      'bg-orange-flash text-white font-semibold hover:bg-orange-dark':
                        item.isPrimary,
                    }}
                    onClick={() => {
                      if (item.isPrimary) {
                        const dissolveFilter = getDissolveFilter()
                        if (dissolveFilter) {
                          dissolveFilter.dissolve(itemRef, () => {
                            item.onClick()
                          })
                        } else {
                          item.onClick()
                        }
                      } else {
                        item.onClick()
                      }
                    }}
                  >
                    {item.label}
                  </button>
                )}
              </For>
            </div>
          </Show>
        </Show>
      </div>
    </div>
  )
}

export default InboxItem
