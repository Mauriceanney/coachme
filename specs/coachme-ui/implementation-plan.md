# Implementation Plan: CoachMe UI

## Overview
**Complexity**: XL (120+ components, 48+ pages)

This plan implements UI components for a fitness coaching platform with three user interfaces: Admin, Coach, and Member. All components use mock data - no backend logic.

---

## Phase 1: Foundation Setup & Shared Components

### Goal
Install dependencies and create reusable components used across all interfaces.

### Tasks

- [ ] Install required shadcn/ui components
- [ ] Install NPM dependencies
- [ ] Create app shell layout with sidebar
- [ ] Create role-based sidebar navigation
- [ ] Create page header component
- [ ] Create breadcrumb navigation
- [ ] Create dashboard grid layout
- [ ] Create stat card component
- [ ] Create data table with all sub-components
- [ ] Create chart components (line, bar, area, radial)
- [ ] Create form components (search, date picker, file uploads)
- [ ] Create feedback components (empty, loading, error states)

### Technical Details

**Install shadcn components:**
```bash
pnpm dlx shadcn@latest add sidebar chart calendar form select command popover sheet scroll-area tooltip slider checkbox radio-group
```

**Install NPM packages:**
```bash
pnpm add @tanstack/react-table react-hook-form @hookform/resolvers date-fns framer-motion react-dropzone react-player
```

**App Shell Structure** (`src/components/layout/app-shell.tsx`):
```tsx
interface AppShellProps {
  role: 'admin' | 'coach' | 'member';
  children: React.ReactNode;
}

export function AppShell({ role, children }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <RoleSidebar role={role} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
```

**Data Table Structure** (`src/components/data-table/data-table.tsx`):
```tsx
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  filterColumns?: string[];
}
```

**Files to create:**
- `src/components/layout/app-shell.tsx`
- `src/components/layout/role-sidebar.tsx`
- `src/components/layout/sidebar-nav.tsx`
- `src/components/layout/mobile-nav.tsx`
- `src/components/layout/page-header.tsx`
- `src/components/layout/breadcrumb-nav.tsx`
- `src/components/layout/dashboard-grid.tsx`
- `src/components/layout/stat-card.tsx`
- `src/components/data-table/data-table.tsx`
- `src/components/data-table/data-table-toolbar.tsx`
- `src/components/data-table/data-table-pagination.tsx`
- `src/components/data-table/data-table-column-header.tsx`
- `src/components/data-table/data-table-row-actions.tsx`
- `src/components/data-table/data-table-faceted-filter.tsx`
- `src/components/charts/line-chart.tsx`
- `src/components/charts/bar-chart.tsx`
- `src/components/charts/area-chart.tsx`
- `src/components/charts/radial-chart.tsx`
- `src/components/charts/stat-comparison.tsx`
- `src/components/forms/form-field.tsx`
- `src/components/forms/search-input.tsx`
- `src/components/forms/date-range-picker.tsx`
- `src/components/forms/file-upload.tsx`
- `src/components/forms/image-upload.tsx`
- `src/components/forms/video-upload.tsx`
- `src/components/forms/rich-text-editor.tsx`
- `src/components/forms/tag-input.tsx`
- `src/components/feedback/empty-state.tsx`
- `src/components/feedback/loading-state.tsx`
- `src/components/feedback/error-state.tsx`
- `src/components/feedback/confirmation-dialog.tsx`
- `src/components/feedback/notification-center.tsx`

---

## Phase 2: Gamification Components

### Goal
Create custom-branded gamification UI components with animations.

### Tasks

- [ ] Create badge card component with tier styling
- [ ] Create badge grid layout
- [ ] Create badge unlock modal with animation
- [ ] Create badge progress indicator
- [ ] Create animated points counter
- [ ] Create points history list
- [ ] Create level indicator with XP bar
- [ ] Create leaderboard table component
- [ ] Create compact leaderboard card (top 3)
- [ ] Create rank badge component
- [ ] Create challenge card component
- [ ] Create challenge progress tracker
- [ ] Create challenge countdown timer
- [ ] Create active challenges grid
- [ ] Create streak counter with flame icon
- [ ] Create streak calendar view
- [ ] Create streak milestone celebration

### Technical Details

