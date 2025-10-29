import "@/app/globals.css";
import PageHeader from "@/components/layout/PageHeader";

export default function PageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <div className="w-full">
                <PageHeader />
                {children}
            </div>
    );
}