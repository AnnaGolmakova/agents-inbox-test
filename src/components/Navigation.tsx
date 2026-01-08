import Bell from 'lucide-solid/icons/bell'
import CalendarDays from 'lucide-solid/icons/calendar-days'
import ChartColumnBig from 'lucide-solid/icons/chart-column-big'
import Layers from 'lucide-solid/icons/layers'
import Settings from 'lucide-solid/icons/settings'
import Sun from 'lucide-solid/icons/sun'
import User from 'lucide-solid/icons/user'
import { NavButton } from './NavButton'

export function Navigation() {
  return (
    <aside class="fixed top-0 left-0 flex h-screen w-16 flex-col items-center py-6">
      <nav class="flex flex-1 flex-col items-center gap-2">
        <NavButton to="dashboard" label="Dashboard" icon={Sun} disabled />
        <NavButton to="/" label="Inbox" icon={Layers} />
        <NavButton
          to="calendar"
          label="Calendar"
          icon={CalendarDays}
          disabled
        />
        <NavButton to="stats" label="Stats" icon={ChartColumnBig} disabled />
      </nav>

      <div class="border-grey-92 flex flex-col items-center gap-2 border-t pt-3">
        <NavButton to="dashboard" label="Dashboard" icon={Bell} disabled />
        <NavButton to="dashboard" label="Dashboard" icon={Settings} disabled />
        <button
          disabled
          class="bg-grey-55 flex h-6 w-6 cursor-not-allowed items-center justify-center rounded-full text-white"
          title="Profile (Coming Soon)"
        >
          <User size={20} strokeWidth="1px" />
        </button>
      </div>
    </aside>
  )
}
