"use client";

import { Bell, CheckCheck, Info, AlertTriangle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: Date;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
}

const notificationIcons = {
  info: Info,
  success: CheckCheck,
  warning: AlertTriangle,
  error: AlertCircle,
};

const notificationColors = {
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-yellow-500",
  error: "text-red-500",
};

export function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const hasUnread = unreadCount > 0;

  if (notifications.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Bell className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No notifications</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg">Notifications</CardTitle>
          {hasUnread && (
            <Badge variant="secondary" className="h-5 rounded-full px-2">
              {unreadCount}
            </Badge>
          )}
        </div>
        {hasUnread && onMarkAllAsRead && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMarkAllAsRead}
            className="text-xs"
          >
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {notifications.map((notification) => {
              const Icon = notificationIcons[notification.type];
              const iconColor = notificationColors[notification.type];

              return (
                <button
                  key={notification.id}
                  onClick={() => {
                    if (!notification.read && onMarkAsRead) {
                      onMarkAsRead(notification.id);
                    }
                  }}
                  className={cn(
                    "w-full rounded-lg border p-3 text-left transition-colors hover:bg-accent",
                    notification.read ? "bg-background" : "bg-accent/50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", iconColor)} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-sm">{notification.title}</p>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
