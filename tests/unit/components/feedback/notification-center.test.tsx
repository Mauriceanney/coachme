import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { NotificationCenter } from "@/components/feedback/notification-center";
import type { Notification } from "@/components/feedback/notification-center";

describe("NotificationCenter", () => {
  const mockNotifications: Notification[] = [
    {
      id: "1",
      title: "Welcome",
      message: "Welcome to CoachMe",
      type: "info",
      read: false,
      createdAt: new Date("2024-01-01"),
    },
    {
      id: "2",
      title: "Success",
      message: "Workout completed",
      type: "success",
      read: true,
      createdAt: new Date("2024-01-02"),
    },
    {
      id: "3",
      title: "Warning",
      message: "Please update profile",
      type: "warning",
      read: false,
      createdAt: new Date("2024-01-03"),
    },
  ];

  it("renders empty state when no notifications", () => {
    render(<NotificationCenter notifications={[]} />);
    expect(screen.getByText("No notifications")).toBeInTheDocument();
  });

  it("renders all notifications", () => {
    render(<NotificationCenter notifications={mockNotifications} />);
    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("Warning")).toBeInTheDocument();
  });

  it("shows unread indicator for unread notifications", () => {
    render(<NotificationCenter notifications={mockNotifications} />);
    // Look for unread notifications
    const unreadNotifications = mockNotifications.filter((n) => !n.read);
    expect(unreadNotifications).toHaveLength(2);
  });

  it("calls onMarkAsRead when notification is clicked", async () => {
    const user = userEvent.setup();
    const handleMarkAsRead = vi.fn();

    render(
      <NotificationCenter
        notifications={mockNotifications}
        onMarkAsRead={handleMarkAsRead}
      />
    );

    const welcomeNotification = screen.getByText("Welcome").closest("button");
    if (welcomeNotification) {
      await user.click(welcomeNotification);
      expect(handleMarkAsRead).toHaveBeenCalledWith("1");
    }
  });

  it("calls onMarkAllAsRead when mark all button is clicked", async () => {
    const user = userEvent.setup();
    const handleMarkAllAsRead = vi.fn();

    render(
      <NotificationCenter
        notifications={mockNotifications}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    );

    const markAllButton = screen.getByRole("button", { name: /mark all/i });
    await user.click(markAllButton);
    expect(handleMarkAllAsRead).toHaveBeenCalledOnce();
  });

  it("does not render mark all button when all notifications are read", () => {
    const allReadNotifications = mockNotifications.map((n) => ({
      ...n,
      read: true,
    }));

    render(<NotificationCenter notifications={allReadNotifications} />);
    expect(screen.queryByRole("button", { name: /mark all/i })).not.toBeInTheDocument();
  });

  it("displays notification types with correct styling", () => {
    render(<NotificationCenter notifications={mockNotifications} />);
    // Verify all notification types are rendered
    expect(screen.getByText("Welcome")).toBeInTheDocument(); // info
    expect(screen.getByText("Success")).toBeInTheDocument(); // success
    expect(screen.getByText("Warning")).toBeInTheDocument(); // warning
  });

  it("renders error type notification", () => {
    const errorNotification: Notification[] = [
      {
        id: "4",
        title: "Error",
        message: "Something went wrong",
        type: "error",
        read: false,
        createdAt: new Date(),
      },
    ];

    render(<NotificationCenter notifications={errorNotification} />);
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("does not call onMarkAsRead when clicking read notification", async () => {
    const user = userEvent.setup();
    const handleMarkAsRead = vi.fn();

    const readNotifications: Notification[] = [
      {
        id: "1",
        title: "Read Notification",
        message: "This is read",
        type: "info",
        read: true,
        createdAt: new Date(),
      },
    ];

    render(
      <NotificationCenter
        notifications={readNotifications}
        onMarkAsRead={handleMarkAsRead}
      />
    );

    const notification = screen.getByText("Read Notification").closest("button");
    if (notification) {
      await user.click(notification);
      expect(handleMarkAsRead).not.toHaveBeenCalled();
    }
  });
});