**Badge Card Props:**
```tsx
interface BadgeCardProps {
  badge: {
    id: string;
    name: string;
    description: string;
    icon: string;
    tier: 'bronze' | 'silver' | 'gold' | 'platinum';
    category: 'workout' | 'nutrition' | 'consistency' | 'social';
    unlockedAt?: Date;
    progress?: number;
  };
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
}
```

**Challenge Card Props:**
```tsx
interface ChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    type: 'individual' | 'team' | 'community';
    category: 'workout' | 'nutrition' | 'steps' | 'custom';
    startDate: Date;
    endDate: Date;
    goal: number;
    currentProgress: number;
    participants: number;
    rewards: { points: number; badge?: string };
    status: 'upcoming' | 'active' | 'completed';
  };
}
```

**Files to create:**
- `src/components/gamification/badge-card.tsx`
- `src/components/gamification/badge-grid.tsx`
- `src/components/gamification/badge-unlock-modal.tsx`
- `src/components/gamification/badge-progress.tsx`
- `src/components/gamification/points-counter.tsx`
- `src/components/gamification/points-history.tsx`
- `src/components/gamification/level-indicator.tsx`
- `src/components/gamification/xp-progress-bar.tsx`
- `src/components/gamification/leaderboard-table.tsx`
- `src/components/gamification/leaderboard-card.tsx`
- `src/components/gamification/leaderboard-entry.tsx`
- `src/components/gamification/rank-badge.tsx`
- `src/components/gamification/leaderboard-filters.tsx`
- `src/components/gamification/challenge-card.tsx`
- `src/components/gamification/challenge-progress.tsx`
- `src/components/gamification/challenge-countdown.tsx`
- `src/components/gamification/active-challenges.tsx`
- `src/components/gamification/streak-counter.tsx`
- `src/components/gamification/streak-calendar.tsx`
- `src/components/gamification/streak-milestone.tsx`

---

## Phase 3: Admin Interface

### Goal
Build the complete admin interface for platform management.

### Tasks

- [ ] Create admin layout with sidebar
- [ ] Create admin dashboard page with widgets
- [ ] Create coach list page with data table
- [ ] Create coach details page
- [ ] Create pending coaches page
- [ ] Create subscription plans page
- [ ] Create subscription analytics page
- [ ] Create content moderation page
- [ ] Create reported content page
- [ ] Create support ticket list page
- [ ] Create support ticket detail page
- [ ] Create communications/announcements page
- [ ] Create system settings page

### Technical Details

**Admin Sidebar Navigation:**
```tsx
const adminNavItems = [
  { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { title: 'Coaches', href: '/admin/coaches', icon: Users },
  { title: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
  { title: 'Content', href: '/admin/content', icon: FileText },
  { title: 'Support', href: '/admin/support', icon: HelpCircle },
  { title: 'Communications', href: '/admin/communications', icon: Megaphone },
  { title: 'Settings', href: '/admin/settings', icon: Settings },
];
```

**Files to create:**

Routes:
- `src/app/(admin)/layout.tsx`
- `src/app/(admin)/page.tsx`
- `src/app/(admin)/coaches/page.tsx`
- `src/app/(admin)/coaches/[id]/page.tsx`
- `src/app/(admin)/coaches/pending/page.tsx`
- `src/app/(admin)/subscriptions/page.tsx`
- `src/app/(admin)/subscriptions/analytics/page.tsx`
- `src/app/(admin)/content/page.tsx`
- `src/app/(admin)/content/reports/page.tsx`
- `src/app/(admin)/support/page.tsx`
- `src/app/(admin)/support/[id]/page.tsx`
- `src/app/(admin)/communications/page.tsx`
- `src/app/(admin)/settings/page.tsx`

Components:
- `src/components/admin/coach-table.tsx`
- `src/components/admin/coach-approval-card.tsx`
- `src/components/admin/coach-details-panel.tsx`
- `src/components/admin/subscription-plan-card.tsx`
- `src/components/admin/moderation-queue.tsx`
- `src/components/admin/platform-stats.tsx`
- `src/components/admin/support-ticket-card.tsx`
- `src/components/admin/announcement-composer.tsx`
- `src/components/admin/widgets/active-coaches.tsx`
- `src/components/admin/widgets/revenue-chart.tsx`
- `src/components/admin/widgets/new-signups.tsx`
- `src/components/admin/widgets/content-flags.tsx`
- `src/components/admin/widgets/support-queue.tsx`

