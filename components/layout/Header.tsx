"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
    const { theme, setTheme } = useTheme();
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => setTheme(theme == "dark" ? "light" : "dark");

    useEffect(() => {
        setIsDark(theme === "dark")
    }, [isDark, theme]);

    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-5 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <SidebarTrigger />
                        <span className="text-xl font-semibold text-gray-900 dark:text-white">
                            QuantumHR
                        </span>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <Link
                        href={"/dashboard"}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
                    >
                        Dashboard
                    </Link>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="p-2"
                    >
                        {isDark ? (
                            <Sun className="h-4 w-4" />
                        ) : (
                            <Moon className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
