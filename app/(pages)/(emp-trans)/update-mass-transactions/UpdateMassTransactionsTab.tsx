import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import UMTFilterForm from "./UMTFilterForm";
import MassTransactionTable from "./data-table/MassTransactionsTable";
import { Separator } from "@/components/ui/separator";

const MassTransactions = () => {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>Update Mass Transactions</CardTitle>
                
            </CardHeader>
            <CardContent className="">
                <UMTFilterForm />
                <MassTransactionTable />
            </CardContent>
        </Card>
    );
};

export default MassTransactions;
