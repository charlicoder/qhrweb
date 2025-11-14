import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OvertimeDataTable } from "./data-tables/OvertimeDataTable";

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