---

## Phase 4: Coach Interface (Part 1 - Core)

### Goal
Build dashboard, academy, and member management for coaches.

### Tasks

- [ ] Create coach layout with sidebar
- [ ] Create coach dashboard page with widgets
- [ ] Create academy list page
- [ ] Create new academy page (form)
- [ ] Create academy detail page
- [ ] Create academy settings page
- [ ] Create academy members page
- [ ] Create member list page
- [ ] Create member 360 view page
- [ ] Create prospects/CRM page

### Technical Details

**Coach Sidebar Navigation (Part 1):**
```tsx
const coachNavItems = [
  { title: 'Dashboard', href: '/coach', icon: LayoutDashboard },
  { title: 'Academies', href: '/coach/academies', icon: Building },
  { title: 'Members', href: '/coach/members', icon: Users },
  // ... more items in Part 2
];
```

**Files to create:**

Routes:
- `src/app/(coach)/layout.tsx`
- `src/app/(coach)/page.tsx`
- `src/app/(coach)/academies/page.tsx`
- `src/app/(coach)/academies/new/page.tsx`
- `src/app/(coach)/academies/[id]/page.tsx`
- `src/app/(coach)/academies/[id]/settings/page.tsx`
- `src/app/(coach)/academies/[id]/members/page.tsx`
- `src/app/(coach)/members/page.tsx`
- `src/app/(coach)/members/[id]/page.tsx`
- `src/app/(coach)/members/prospects/page.tsx`

Components:
- `src/components/coach/academy/academy-card.tsx`
- `src/components/coach/academy/academy-form.tsx`
- `src/components/coach/academy/member-assignment.tsx`
- `src/components/coach/academy/academy-stats.tsx`
- `src/components/coach/members/member-table.tsx`
- `src/components/coach/members/member-card.tsx`
- `src/components/coach/members/member-360-view.tsx`
- `src/components/coach/members/progress-timeline.tsx`
- `src/components/coach/members/member-notes.tsx`
- `src/components/coach/members/member-goals.tsx`
- `src/components/coach/widgets/revenue-overview.tsx`
- `src/components/coach/widgets/active-members.tsx`
- `src/components/coach/widgets/recent-activity.tsx`
- `src/components/coach/widgets/ai-alerts.tsx`

---

## Phase 5: Coach Interface (Part 2 - Content & Business)

### Goal
Build program builder, content libraries, offers, and messaging for coaches.

### Tasks

- [ ] Create program list page
- [ ] Create program builder page
- [ ] Create program detail page
- [ ] Create exercise library page
- [ ] Create recipe library page
- [ ] Create content upload page
- [ ] Create offers list page
- [ ] Create payment links page
- [ ] Create messaging inbox page
- [ ] Create announcements page
- [ ] Create community moderation page
- [ ] Create gamification config pages
- [ ] Create analytics page
- [ ] Create public profile page
- [ ] Create AI alerts page

### Technical Details

**Program Builder Structure:**
```tsx
interface Program {
  id: string;
  name: string;
  description: string;
  duration: number; // weeks
  weeks: Week[];
}

interface Week {
  id: string;
  weekNumber: number;
  days: Day[];
}

interface Day {
  id: string;
  dayNumber: number;
  name: string;
  sessions: Session[];
}

interface Session {
  id: string;
  name: string;
  exercises: ExerciseItem[];
}
```

**Files to create:**

Routes:
- `src/app/(coach)/programs/page.tsx`
- `src/app/(coach)/programs/new/page.tsx`
- `src/app/(coach)/programs/[id]/page.tsx`
- `src/app/(coach)/programs/[id]/builder/page.tsx`
- `src/app/(coach)/library/exercises/page.tsx`
- `src/app/(coach)/library/recipes/page.tsx`
- `src/app/(coach)/library/upload/page.tsx`
- `src/app/(coach)/offers/page.tsx`
- `src/app/(coach)/offers/links/page.tsx`
- `src/app/(coach)/messaging/page.tsx`
- `src/app/(coach)/messaging/announcements/page.tsx`
- `src/app/(coach)/community/page.tsx`
- `src/app/(coach)/gamification/page.tsx`
- `src/app/(coach)/gamification/badges/page.tsx`
- `src/app/(coach)/gamification/challenges/page.tsx`
- `src/app/(coach)/gamification/leaderboard/page.tsx`
- `src/app/(coach)/analytics/page.tsx`
- `src/app/(coach)/profile/page.tsx`
- `src/app/(coach)/alerts/page.tsx`

