import ArrowUp from 'lucide-solid/icons/arrow-up'
import Mic from 'lucide-solid/icons/mic'
import Plus from 'lucide-solid/icons/plus'
import { createSignal, createUniqueId, Show } from 'solid-js'
import type { Component } from 'solid-js'

interface ChatAction {
  icon: string
  label: string
  onClick: () => void
}

interface ChatInputProps {
  placeholder?: string
  onSubmit?: (value: string) => void
  actions?: Array<ChatAction>
  showActionsHint?: boolean
  onDismissHint?: () => void
}

const ChatInput: Component<ChatInputProps> = (props) => {
  const [value, setValue] = createSignal('')
  const [isFocused, setIsFocused] = createSignal(false)

  const id = createUniqueId()

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    const inputValue = value().trim()
    if (inputValue && props.onSubmit) {
      props.onSubmit(inputValue)
    }
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div
      class="m-auto box-border w-full max-w-3xl px-24 ease-out has-focus:px-6"
      style="interpolate-size: allow-keywords; transition: padding ease-out 0.15s 0.05s;"
    >
      <form onSubmit={handleSubmit} class="relative">
        <div
          class="flex items-center gap-3 rounded-xl border border-[rgba(171,166,159,0.6)] bg-white p-3 shadow-[0_4px_12px_rgba(56,47,32,0.16)] transition-shadow hover:shadow-[0_6px_16px_rgba(56,47,32,0.20)]"
          classList={{
            'shadow-lg': isFocused(),
          }}
        >
          <button
            type="button"
            class="text-grey-16 hover:bg-grey-94 hover:border-grey-90 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-transparent bg-transparent transition-colors"
            aria-label="Add attachment"
          >
            <Plus />
          </button>

          <input
            id={'input' + id}
            type="text"
            value={value()}
            onInput={(e) => setValue(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={
              props.placeholder || '/Command, Reply, ask for more info...'
            }
            class="text-primary placeholder:text-grey-16/40 flex-1 bg-transparent text-base outline-none"
          />
          <label for={'input' + id} class="sr-only">
            Agent instructions
          </label>

          <button
            type="button"
            class="text-grey-16/40 hover:text-primary flex h-6 w-6 shrink-0 items-center justify-center transition-colors"
            aria-label="Voice input"
          >
            <Mic size={18} />
          </button>
          <Show when={value() !== ''}>
            <button
              type="submit"
              class="bg-orange-flash hover:bg-orange-dark flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-transparent text-white transition-colors"
              aria-label="Add attachment"
            >
              <ArrowUp size={20} />
            </button>
          </Show>
        </div>
      </form>
    </div>
  )
}

export default ChatInput
