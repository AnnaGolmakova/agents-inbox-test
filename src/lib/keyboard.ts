import { onCleanup, onMount } from 'solid-js'
import { isServer } from 'solid-js/web'

export interface KeyboardActions {
  onMoveDown?: () => void
  onMoveUp?: () => void
  onSelect?: () => void
  onClose?: () => void
}

export function useKeyboard(actions: KeyboardActions) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      return
    }

    switch (e.key) {
      case 'j':
        e.preventDefault()
        actions.onMoveDown?.()
        break
      case 'k':
        e.preventDefault()
        actions.onMoveUp?.()
        break
      case 'Enter':
        e.preventDefault()
        actions.onSelect?.()
        break
      case 'Escape':
        e.preventDefault()
        actions.onClose?.()
        break
    }
  }

  if (!isServer) {
    onMount(() => {
      window.addEventListener('keydown', handleKeyDown)
    })

    onCleanup(() => {
      window.removeEventListener('keydown', handleKeyDown)
    })
  }
}
