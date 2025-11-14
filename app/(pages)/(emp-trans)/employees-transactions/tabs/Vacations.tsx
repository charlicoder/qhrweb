import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { VacationsDataTable } from "./data-tables/VacationsDataTable";

const Vacations = () => {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>Overtime</CardTitle>
                <CardDescription>
                    Employee Vacations details listing...!
                </CardDescription>
            </CardHeader>
            <CardContent className="">
                <VacationsDataTable />
            </CardContent>
        </Card>
    );
};

export default Vacations;