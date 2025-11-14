import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OtherBenefitsDataTable } from "./data-tables/OtherBenifitsDataTable";

const OtherBenifits = () => {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>Overtime</CardTitle>
                <CardDescription>
                    Employee Overtime details listing...!
                </CardDescription>
            </CardHeader>
            <CardContent className="">
                <OtherBenefitsDataTable />
            </CardContent>
        </Card>
    );
};

export default OtherBenifits;
