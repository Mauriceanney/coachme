"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  HelpCircle,
  Megaphone,
  Settings,
  Building,
  Dumbbell,
  FolderOpen,
  Tag,
  MessageSquare,
  Users2,
  Trophy,
  BarChart3,
  User,
  Bell,
  TrendingUp,
  Compass,
  type LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

interface RoleSidebarProps {
  role: "admin" | "coach" | "member";
}

const adminNavItems: NavItem[] = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Coaches", href: "/admin/coaches", icon: Users },
  { title: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { title: "Content", href: "/admin/content", icon: FileText },
  { title: "Support", href: "/admin/support", icon: HelpCircle },
  { title: "Communications", href: "/admin/communications", icon: Megaphone },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

const coachNavItems: NavItem[] = [
  { title: "Dashboard", href: "/coach", icon: LayoutDashboard },
  { title: "Academies", href: "/coach/academies", icon: Building },
  { title: "Members", href: "/coach/members", icon: Users },
  { title: "Programs", href: "/coach/programs", icon: Dumbbell },
  { title: "Library", href: "/coach/library", icon: FolderOpen },
  { title: "Offers", href: "/coach/offers", icon: Tag },
  { title: "Messaging", href: "/coach/messaging", icon: MessageSquare },
  { title: "Community", href: "/coach/community", icon: Users2 },
  { title: "Gamification", href: "/coach/gamification", icon: Trophy },
  { title: "Analytics", href: "/coach/analytics", icon: BarChart3 },
  { title: "Profile", href: "/coach/profile", icon: User },
  { title: "Alerts", href: "/coach/alerts", icon: Bell },
];

const memberNavItems: NavItem[] = [
  { title: "Dashboard", href: "/member", icon: LayoutDashboard },
  { title: "Programs", href: "/member/programs", icon: Dumbbell },
  { title: "Progress", href: "/member/progress", icon: TrendingUp },
  { title: "Messages", href: "/member/messages", icon: MessageSquare },
  { title: "Community", href: "/member/community", icon: Users },
  { title: "Achievements", href: "/member/achievements", icon: Trophy },
  { title: "Discover", href: "/member/discover", icon: Compass },
  { title: "Notifications", href: "/member/notifications", icon: Bell },
  { title: "Settings", href: "/member/settings", icon: Settings },
];

function getNavItems(role: "admin" | "coach" | "member"): NavItem[] {
  switch (role) {
    case "admin":
      return adminNavItems;
    case "coach":
      return coachNavItems;
    case "member":
      return memberNavItems;
  }
}

export function RoleSidebar({ role }: RoleSidebarProps) {
  const pathname = usePathname();
  const navItems = getNavItems(role);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-4">
          <h2 className="text-lg font-semibold">CoachMe</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={item.href}>
                    <Icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
