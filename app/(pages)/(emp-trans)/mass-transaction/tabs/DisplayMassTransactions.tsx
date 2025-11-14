import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MTForm } from "./MTForm";
import { MassTransactionDataTable } from "./data-tables/MassTransactionsTable";

const DisplayMassTransactions = () => {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>Display Mass Transactions</CardTitle>
                <CardDescription>
                    Display Mass Transactions..!
                </CardDescription>
            </CardHeader>
            <CardContent className="border-0">
                <MassTransactionDataTable />
            </CardContent>
        </Card>
    );
};

export default DisplayMassTransactions;