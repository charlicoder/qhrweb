import { AppSidebar } from "@/components/layout/AppSidebar";
import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            
            <div className="w-full">
                
                <Header />
                <main className="flex min-h-screen bg-white dark:bg-gray-800 p-5">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
