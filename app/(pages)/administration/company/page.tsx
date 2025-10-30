"use client"

import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Box, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ModernDetailsTab from './_tabs/DetailsTab'
import DetailsTab from './_tabs/DetailsTab';
import { useTranslation } from "react-i18next";
import ModernAdditionalInfoTab from './_tabs/AdditionalInfoTab';
import { useRouter } from 'next/navigation';
import { useTheme } from "next-themes";
import { Button as ShButton } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import SignatoriesTab from './_tabs/SignatoriesTab';
import OtherBankTab from './_tabs/OtherBankTab';


const CompanySetupPage = () => {
    const router = useRouter()
    const [tab, setTab] = useState(0);
    const { t } = useTranslation();

    const { theme, setTheme } = useTheme();
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => setTheme(theme == "dark" ? "light" : "dark");

    useEffect(() => {
        setIsDark(theme === "dark")
    }, [isDark, theme]);

    const goToDashboard = () => {
        router.push("/dashboard")
    };
    return (
        <Box sx={{ width: "100%", bgcolor: "background.paper", p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, gap: 4 }}>
                <ShButton
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="p-2 bg-amber-300 mt-2"
                >
                    {isDark ? (
                        <Sun className="h-4 w-4" />
                    ) : (
                        <Moon className="h-4 w-4" />
                    )}
                </ShButton>

                <Button
                    onClick={goToDashboard}
                    variant="contained"
                    startIcon={<DashboardIcon />}
                    sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 2.5,
                        py: 1,
                        background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                        boxShadow: 3,
                        "&:hover": {
                            boxShadow: 6,
                            background: "linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)",
                        },
                    }}
                >
                    {t("Go to Dashboard")}
                </Button>

            </Box>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth" sx={{ mb: 2 }}>
                <Tab label={t("Details")} />
                <Tab label={t("Additional Information")} />
                <Tab label={t("Signatories")} />
                <Tab label={t("Other Banks")} />
            </Tabs>
            {tab === 0 && <DetailsTab />}
            {tab === 1 && <ModernAdditionalInfoTab />}
            {tab === 2 && <SignatoriesTab />}
            {tab === 3 && <OtherBankTab />}
        </Box>
    )
}

export default CompanySetupPage