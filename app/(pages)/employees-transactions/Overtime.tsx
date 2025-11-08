import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React from "react";
import { OvertimeDataTable } from "./OvertimeDataTable";

const Overtime = () => {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>Overtime</CardTitle>
                <CardDescription>
                    Employee Overtime details listing...!
                </CardDescription>
            </CardHeader>
            <CardContent className="">
                <OvertimeDataTable />
            </CardContent>
        </Card>
    );
};

export default Overtime;
