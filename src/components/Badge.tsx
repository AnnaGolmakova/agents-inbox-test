import type { Component } from 'solid-js'

interface BadgeProps {
  label: string
  type?: 'default' | 'success' | 'error'
}

const Badge: Component<BadgeProps> = (props) => {
  const badgeStyles = () => {
    switch (props.type) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'error':
        return 'bg-orange-light text-orange-dark'
      case 'default':
      default:
        return 'bg-grey-94 text-grey-47'
    }
  }

  return (
    <span
      class={`inline-flex h-5 items-center rounded-sm px-1 text-xs font-medium ${badgeStyles()}`}
    >
      {props.label}
    </span>
  )
}

export default Badge
