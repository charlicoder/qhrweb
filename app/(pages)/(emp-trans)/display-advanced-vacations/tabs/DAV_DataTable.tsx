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
import { ArrowUpDown } from "lucide-react"; // Removed unused icons
import { Badge } from "@/components/ui/badge";

// --- Define the type for your data rows ---
interface EmployeeTransaction {
    employeeId: string;
    employeeName: string;
    startDate: string;
    endDate: string;
    numberOfDays: number;
    amount: number;
    transactionStatus: string;
}

// --- Mock Data (replace with your actual data fetching) ---
const transactionTypes = ["Posted", "Unposted"];
const employeeNames = ["Alice Smith", "Bob Johnson", "Charlie Brown", "Diana Prince", "Ethan Hunt"];

const mockData: EmployeeTransaction[] = Array.from({ length: 25 }, (_, i) => {
    const startDate = new Date(2025, 9, 10 + i);
    const endDate = new Date(startDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const numberOfDays = Math.round(timeDiff / (1000 * 3600 * 24)) + 1;
    const amount = numberOfDays * (Math.random() * 100 + 50);

    return {
        employeeId: `EMP${1001 + i}`,
        employeeName: employeeNames[Math.floor(Math.random() * employeeNames.length)],
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        numberOfDays: numberOfDays,
        amount: parseFloat(amount.toFixed(2)),
        transactionStatus: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
    };
});
// --- End of Mock Data ---

interface SortConfig {
    key: keyof EmployeeTransaction | null;
    direction: 'ascending' | 'descending';
}

export function AdvancedVacationDataTable() {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const sortedTransactions = useMemo(() => {
        let sortableItems = [...mockData];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key as keyof EmployeeTransaction]; // Added type assertion
                const bValue = b[sortConfig.key as keyof EmployeeTransaction]; // Added type assertion

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

    const requestSort = (key: keyof EmployeeTransaction) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const totalAmount = mockData.reduce((sum, transaction) => sum + transaction.amount, 0);
    const totalPages = Math.ceil(mockData.length / itemsPerPage);

    return (
        <div>
            <div className="w-full overflow-x-auto rounded-non dark:bg-gray-900 dark:text-white">
                <Table>
                    <TableCaption>A list of employee transactions.</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('employeeId')}>
                                    Employee ID <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('employeeName')}>
                                    Employee Name <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
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
                            <TableHead className="text-center">
                                <Button variant="ghost" onClick={() => requestSort('numberOfDays')}>
                                    Num. of Days <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead className="text-right">
                                <Button variant="ghost" onClick={() => requestSort('amount')}>
                                    Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('transactionStatus')}>
                                    Transaction Status <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentTableData.map((transaction) => (
                            <React.Fragment key={transaction.employeeId}> {/* Use React.Fragment */}
                                <TableRow>
                                    <TableCell className="font-medium">{transaction.employeeId}</TableCell>
                                    <TableCell>{transaction.employeeName}</TableCell>
                                    <TableCell>{transaction.startDate}</TableCell>
                                    <TableCell>{transaction.endDate}</TableCell>
                                    <TableCell className="text-center">{transaction.numberOfDays.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={transaction.transactionStatus === "Posted" ? "outline" : "destructive"}
                                        >
                                            {transaction.transactionStatus}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5}>Total (All Pages)</TableCell>
                            <TableCell className="text-right font-bold">${totalAmount.toFixed(2)}</TableCell>
                            <TableCell></TableCell>
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
