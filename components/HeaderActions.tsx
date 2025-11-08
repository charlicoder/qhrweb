"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next"; // Or your preferred i18n library
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LayoutDashboard } from "lucide-react";

export function HeaderActions() {
    const router = useRouter();
    const { t } = useTranslation(); // Assuming you use a library like i18next

    const goToDashboard = () => {
        router.push("/dashboard");
    };

    return (
        <div className="flex items-center justify-end mb-2 gap-4 py-2">
            <ThemeToggle />
            <Button
                onClick={goToDashboard}
                className="
                    normal-case 
                    px-5 
                    py-2 
                    text-white 
                    bg-gradient-to-r from-blue-600 to-blue-400 
                    shadow-md 
                    transition-all
                    hover:shadow-lg 
                    hover:from-blue-700 hover:to-blue-500
                    "
            >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                {t("Go to Dashboard")}
            </Button>
        </div>
    );
}
