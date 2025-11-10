import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SalaryIncreaseDataTable } from "./data-tables/SalaryIncreaseDataTable";

const SalaryIncrease = () => {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>Overtime</CardTitle>
                <CardDescription>
                    Employee Overtime details listing...!
                </CardDescription>
            </CardHeader>
            <CardContent className="">
                <SalaryIncreaseDataTable />
            </CardContent>
        </Card>
    );
};

export default SalaryIncrease;
