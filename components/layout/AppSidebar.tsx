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
import { Home, Inbox, Calendar, Settings, Search, User, Settings2 } from "lucide-react";
import Link from "next/link";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

const menuItems = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Administration",
        url: "/administration",
        submenus: [
            {
                title: "Company Setup",
                url: "/administration/company",
                icon: Settings2
            },
            {
                title: "Sites Setup",
                url: "administration/sites",
                icon: Settings2
            },
            {
                title: "User accounts",
                url: "/administration/user-accounts",
                icon: Settings2
            },
            {
                title: "Change Password",
                url: "/account/change-password",
                icon: Settings2
            },
            {
                title: "Audit Log",
                url: "/administration/audit-log",
                icon: Settings2
            },
            {
                title: "Dept & Sections Setup",
                url: "/administration/dept-sections",
                icon: Settings2
            },
            {
                title: "Project Setup",
                url: "/administration/project",
                icon: Settings2
            },
            {
                title: "Currency Setup",
                url: "/administration/currency",
                icon: Settings2
            },
            {
                title: "Dictinary Management",
                url: "/administration/dictionary",
                icon: Settings2
            },
            {
                title: "Regions & Cities Setup",
                url: "/administration/regions-cities",
                icon: Settings2
            },
            {
                title: "Calendar Setup",
                url: "/administration/calendar",
                icon: Settings2
            },
            {
                title: "Icons Setup",
                url: "/administration/icons",
                icon: Settings2
            },
            {
                title: "Accounting Linkage Setup",
                url: "/administration/accounting-linkage",
                icon: Settings2
            },
            {
                title: "Mandatory Fields Setup",
                url: "/administration/mandatory-feilds",
                icon: Settings2
            },
        ],
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "/finance",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-3 py-5">
                <Home />
            </SidebarHeader>
            <SidebarContent className="bg-gray-100 dark:bg-gray-900">
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <Collapsible className="group/collapsible" key={item.title}>
                                    <SidebarMenuItem key={item.title}>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem>
                                                    <Link href={item.url} target="_blank">
                                                        Hello
                                                    </Link>
                                                </SidebarMenuSubItem>

                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
