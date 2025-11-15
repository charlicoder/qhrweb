import { Card, CardContent } from "@/components/ui/card";
import { ExcelTransactionForm } from './ExcelTransactionForm'

const TransactionThroughExcel = () => {
    return (
        <Card className="rounded-none">
            <CardContent className="border-0 p-5">
                <ExcelTransactionForm />
            </CardContent>
        </Card>

    )
}

export default TransactionThroughExcel