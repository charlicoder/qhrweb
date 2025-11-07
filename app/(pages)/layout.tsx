import PageHeader from "@/components/layout/PageHeader";
import "@/app/globals.css";
import { Button } from "@/components/ui/button";

export default function PageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full p-5">

            {children}
        </div>
    );
}