import type { InboxItemType } from '../types/inbox'

export type DateGroup = 'Today' | 'Last 48h' | 'Last Week' | 'Earlier'

export interface GroupedInboxItems {
  group: DateGroup
  items: InboxItemType[]
}

/**
 * Get the date group for a given timestamp
 */
export function getDateGroup(dateString: string): DateGroup {
  const now = new Date()
  const itemDate = new Date(dateString)
  const diffMs = now.getTime() - itemDate.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)
  const diffDays = diffHours / 24

  // Today (last 24 hours)
  if (diffHours < 24) {
    return 'Today'
  }

  // Last 48h (24-48 hours ago)
  if (diffHours < 48) {
    return 'Last 48h'
  }

  // Last Week (2-7 days ago)
  if (diffDays < 7) {
    return 'Last Week'
  }

  // Earlier (more than 7 days ago)
  return 'Earlier'
}

/**
 * Group inbox items by date categories
 */
export function groupItemsByDate(items: InboxItemType[]): GroupedInboxItems[] {
  const groups = new Map<DateGroup, InboxItemType[]>()

  // Initialize all groups in order
  const groupOrder: DateGroup[] = ['Today', 'Last 48h', 'Last Week', 'Earlier']
  groupOrder.forEach((group) => groups.set(group, []))

  // Categorize items
  items.forEach((item) => {
    const group = getDateGroup(item.created_at)
    groups.get(group)?.push(item)
  })

  // Convert to array and filter out empty groups
  return groupOrder
    .map((group) => ({
      group,
      items: groups.get(group) || [],
    }))
    .filter((groupData) => groupData.items.length > 0)
}
