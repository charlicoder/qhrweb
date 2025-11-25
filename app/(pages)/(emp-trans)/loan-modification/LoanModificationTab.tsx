import { Card, CardContent } from "@/components/ui/card";
import LoanTransactionDataTable from "./data-table/LoanTransactionDataTable";
import LoanIncreaseDataTable from "./data-table/LoanIncreaseDataTable";

const LoadModificationTab = () => {
    return (
        <Card className="rounded-none">
            <CardContent className="">
                <LoanTransactionDataTable />
                
                <LoanIncreaseDataTable />
            </CardContent>
        </Card>
    );
};

export default LoadModificationTab;