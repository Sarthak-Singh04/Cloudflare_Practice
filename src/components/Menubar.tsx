'use client';

import { Button } from "@/components/ui/button";
import { Bookmark, Home, ChartSpline, GlobeLock, MapPinned, Settings, User ,BrainCircuit} from "lucide-react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import MessageButton from "./MessageButton";
import NotificationButton from "./NotificationButton";

interface NavigationItem {
  href: string;
  icon: React.ElementType;
  label: string;
}

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
  const router = useRouter();
  const selectedSegment = useSelectedLayoutSegment();

  const navigationItems: NavigationItem[] = [
    { href: "/home", icon: Home, label: "Home" },
    { href: "/bookmarks", icon: Bookmark, label: "Bookmarks" },
    { href: "/dashboard", icon: ChartSpline, label: "Dashboard" },
    { href: "/projects", icon: GlobeLock, label: "Projects" },
    { href: "/map", icon: MapPinned, label: "Map" },
    { href: "/c", icon: BrainCircuit, label: "Ai" },
  ];

  const bottomNavigationItems: NavigationItem[] = [
    { href: "/settings", icon: Settings, label: "Settings" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  const renderNavigationButton = (nav: NavigationItem) => (
    <Button
      key={nav.href}
      variant="ghost"
      className={`flex items-center justify-start gap-3 w-full ${
        selectedSegment === nav.href.slice(1) ? "bg-gray-50 dark:bg-gray-700" : ""
      }`}
      title={nav.label}
      onClick={() => router.push(nav.href)}
    >
      <nav.icon />
      <span className="hidden lg:inline">{nav.label}</span>
    </Button>
  );

  return (
    <div className={`flex flex-col justify-between items-center h-full ${className}`}>
      <div className="flex flex-col gap-2">
        {navigationItems.map(renderNavigationButton)}
        <NotificationButton />
        <MessageButton />
      </div>
      <div className="fixed bottom-0 w-[17rem]  flex flex-col gap-2 bg-white dark:bg-gray-800 py-2 border-t-2">
  {bottomNavigationItems.map(renderNavigationButton)}
</div>
    </div>
  );
}
