import type { InboxItemType } from '../types/inbox'

export const mockInboxItems: Array<InboxItemType> = [
  {
    id: '1',
    requester: {
      name: 'Sarah Chen',
      team: 'Product',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    subject: 'Update user authentication flow',
    summary:
      'Need to implement OAuth 2.0 for the login system and deprecate the old username/password flow',
    status: 'agent_working',
    priority: 'high',
    created_at: '2024-01-15T10:30:00Z',
    agent_response:
      "I've analyzed the current authentication system and started implementing OAuth 2.0. Currently setting up the provider configurations.",
  },
  {
    id: '2',
    requester: {
      name: 'Marcus Rodriguez',
      team: 'Engineering',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    subject: 'Fix memory leak in data processing service',
    summary:
      'The data processing service is consuming excessive memory over time, causing crashes after ~6 hours of operation',
    status: 'agent_resolved',
    priority: 'urgent',
    created_at: '2024-01-14T14:22:00Z',
    agent_response:
      'Identified the memory leak in the event listener cleanup. Fixed by properly removing listeners and implementing WeakMap for cache. Deployed to production.',
  },
  {
    id: '3',
    requester: {
      name: 'Emily Watson',
      team: 'Design',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    subject: 'Implement new dashboard layout',
    summary:
      'Create a responsive dashboard layout based on the new design system specifications',
    status: 'needs_clarification',
    priority: 'medium',
    created_at: '2024-01-15T09:15:00Z',
    agent_response:
      "I've reviewed the design specs, but there are conflicting requirements for mobile breakpoints. Should tablets use the mobile or desktop layout?",
  },
  {
    id: '4',
    requester: {
      name: 'David Kim',
      team: 'Operations',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    subject: 'Automate deployment pipeline',
    summary:
      'Set up CI/CD pipeline with automated testing, security scanning, and staged deployments',
    status: 'needs_approval',
    priority: 'high',
    created_at: '2024-01-13T16:45:00Z',
    agent_response:
      'Pipeline is configured with GitHub Actions, including unit tests, integration tests, and security scans. Ready for approval to deploy to staging.',
  },
  {
    id: '5',
    requester: {
      name: 'Jessica Park',
      team: 'Data Science',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    subject: 'Optimize database queries for analytics',
    summary:
      'Several analytics queries are timing out and need optimization for large datasets',
    status: 'agent_stuck',
    priority: 'high',
    created_at: '2024-01-15T08:00:00Z',
    agent_response:
      'Added indexes and rewrote queries, but performance is still below target. The issue might require database schema changes that need architectural review.',
  },
  {
    id: '6',
    requester: {
      name: 'Alex Thompson',
      team: 'Marketing',
      avatar: 'https://i.pravatar.cc/150?img=15',
    },
    subject: 'Add analytics tracking to landing pages',
    summary:
      'Integrate Google Analytics 4 and custom event tracking for all marketing landing pages',
    status: 'agent_working',
    priority: 'medium',
    created_at: '2024-01-15T11:20:00Z',
    agent_response:
      'GA4 tag installed on all pages. Currently implementing custom events for button clicks and form submissions.',
  },
  {
    id: '7',
    requester: {
      name: 'Rachel Green',
      team: 'Customer Success',
      avatar: 'https://i.pravatar.cc/150?img=20',
    },
    subject: 'Create customer onboarding flow',
    summary:
      'Build an interactive onboarding experience for new users with guided tours and tooltips',
    status: 'agent_resolved',
    priority: 'medium',
    created_at: '2024-01-12T13:30:00Z',
    agent_response:
      'Onboarding flow completed with 5 steps, tooltips, progress indicator, and skip functionality. All tests passing.',
  },
  {
    id: '8',
    requester: {
      name: 'Tom Mitchell',
      team: 'Security',
      avatar: 'https://i.pravatar.cc/150?img=33',
    },
    subject: 'Implement rate limiting for API endpoints',
    summary:
      'Add rate limiting to prevent API abuse and DDoS attacks on public endpoints',
    status: 'needs_approval',
    priority: 'urgent',
    created_at: '2024-01-15T07:45:00Z',
    agent_response:
      'Implemented Redis-based rate limiting with configurable rules per endpoint. Tested with load testing tools. Ready for production deployment approval.',
  },
  {
    id: '9',
    requester: {
      name: 'Lisa Anderson',
      team: 'Product',
      avatar: 'https://i.pravatar.cc/150?img=25',
    },
    subject: 'Add dark mode support',
    summary:
      'Implement dark mode theme across the entire application with user preference persistence',
    status: 'agent_working',
    priority: 'low',
    created_at: '2024-01-14T15:10:00Z',
    agent_response:
      'Created dark mode color palette and implementing theme switcher. About 60% of components updated so far.',
  },
  {
    id: '10',
    requester: {
      name: 'Chris Johnson',
      team: 'Engineering',
      avatar: 'https://i.pravatar.cc/150?img=13',
    },
    subject: 'Migrate to new cloud provider',
    summary:
      'Plan and execute migration from AWS to GCP for better performance and cost optimization',
    status: 'needs_clarification',
    priority: 'high',
    created_at: '2024-01-15T06:30:00Z',
    agent_response:
      'Created migration plan and cost analysis. Need clarification on database migration strategy - should we use a gradual migration or big bang approach?',
  },
  {
    id: '11',
    requester: {
      name: 'Nina Patel',
      team: 'Design',
      avatar: 'https://i.pravatar.cc/150?img=45',
    },
    subject: 'Refactor component library',
    summary:
      'Update component library to use new design tokens and improve accessibility compliance',
    status: 'agent_working',
    priority: 'medium',
    created_at: '2024-01-13T12:00:00Z',
    agent_response:
      'Design tokens extracted and applied to button, input, and card components. Working on form components next.',
  },
  {
    id: '12',
    requester: {
      name: 'James Wilson',
      team: 'Operations',
      avatar: 'https://i.pravatar.cc/150?img=51',
    },
    subject: 'Set up monitoring and alerting',
    summary:
      'Configure comprehensive monitoring for all services with intelligent alerting to reduce noise',
    status: 'agent_resolved',
    priority: 'high',
    created_at: '2024-01-11T09:20:00Z',
    agent_response:
      'Datadog monitoring configured with custom dashboards and alert rules. Integrated with Slack and PagerDuty.',
  },
]
