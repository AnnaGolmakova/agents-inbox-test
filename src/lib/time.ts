export const formatTimeAgo = (timestamp: string) => {
  const now = new Date()
  const past = new Date(timestamp)
  const diffInMinutes = Math.floor(
    (now.getTime() - past.getTime()) / (1000 * 60),
  )

  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
  if (diffInMinutes < 100000) return `${Math.floor(diffInMinutes / 1440)}d ago`

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(past)
}
