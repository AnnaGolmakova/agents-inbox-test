import { Link } from '@tanstack/solid-router'
import { Show } from 'solid-js'
import { Dynamic } from 'solid-js/web'

import type { LucideIcon } from 'lucide-solid'
import type { Component, JSX } from 'solid-js'

interface NavButtonProps {
  to: string
  disabled?: boolean
  label: string
  icon?: LucideIcon
  children?: JSX.Element
  class?: string
}

export const NavButton: Component<NavButtonProps> = (props) => {
  return (
    <Link
      to={props.to}
      class={
        'text-grey-61 hover:text-grey-16 flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white'
      }
      activeProps={{
        class: 'bg-grey-90 data-[status="active"]:text-grey-16',
      }}
      title={props.label}
      aria-label={props.label}
      disabled={props.disabled}
    >
      <Show when={props.icon} fallback={props.children}>
        <Dynamic component={props.icon} size={18} />
      </Show>
    </Link>
  )
}
