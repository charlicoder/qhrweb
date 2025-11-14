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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, FileDown, Trash2 } from "lucide-react";

// --- Demo Data for Vacations ---
const vacationTransactionTypes = ["Full Vacation", "Half Vacation", "Compensatory Off"];
const vacationTransactionStatuses = ["Approved", "Pending", "Rejected"];

const vacations = Array.from({ length: 20 }, (_, i) => {
    // Generate random dates
    const startDate = new Date(2025, 10, 1 + i); // Start from November 1st, 2025
    const numDays = Math.floor(Math.random() * 5) + 1; // 1 to 5 days
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + numDays - 1);
    const calculationDate = new Date(endDate);
    calculationDate.setDate(endDate.getDate() + Math.floor(Math.random() * 5) + 1); // Calculation date 1-5 days after end date
    const expectedReturnDate = new Date(endDate);
    expectedReturnDate.setDate(endDate.getDate() + 1);

    const type = vacationTransactionTypes[Math.floor(Math.random() * vacationTransactionTypes.length)];
    const amount = Math.floor(Math.random() * 200) + 50; // Example amount

    return {
        id: `VAC${1001 + i}`,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        calculationDate: calculationDate.toISOString().split('T')[0],
        expectedReturnDate: expectedReturnDate.toISOString().split('T')[0],
        transactionType: type,
        numDays: numDays,
        amount: amount,
        status: vacationTransactionStatuses[Math.floor(Math.random() * vacationTransactionStatuses.length)],
        notes: i % 5 === 0 ? "Requires manager's sign-off" : "",
    };
});
// --- End of Demo Data ---

export function VacationsDataTable() {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string; }>({ key: 'startDate', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Memoized sorting logic
    const sortedVacations = useMemo(() => {
        let sortableItems = [...vacations];
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
        return sortedVacations.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, sortedVacations]);

    // Sort request handler
    const requestSort = (key: string) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const totalAmount = vacations.reduce((sum, vacation) => sum + vacation.amount, 0);
    const totalPages = Math.ceil(vacations.length / itemsPerPage);

    return (
        <div>
            <div className="w-full overflow-x-auto rounded-none">
                <Table>
                    <TableCaption>A list of recent vacation transactions.</TableCaption>
                    <TableHeader className="bg-blue-400 dark:bg-amber-400">
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
                                <Button variant="ghost" onClick={() => requestSort('calculationDate')}>
                                    Date of Trx Calculation <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('expectedReturnDate')}>
                                    Expected Return Date <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Transaction Type</TableHead>
                            <TableHead className="text-center">Num. of Days</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Transaction Status</TableHead>
                            <TableHead>Notes</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentTableData.map((vacation) => (
                            <TableRow key={vacation.id}>
                                <TableCell className="font-medium whitespace-nowrap">{vacation.startDate}</TableCell>
                                <TableCell className="whitespace-nowrap">{vacation.endDate}</TableCell>
                                <TableCell className="whitespace-nowrap">{vacation.calculationDate}</TableCell>
                                <TableCell className="whitespace-nowrap">{vacation.expectedReturnDate}</TableCell>
                                <TableCell>
                                    <Badge variant={vacation.transactionType === "Full Vacation" ? "default" : "secondary"}>
                                        {vacation.transactionType}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">{vacation.numDays}</TableCell>
                                <TableCell className="text-right">${vacation.amount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Badge variant={vacation.status === "Approved" ? "outline" : vacation.status === "Pending" ? "secondary" : "destructive"}>
                                        {vacation.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{vacation.notes}</TableCell>
                                <TableCell className="text-center">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6}>Total (All Pages)</TableCell>
                            <TableCell className="text-right font-bold">${totalAmount.toFixed(2)}</TableCell>
                            <TableCell colSpan={3}></TableCell>
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
