import * as React from "react";
import { RoleSidebar } from "@/components/layout/role-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface AppShellProps {
  role: "admin" | "coach" | "member";
  children: React.ReactNode;
}

export function AppShell({ role, children }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <RoleSidebar role={role} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
