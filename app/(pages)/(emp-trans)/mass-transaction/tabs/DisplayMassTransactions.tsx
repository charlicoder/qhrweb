import { Card, CardContent } from "@/components/ui/card";
import { MassTransactionDataTable } from "./data-tables/MassTransactionsTable";

const DisplayMassTransactions = () => {
    return (
        <Card className="rounded-none">
            <CardContent className="border-0">
                <MassTransactionDataTable />
            </CardContent>
        </Card>
    );
};

export default DisplayMassTransactions;