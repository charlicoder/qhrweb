import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { VacationAdjustmentDataTable } from "./data-tables/VacationAdjustmentDataTable";

const VacationAdjustment = () => {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>Overtime</CardTitle>
                <CardDescription>
                    Employee Overtime details listing...!
                </CardDescription>
            </CardHeader>
            <CardContent className="">
                <VacationAdjustmentDataTable />
            </CardContent>
        </Card>
    );
};

export default VacationAdjustment;
