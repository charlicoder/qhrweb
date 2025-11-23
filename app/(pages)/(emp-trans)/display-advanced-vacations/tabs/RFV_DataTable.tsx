"use client";

import React, { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// --- Define the type for your data rows ---
interface TransactionDetail {
    startDate: string;
    endDate: string;
    dateOfTransactionCalculation: string;
    name: string;
    type: string;
    duration: number;
    amount: number;
    transactionStatus: string;
    notes: string | null; // Notes can be optional
}

// --- Mock Data ---
const transactionTypes = ["Holiday-OT", "Regular-OT", "Shift Allowance"];
const employeeNames = ["Alice Smith", "Bob Johnson", "Charlie Brown", "Diana Prince", "Ethan Hunt"];
const transactionStatuses = ["Posted", "Unposted", "Pending"];

const mockTransactionDetails: TransactionDetail[] = Array.from({ length: 30 }, (_, i) => {
    const startDate = new Date(2025, 9, 5 + i); // October 5th + i days
    const endDate = new Date(startDate.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000); // Up to 3 days duration
    const calcDate = new Date(endDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000); // Calculation date after end date
    const duration = Math.floor(Math.random() * 8) + 1; // 1 to 8 hours
    const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    let hourlyRate = 0;
    if (type === "Holiday-OT") hourlyRate = 45.50;
    else if (type === "Regular-OT") hourlyRate = 25.00;
    else hourlyRate = 15.00; // Base rate for Shift Allowance
    const amount = duration * hourlyRate;

    return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dateOfTransactionCalculation: calcDate.toISOString().split('T')[0],
        name: employeeNames[Math.floor(Math.random() * employeeNames.length)],
        type: type,
        duration: duration,
        amount: parseFloat(amount.toFixed(2)),
        transactionStatus: transactionStatuses[Math.floor(Math.random() * transactionStatuses.length)],
        notes: i % 4 === 0 ? `Approved by Manager ${Math.floor(Math.random() * 5) + 1}` : (i % 7 === 0 ? "Needs review" : null),
    };
});
// --- End of Mock Data ---

interface SortConfig {
    key: keyof TransactionDetail | null;
    direction: 'ascending' | 'descending';
}

export function ReturnFormVacationDataTable() {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const sortedTransactions = useMemo(() => {
        let sortableItems = [...mockTransactionDetails];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key as keyof TransactionDetail];
                const bValue = b[sortConfig.key as keyof TransactionDetail];

                if (aValue == null && bValue == null) return 0;
                if (aValue == null) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (bValue == null) return sortConfig.direction === 'ascending' ? 1 : -1;

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return aValue.localeCompare(bValue) * (sortConfig.direction === 'ascending' ? 1 : -1);
                } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return (aValue - bValue) * (sortConfig.direction === 'ascending' ? 1 : -1);
                }
                return 0;
            });
        }
        return sortableItems;
    }, [sortConfig]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        const lastPageIndex = firstPageIndex + itemsPerPage;
        return sortedTransactions.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, sortedTransactions]);

    const requestSort = (key: keyof TransactionDetail) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const totalAmount = mockTransactionDetails.reduce((sum, transaction) => sum + transaction.amount, 0);
    const totalPages = Math.ceil(mockTransactionDetails.length / itemsPerPage);

    return (
        <div>
            <div className="w-full overflow-x-auto rounded-none">
                <Table>
                    <TableCaption>A list of detailed transactions.</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('startDate')}>
                                    Start Date <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('endDate')}>
                                    End Date <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('dateOfTransactionCalculation')}>
                                    Date of Calc <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('name')}>
                                    Name <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('type')}>
                                    Type <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead className="text-center">
                                <Button variant="ghost" onClick={() => requestSort('duration')}>
                                    Duration <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead className="text-right">
                                <Button variant="ghost" onClick={() => requestSort('amount')}>
                                    Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('transactionStatus')}>
                                    Status <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Notes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentTableData.map((transaction) => (
                            <React.Fragment key={transaction.startDate + transaction.name}> {/* More robust key */}
                                <TableRow>
                                    <TableCell className="font-medium">{transaction.startDate}</TableCell>
                                    <TableCell>{transaction.endDate}</TableCell>
                                    <TableCell>{transaction.dateOfTransactionCalculation}</TableCell>
                                    <TableCell>{transaction.name}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={transaction.type === "Holiday-OT" ? "default" : transaction.type === "Regular-OT" ? "secondary" : "outline"}
                                        >
                                            {transaction.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">{transaction.duration.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                transaction.transactionStatus === "Posted" ? "outline" :
                                                    transaction.transactionStatus === "Unposted" ? "destructive" :
                                                        "secondary" // For "Pending"
                                            }
                                        >
                                            {transaction.transactionStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{transaction.notes ?? '-'}</TableCell> {/* Display '-' if notes are null */}
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6}>Total (All Pages)</TableCell>
                            <TableCell className="text-right font-bold">${totalAmount.toFixed(2)}</TableCell>
                            <TableCell colSpan={2}></TableCell> {/* Empty cells for status and notes */}
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}