export type InboxItemType = {
  id: string
  requester: { name: string; team: string; avatar?: string }
  subject: string
  summary: string
  status:
    | 'agent_working'
    | 'agent_resolved'
    | 'needs_clarification'
    | 'needs_approval'
    | 'agent_stuck'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  created_at: string
  agent_response?: string
}
