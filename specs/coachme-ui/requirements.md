# Feature: CoachMe - Fitness Coaching Platform UI

## Overview

A comprehensive SaaS platform for independent fitness coaches to manage their business, deliver personalized training programs, build engaged communities, and grow their coaching practice. This specification covers the UI-only implementation with mock data.

---

## User Stories

### Admin Interface

#### US-ADMIN-1: Coach Management Dashboard
**As an** Admin
**I want to** view and manage all coaches on the platform
**So that** I can approve new registrations, monitor activity, and handle account issues

##### Acceptance Criteria
- [ ] AC1: Given I'm on the coaches page, when I load the page, then I see a searchable/filterable table of all coaches with status indicators
- [ ] AC2: Given a coach is pending approval, when I click "Approve", then their status changes to "Active"
- [ ] AC3: Given I select a coach, when I view their details, then I see their profile, academies, members, and subscription status
- [ ] AC4: Given I need to take action, when I click suspend/reactivate, then the coach's access is updated accordingly

#### US-ADMIN-2: Subscription Plan Management
**As an** Admin
**I want to** configure and manage subscription plans
**So that** I can control the pricing and features available to coaches

##### Acceptance Criteria
- [ ] AC1: Given I'm on subscriptions page, when I view plans, then I see all tiers with pricing and feature lists
- [ ] AC2: Given I edit a plan, when I modify price or features, then the changes are reflected in the UI
- [ ] AC3: Given I view analytics, when I load the page, then I see subscription metrics and revenue charts

#### US-ADMIN-3: Content Moderation
**As an** Admin
**I want to** review and moderate flagged content
**So that** the platform remains safe and professional

##### Acceptance Criteria
- [ ] AC1: Given content is flagged, when I view the moderation queue, then I see the content with context and reporter info
- [ ] AC2: Given I review content, when I take action (approve/remove/warn), then the UI reflects the moderation status

#### US-ADMIN-4: Platform Analytics Dashboard
**As an** Admin
**I want to** view platform-wide statistics
**So that** I can monitor growth and identify issues

##### Acceptance Criteria
- [ ] AC1: Given I'm on the dashboard, when I load the page, then I see KPIs (active coaches, members, revenue, engagement)
- [ ] AC2: Given I want details, when I click on a metric, then I see detailed charts and breakdowns
- [ ] AC3: Given I select a date range, when I apply the filter, then all metrics update accordingly

---

### Coach Interface

#### US-COACH-1: Coach Dashboard
**As a** Coach
**I want to** see an overview of my business at a glance
**So that** I can quickly understand my current status and priorities

##### Acceptance Criteria
- [ ] AC1: Given I log in, when I view my dashboard, then I see active members count, recent revenue, and upcoming tasks
- [ ] AC2: Given I have AI alerts, when I view the dashboard, then I see a section with suggestions/warnings
- [ ] AC3: Given I want to navigate, when I click on a widget, then I'm taken to the detailed view

#### US-COACH-2: Academy Management
**As a** Coach
**I want to** create and manage academies (client groups)
**So that** I can segment my coaching into different specialties or programs

##### Acceptance Criteria
- [ ] AC1: Given I'm on academies page, when I click "Create Academy", then I see a form for name, description, and cover image
- [ ] AC2: Given I have an academy, when I view it, then I see member list, programs assigned, and activity stats
- [ ] AC3: Given I configure an academy, when I access settings, then I can toggle community and gamification features
- [ ] AC4: Given gamification is enabled, when I configure it, then I can set points rules, create badges, and define challenges

#### US-COACH-3: Member Management
**As a** Coach
**I want to** manage my clients and view their progress
**So that** I can provide personalized coaching and track their success

##### Acceptance Criteria
- [ ] AC1: Given I'm on members page, when I view the list, then I see all members with status, academy, and last activity
- [ ] AC2: Given I select a member, when I view their profile, then I see a 360° view (progress, programs, gamification, communication)
- [ ] AC3: Given I want to add a member, when I click "Add Member", then I can enter their details or send an invite
- [ ] AC4: Given I need to manage access, when I suspend a member, then their access is restricted

#### US-COACH-4: Program Builder
**As a** Coach
**I want to** create detailed training programs
**So that** I can deliver structured, personalized workouts to my clients

##### Acceptance Criteria
- [ ] AC1: Given I'm creating a program, when I use the builder, then I can organize weeks, days, and sessions
- [ ] AC2: Given I'm editing a session, when I add exercises, then I can select from my library and set reps/sets/rest
- [ ] AC3: Given I preview a program, when I view it, then I see how members will experience it

#### US-COACH-5: Content Library
**As a** Coach
**I want to** manage my exercise and recipe libraries
**So that** I can use my own content in programs and share it with members

##### Acceptance Criteria
- [ ] AC1: Given I'm in the exercise library, when I view exercises, then I see cards with video thumbnails and categories
- [ ] AC2: Given I'm adding an exercise, when I upload content, then I can add video, description, and muscle groups
- [ ] AC3: Given I'm in the recipe library, when I view recipes, then I see nutrition info and ingredients

#### US-COACH-6: Offers and Payment Links
**As a** Coach
**I want to** create commercial offers and generate payment links
**So that** I can sell my coaching services

