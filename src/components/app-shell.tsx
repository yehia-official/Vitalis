"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  BookOpen,
  Bot,
  Gauge,
  LayoutDashboard,
  Menu,
  Pill,
  Siren,
  Stethoscope,
  Scale,
  CalendarPlus,
  FileText,
  Wind
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mainNav = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
];

const trackingNav = [
  { href: "/heart-rate", icon: Gauge, label: "Vitals" },
  { href: "/symptoms", icon: Stethoscope, label: "Symptoms" },
  { href: "/weight", icon: Scale, label: "Weight" },
]

const managementNav = [
  { href: "/medications", icon: Pill, label: "Medications" },
  { href: "/appointments", icon: CalendarPlus, label: "Appointments" },
  { href: "/emergency", icon: Siren, label: "Emergency" },
]

const resourcesNav = [
  { href: "/learn", icon: BookOpen, label: "Learn" },
  { href: "/reports", icon: FileText, label: "Reports" },
  { href: "/mindfulness", icon: Wind, label: "Mindfulness" },
  { href: "/chatbot", icon: Bot, label: "AI Helper" },
];


export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-sidebar-primary" />
            <span className="font-headline text-2xl font-bold text-sidebar-foreground">
              Vitalis
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                {mainNav.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={{ children: item.label, side: "right", align: 'center' }}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <SidebarGroup>
                <SidebarGroupLabel>Track</SidebarGroupLabel>
                 <SidebarMenu>
                    {trackingNav.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                        asChild
                        isActive={pathname.startsWith(item.href)}
                        tooltip={{ children: item.label, side: "right", align: 'center' }}
                        >
                        <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                 </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>Manage</SidebarGroupLabel>
                 <SidebarMenu>
                    {managementNav.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                        asChild
                        isActive={pathname.startsWith(item.href)}
                        tooltip={{ children: item.label, side: "right", align: 'center' }}
                        >
                        <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                 </SidebarMenu>
            </SidebarGroup>
             <SidebarGroup>
                <SidebarGroupLabel>Resources</SidebarGroupLabel>
                 <SidebarMenu>
                    {resourcesNav.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                        asChild
                        isActive={pathname.startsWith(item.href)}
                        tooltip={{ children: item.label, side: "right", align: 'center' }}
                        >
                        <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                 </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent">
            <Avatar>
              <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="user portrait" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden whitespace-nowrap">
              <p className="font-semibold text-sidebar-accent-foreground">User Name</p>
              <p className="text-xs text-muted-foreground">user@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6 md:hidden">
          <SidebarTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </SidebarTrigger>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-headline text-xl font-bold text-foreground"
          >
            <Logo className="h-6 w-6 text-primary" />
            <span>Vitalis</span>
          </Link>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
