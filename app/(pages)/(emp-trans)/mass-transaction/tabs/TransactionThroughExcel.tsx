import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ExcelTransactionForm } from './ExcelTransactionForm'

const TransactionThroughExcel = () => {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>Mass Transactions Through Excel</CardTitle>
                <CardDescription>
                    Mass Transactions through excel...!
                </CardDescription>
            </CardHeader>
            <CardContent className="border-0 p-5">
                <ExcelTransactionForm />
            </CardContent>
        </Card>

    )
}

export default TransactionThroughExcel