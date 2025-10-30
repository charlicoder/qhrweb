"use client"

import React, { useState } from 'react'
import { Tabs, Tab, Box, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ModernDetailsTab from './_tabs/DetailsTab'
import DetailsTab from './_tabs/DetailsTab';
import { useTranslation } from "react-i18next";


const CompanySetupPage = () => {
    const [tab, setTab] = useState(0);
    const { t } = useTranslation();

    const goToDashboard = () => {
        window.location.href = ""
    };
    return (
        <Box sx={{ width: "100%", bgcolor: "background.paper", p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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
            {tab === 1 && <h1>Hello</h1>}
            {tab === 2 && <h1>Hello</h1>}
            {tab === 3 && <h1>Hello</h1>}
        </Box>
    )
}

export default CompanySetupPage