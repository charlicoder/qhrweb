import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LeavesDataTable } from "./data-tables/LeavesDataTable";

const Leaves = () => {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>Leaves</CardTitle>
                <CardDescription>
                    Employee Leaves details listing...!
                </CardDescription>
            </CardHeader>
            <CardContent className="border-0">
                <LeavesDataTable />
            </CardContent>
        </Card>
    );
};

export default Leaves;