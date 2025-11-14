import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoansDataTable } from "./data-tables/LoansDataTable";

const Loans = () => {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>Overtime</CardTitle>
                <CardDescription>
                    Employee Overtime details listing...!
                </CardDescription>
            </CardHeader>
            <CardContent className="">
                <LoansDataTable />
            </CardContent>
        </Card>
    );
};

export default Loans;
