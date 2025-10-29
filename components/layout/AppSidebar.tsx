import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem
} from "@/components/ui/sidebar";


import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    ChevronDown
} from 'lucide-react';

import Link from "next/link";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

import { menuItems } from "@/lib/menus";


export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-3 py-4">
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    QHR
                </span>
            </SidebarHeader>
            <SidebarContent className="bg-gray-100 dark:bg-gray-900">
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) =>
                                item.submenus ? (
                                    <Collapsible className="group/collapsible" key={item.title}>
                                        <SidebarMenuItem className="py-2">
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton className="hover:bg-gray-200 dark:hover:bg-gray-700 px-3">
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                    <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-400 group-data-[state=open]/collapsible:rotate-180" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="pl-6">
                                                <SidebarMenuSub>
                                                    {item.submenus.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <Link href={subItem.url} target="_blank" className="flex items-center w-full px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-700 rounded-md">
                                                                {subItem.icon && <subItem.icon className="h-4 w-4 mr-2" />}
                                                                <span>{subItem.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ) : (
                                    <SidebarMenuItem key={item.title} className="py-2">
                                        <SidebarMenuButton asChild className="hover:bg-gray-400 dark:hover:bg-gray-700 px-3">
                                            <Link href={item.url} target="_blank">
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <Sheet>
                    <SheetTrigger>Footer Menu</SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px]">
                        <SheetHeader>
                            <SheetTitle>Are you absolutely sure?</SheetTitle>
                            <SheetDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </SidebarFooter>
        </Sidebar>
    );
}
