'use client';

import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { usePrivy } from '@privy-io/react-auth';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bookmark, Home, ChartSpline, GlobeLock, MapPinned, Settings, User, BrainCircuit, Bell, UserCircle, LogOut, Moon, Sun } from 'lucide-react';

const navigationItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/bookmarks', icon: Bookmark, label: 'Bookmarks' },
  { href: '/dashboard', icon: ChartSpline, label: 'Dashboard' },
  { href: '/projects', icon: GlobeLock, label: 'Projects' },
  { href: '/map', icon: MapPinned, label: 'Map' },
  { href: '/c', icon: BrainCircuit, label: 'Ai' },
  { href: '/notification', icon: Bell, label: 'Notifications' },
];

export function SidebarDesktop() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = usePrivy();
  const { theme, setTheme } = useTheme();

  const handleLogout = useCallback(() => {
    logout();
    router.push('/');
  }, [logout, router]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const renderNavigationButton = useCallback((nav:any) => (
    <Link key={nav.href} href={nav.href} passHref>
      <Button
        variant="ghost"
        className={`flex items-center justify-start gap-3 w-full ${
          pathname === nav.href ? 'bg-gray-50 dark:bg-gray-700' : ''
        }`}
        title={nav.label}
      >
        <nav.icon className="h-5 w-5" />
        <span className="hidden lg:inline">{nav.label}</span>
      </Button>
    </Link>
  ), [pathname]);

  return (
    <aside className="w-[17rem] max-w-xs h-screen fixed left-0 top-0 z-10 border-r bg-white dark:bg-gray-900">
      <div className="h-full px-3 mt-6 flex flex-col">
        <Link href="/" className="text-2xl font-bold text-primary flex justify-center items-center gap-2">
          <Image src="/logo.svg" alt="OpenPolitica Logo" width={50} height={50} />
          OpenPolitica
        </Link>
        <nav className="mt-10 flex flex-col gap-2 flex-grow">
          {navigationItems.map(renderNavigationButton)}
        </nav>
        <div className="absolute bottom-4 left-0 w-full">
        <Separator className="my-3" />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src="/user-avatar.png" alt="User Avatar" />
                <AvatarFallback><UserCircle className="h-6 w-6" /></AvatarFallback>
              </Avatar>
              <span>User</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-3 rounded-[1rem] bg-white dark:bg-gray-800">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        </div>
      
      </div>
    </aside>
  );
}