Components:
- `src/components/coach/programs/program-builder.tsx`
- `src/components/coach/programs/week-planner.tsx`
- `src/components/coach/programs/session-editor.tsx`
- `src/components/coach/programs/exercise-selector.tsx`
- `src/components/coach/programs/exercise-card.tsx`
- `src/components/coach/programs/set-rep-input.tsx`
- `src/components/coach/programs/program-preview.tsx`
- `src/components/coach/library/exercise-library.tsx`
- `src/components/coach/library/exercise-form.tsx`
- `src/components/coach/library/video-player.tsx`
- `src/components/coach/library/recipe-library.tsx`
- `src/components/coach/library/recipe-form.tsx`
- `src/components/coach/library/nutrition-info.tsx`
- `src/components/coach/messaging/conversation-list.tsx`
- `src/components/coach/messaging/message-thread.tsx`
- `src/components/coach/messaging/message-composer.tsx`
- `src/components/coach/messaging/announcement-form.tsx`
- `src/components/coach/offers/offer-card.tsx`
- `src/components/coach/offers/offer-form.tsx`
- `src/components/coach/offers/payment-link-generator.tsx`
- `src/components/coach/offers/pricing-table.tsx`
- `src/components/coach/widgets/upcoming-sessions.tsx`
- `src/components/coach/widgets/member-progress.tsx`

---

## Phase 6: Member Interface

### Goal
Build the complete member interface for clients.

### Tasks

- [ ] Create member layout with sidebar
- [ ] Create member dashboard page with widgets
- [ ] Create programs list page
- [ ] Create program detail page
- [ ] Create session view page
- [ ] Create progress overview page
- [ ] Create measurements page
- [ ] Create progress photos page
- [ ] Create messages page
- [ ] Create community page
- [ ] Create achievements page
- [ ] Create challenges page
- [ ] Create discover/offers page
- [ ] Create notifications page
- [ ] Create settings page
- [ ] Create data sharing page

### Technical Details

**Member Sidebar Navigation:**
```tsx
const memberNavItems = [
  { title: 'Dashboard', href: '/member', icon: LayoutDashboard },
  { title: 'Programs', href: '/member/programs', icon: Dumbbell },
  { title: 'Progress', href: '/member/progress', icon: TrendingUp },
  { title: 'Messages', href: '/member/messages', icon: MessageSquare },
  { title: 'Community', href: '/member/community', icon: Users },
  { title: 'Achievements', href: '/member/achievements', icon: Trophy },
  { title: 'Discover', href: '/member/discover', icon: Compass },
  { title: 'Notifications', href: '/member/notifications', icon: Bell },
  { title: 'Settings', href: '/member/settings', icon: Settings },
];
```

**Files to create:**

Routes:
- `src/app/(member)/layout.tsx`
- `src/app/(member)/page.tsx`
- `src/app/(member)/programs/page.tsx`
- `src/app/(member)/programs/[id]/page.tsx`
- `src/app/(member)/programs/[id]/session/[sessionId]/page.tsx`
- `src/app/(member)/progress/page.tsx`
- `src/app/(member)/progress/measurements/page.tsx`
- `src/app/(member)/progress/photos/page.tsx`
- `src/app/(member)/messages/page.tsx`
- `src/app/(member)/community/page.tsx`
- `src/app/(member)/achievements/page.tsx`
- `src/app/(member)/achievements/challenges/page.tsx`
- `src/app/(member)/discover/page.tsx`
- `src/app/(member)/notifications/page.tsx`
- `src/app/(member)/settings/page.tsx`
- `src/app/(member)/settings/sharing/page.tsx`

