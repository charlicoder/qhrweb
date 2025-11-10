import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OtherDeductionsDataTable } from "./data-tables/OtherDeductionsDataTable";

const OtherDeductions = () => {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>Overtime</CardTitle>
                <CardDescription>
                    Employee Overtime details listing...!
                </CardDescription>
            </CardHeader>
            <CardContent className="">
                <OtherDeductionsDataTable />
            </CardContent>
        </Card>
    );
};

export default OtherDeductions;
