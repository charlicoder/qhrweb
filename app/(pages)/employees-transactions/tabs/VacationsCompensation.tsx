import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { VacationCompensationDataTable } from "./data-tables/VacationCompensationDataTable";

const VacationCompensation = () => {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>Overtime</CardTitle>
                <CardDescription>
                    Employee Overtime details listing...!
                </CardDescription>
            </CardHeader>
            <CardContent className="">
                <VacationCompensationDataTable />
            </CardContent>
        </Card>
    );
};

export default VacationCompensation;