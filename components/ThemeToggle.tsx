"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // When the component mounts, we set the mounted state to true.
    // This is to prevent a hydration mismatch, as the theme is not known on the server.
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // If the component is not yet mounted, we can return null or a placeholder.
        // This ensures that the server-rendered and client-rendered outputs match.
        return null;
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2 bg-amber-300 mt-1 rounded-full"
        >
            {theme === "dark" ? (
                <Sun className="h-4 w-4" />
            ) : (
                <Moon className="h-4 w-4" />
            )}
        </Button>
    );
}