##### Acceptance Criteria
- [ ] AC1: Given I'm on offers page, when I create an offer, then I can set pricing, duration, and included content
- [ ] AC2: Given I have an active offer, when I generate a payment link, then I can copy and share it
- [ ] AC3: Given I view my offers, when I check analytics, then I see conversion rates and revenue

#### US-COACH-7: Messaging
**As a** Coach
**I want to** communicate with my members
**So that** I can provide support and stay connected

##### Acceptance Criteria
- [ ] AC1: Given I'm in messaging, when I view conversations, then I see 1-to-1 chats organized by member
- [ ] AC2: Given I select a conversation, when I view the thread, then I see message history with timestamps
- [ ] AC3: Given I want to broadcast, when I create an announcement, then I can send to an entire academy

#### US-COACH-8: Community Moderation
**As a** Coach
**I want to** moderate my academy's community forum
**So that** I can maintain a positive environment

##### Acceptance Criteria
- [ ] AC1: Given community is enabled, when I view the forum, then I see posts and comments from members
- [ ] AC2: Given content is flagged, when I review it, then I can approve, hide, or remove it

#### US-COACH-9: Gamification Configuration
**As a** Coach
**I want to** configure gamification for my academies
**So that** I can motivate and engage my members

##### Acceptance Criteria
- [ ] AC1: Given I'm in gamification settings, when I configure points, then I can set values for different actions
- [ ] AC2: Given I create a badge, when I define it, then I set name, icon, condition, and tier
- [ ] AC3: Given I create a challenge, when I configure it, then I set duration, goal, and rewards
- [ ] AC4: Given I view leaderboard settings, when I configure it, then I can choose what metrics to rank by

#### US-COACH-10: Public Profile
**As a** Coach
**I want to** create a public profile page
**So that** potential clients can discover and learn about my services

##### Acceptance Criteria
- [ ] AC1: Given I'm editing my profile, when I add info, then I can set bio, specialties, and certifications
- [ ] AC2: Given I link offers, when I preview, then my active offers appear on the public page

---

### Member Interface

#### US-MEMBER-1: Member Dashboard
**As a** Member
**I want to** see my fitness journey at a glance
**So that** I stay motivated and know what to do next

##### Acceptance Criteria
- [ ] AC1: Given I log in, when I view dashboard, then I see today's workout, streak status, and recent progress
- [ ] AC2: Given I have gamification, when I view dashboard, then I see points, recent badges, and rank
- [ ] AC3: Given I have active challenges, when I view them, then I see progress toward each goal

#### US-MEMBER-2: Program Viewer
**As a** Member
**I want to** access and follow my training programs
**So that** I can complete my workouts effectively

##### Acceptance Criteria
- [ ] AC1: Given I have programs assigned, when I view them, then I see the current week and upcoming sessions
- [ ] AC2: Given I start a session, when I view it, then I see exercise cards with video and instructions
- [ ] AC3: Given I'm doing an exercise, when I track sets, then I can log completed reps and weight

#### US-MEMBER-3: Progress Tracking
**As a** Member
**I want to** track my body measurements and progress photos
**So that** I can see my transformation over time

##### Acceptance Criteria
- [ ] AC1: Given I'm tracking weight, when I log a measurement, then I see it on my progress chart
- [ ] AC2: Given I upload photos, when I view comparison, then I can see side-by-side before/after
- [ ] AC3: Given I view progress summary, when I check metrics, then I see trends and improvements

#### US-MEMBER-4: Communication with Coach
**As a** Member
**I want to** message my coach
**So that** I can get guidance and support

##### Acceptance Criteria
- [ ] AC1: Given I'm in messages, when I compose, then I can send text, images, and files to my coach
- [ ] AC2: Given coach replies, when I view conversation, then I see the thread with timestamps

#### US-MEMBER-5: Community Participation
**As a** Member
**I want to** participate in my academy's community
**So that** I can connect with others on the same journey

##### Acceptance Criteria
- [ ] AC1: Given community is enabled, when I view it, then I see posts from other members
- [ ] AC2: Given I want to share, when I create a post, then I can add text and images
- [ ] AC3: Given someone posts, when I react/comment, then my engagement is visible

#### US-MEMBER-6: Achievements
**As a** Member
**I want to** view my badges, points, and challenges
**So that** I feel rewarded for my efforts

##### Acceptance Criteria
- [ ] AC1: Given I'm on achievements, when I view badges, then I see earned and locked badges with progress
- [ ] AC2: Given I view leaderboard, when I check my rank, then I see my position relative to others
- [ ] AC3: Given I view challenges, when I check progress, then I see how close I am to each goal

#### US-MEMBER-7: Account Settings
**As a** Member
**I want to** manage my account and privacy settings
**So that** I control my data and preferences

##### Acceptance Criteria
- [ ] AC1: Given I'm in settings, when I update profile, then I can change name, photo, and goals
- [ ] AC2: Given I'm in sharing settings, when I toggle options, then I control what data coach can see

---

## Technical Requirements

- All components use TypeScript with strict typing
- Follow existing shadcn/ui and Tailwind CSS patterns
- Support dark/light mode via existing theme system
- Responsive design (mobile, tablet, desktop)
- Accessible components (ARIA labels, keyboard navigation)
- Include rich mock data for realistic preview

## Out of Scope

- Backend API implementation
- Database operations
- Authentication/authorization logic
- Payment processing
- Real-time messaging
- Push notifications
- Native mobile apps (iOS/Android)
- AI/ML model integration
