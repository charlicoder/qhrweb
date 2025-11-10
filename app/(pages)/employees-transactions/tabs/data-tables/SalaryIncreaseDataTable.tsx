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
import { ArrowUpDown, Trash2 } from "lucide-react";

// --- Demo Data for Salary Increases ---
const salaryIncreases = Array.from({ length: 20 }, (_, i) => {
    const transactionDate = new Date(2025, 10, 1 + i); // November 1st, 2025 onwards
    const amount = Math.floor(Math.random() * 5000) + 1000; // Salary increase between $1000 and $6000

    return {
        id: `SI${1001 + i}`,
        transactionDate: transactionDate.toISOString().split('T')[0],
        amount: amount,
        notes: i % 3 === 0 ? "Approved by Payroll" : "",
    };
});
// --- End of Demo Data ---

export function SalaryIncreaseDataTable() {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string; }>({ key: 'transactionDate', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Memoized sorting logic
    const sortedIncreases = useMemo(() => {
        let sortableItems = [...salaryIncreases];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [sortConfig]);

    // Memoized pagination logic
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        const lastPageIndex = firstPageIndex + itemsPerPage;
        return sortedIncreases.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, sortedIncreases]);

    // Sort request handler
    const requestSort = (key: string) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const totalAmount = salaryIncreases.reduce((sum, increase) => sum + increase.amount, 0);
    const totalPages = Math.ceil(salaryIncreases.length / itemsPerPage);

    return (
        <div>
            <div className="w-full overflow-x-auto rounded-none">
                <Table>
                    <TableCaption>A list of recent salary increase transactions.</TableCaption>
                    <TableHeader className="bg-blue-400 dark:bg-amber-400">
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead className="text-center">Delete</TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('transactionDate')}>
                                    Transaction Date <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            {/* Ensuring 'text-right' is applied to the header for Amount */}
                            <TableHead className="text-right">
                                <Button variant="ghost" onClick={() => requestSort('amount')}>
                                    Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Notes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentTableData.map((increase) => (
                            <TableRow key={increase.id}>
                                <TableCell className="text-center">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </TableCell>
                                <TableCell className="font-medium whitespace-nowrap">{increase.transactionDate}</TableCell>
                                {/* Ensuring 'text-right' is applied to the cell for Amount */}
                                <TableCell className="text-right">${increase.amount.toFixed(2)}</TableCell>
                                <TableCell>{increase.notes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2}>Total (All Pages)</TableCell>
                            {/* Ensuring 'text-right' is applied to the footer cell for Amount */}
                            <TableCell className="text-right font-bold">${totalAmount.toFixed(2)}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            {/* Pagination Controls */}
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
