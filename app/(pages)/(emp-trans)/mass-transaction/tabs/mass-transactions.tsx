import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MTForm } from "./MTForm";

const MassTransactions = () => {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>Mass Transactions</CardTitle>
                <CardDescription>
                    Mass Transactions details listing...!
                </CardDescription>
            </CardHeader>
            <CardContent className="border-0">
                <MTForm />
            </CardContent>
        </Card>
    );
};

export default MassTransactions;