Components:
- `src/components/member/programs/program-card.tsx`
- `src/components/member/programs/program-overview.tsx`
- `src/components/member/programs/week-view.tsx`
- `src/components/member/programs/session-card.tsx`
- `src/components/member/programs/session-detail.tsx`
- `src/components/member/programs/exercise-player.tsx`
- `src/components/member/programs/video-player.tsx`
- `src/components/member/programs/set-tracker.tsx`
- `src/components/member/programs/rest-timer.tsx`
- `src/components/member/progress/weight-tracker.tsx`
- `src/components/member/progress/measurement-form.tsx`
- `src/components/member/progress/measurement-chart.tsx`
- `src/components/member/progress/photo-upload.tsx`
- `src/components/member/progress/photo-comparison.tsx`
- `src/components/member/progress/progress-summary.tsx`
- `src/components/member/community/post-card.tsx`
- `src/components/member/community/post-composer.tsx`
- `src/components/member/community/comment-thread.tsx`
- `src/components/member/community/reaction-buttons.tsx`
- `src/components/member/widgets/today-workout.tsx`
- `src/components/member/widgets/streak-display.tsx`
- `src/components/member/widgets/points-summary.tsx`
- `src/components/member/widgets/active-challenges.tsx`
- `src/components/member/widgets/progress-snapshot.tsx`
- `src/components/member/widgets/coach-message.tsx`

---

## Phase 7: Mock Data & Integration

### Goal
Create comprehensive mock data and integrate with all components.

### Tasks

- [ ] Create user mock data (admin, coaches, members)
- [ ] Create academy mock data
- [ ] Create program mock data with exercises
- [ ] Create exercise library mock data
- [ ] Create recipe library mock data
- [ ] Create progress/measurement mock data
- [ ] Create message thread mock data
- [ ] Create gamification mock data (badges, challenges, leaderboard)
- [ ] Create analytics/chart mock data
- [ ] Create notification mock data
- [ ] Create central mock data export
- [ ] Integrate mock data into all components

### Technical Details

**Mock Data Structure:**

```tsx
// src/lib/mock-data/index.ts
export * from './users';
export * from './academies';
export * from './programs';
export * from './exercises';
export * from './recipes';
export * from './progress';
export * from './messages';
export * from './gamification';
export * from './analytics';
export * from './notifications';
```

**Example Mock Data:**

```tsx
// src/lib/mock-data/gamification.ts
export const mockBadges = [
  {
    id: '1',
    name: 'First Workout',
    description: 'Complete your first workout',
    icon: 'dumbbell',
    tier: 'bronze' as const,
    category: 'workout' as const,
    unlockedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Week Warrior',
    description: 'Complete 7 workouts in a row',
    icon: 'flame',
    tier: 'silver' as const,
    category: 'consistency' as const,
    progress: 71, // 5/7 days
  },
];

export const mockLeaderboard = [
  {
    rank: 1,
    previousRank: 2,
    user: { id: '1', name: 'Sarah Johnson', avatar: '/avatars/1.jpg' },
    points: 15420,
    streak: 45,
    badges: 12,
  },
];
```

**Files to create:**
- `src/lib/mock-data/users.ts`
- `src/lib/mock-data/academies.ts`
- `src/lib/mock-data/programs.ts`
- `src/lib/mock-data/exercises.ts`
- `src/lib/mock-data/recipes.ts`
- `src/lib/mock-data/progress.ts`
- `src/lib/mock-data/messages.ts`
- `src/lib/mock-data/gamification.ts`
- `src/lib/mock-data/analytics.ts`
- `src/lib/mock-data/notifications.ts`
- `src/lib/mock-data/index.ts`

---

## Phase 8: Polish & Verification

### Goal
Final polish, accessibility audit, and verification.

### Tasks

- [ ] Run lint and typecheck, fix all errors
- [ ] Test responsive design on all breakpoints
- [ ] Test dark mode on all pages
- [ ] Verify all navigation links work
- [ ] Ensure all empty states display correctly
- [ ] Verify loading states work
- [ ] Test keyboard navigation
- [ ] Review and fix accessibility issues
- [ ] Update components.json if needed
- [ ] Document any deviations from spec

### Technical Details

**Verification Commands:**
```bash
pnpm lint
pnpm typecheck
pnpm build
```

**Breakpoints to Test:**
- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px
- Large Desktop: 1440px

**Accessibility Checklist:**
- [ ] All images have alt text
- [ ] Forms have proper labels
- [ ] Focus states visible
- [ ] ARIA labels on interactive elements
- [ ] Color contrast meets WCAG AA
- [ ] Skip to main content link
