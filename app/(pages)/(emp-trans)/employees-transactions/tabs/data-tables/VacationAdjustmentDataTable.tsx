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
import { ArrowUpDown, Trash2 } from "lucide-react";

// --- Demo Data for Vacation Adjustments ---
const adjustmentTypes = ["Add Days", "Deduct Days", "Carry Forward", "Override"];

const vacationAdjustments = Array.from({ length: 20 }, (_, i) => {
    const transactionDate = new Date(2025, 10, 1 + i); // November 1st, 2025 onwards
    const type = adjustmentTypes[Math.floor(Math.random() * adjustmentTypes.length)];

    let daysChange;
    if (type === "Add Days") {
        daysChange = Math.floor(Math.random() * 5) + 1; // Add 1-5 days
    } else if (type === "Deduct Days") {
        daysChange = -(Math.floor(Math.random() * 5) + 1); // Deduct 1-5 days
    } else {
        daysChange = Math.floor(Math.random() * 2) - 1; // Add or deduct 0 or 1 day for others
    }

    return {
        id: `VA${1001 + i}`,
        transactionDate: transactionDate.toISOString().split('T')[0],
        transactionType: type,
        daysChange: daysChange,
        notes: i % 4 === 0 ? "Approved by HR" : "",
    };
});
// --- End of Demo Data ---

export function VacationAdjustmentDataTable() {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string; }>({ key: 'transactionDate', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Memoized sorting logic
    const sortedAdjustments = useMemo(() => {
        let sortableItems = [...vacationAdjustments];
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
        return sortedAdjustments.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, sortedAdjustments]);

    // Sort request handler
    const requestSort = (key: string) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const totalDaysChange = vacationAdjustments.reduce((sum, adjustment) => sum + adjustment.daysChange, 0);
    const totalPages = Math.ceil(vacationAdjustments.length / itemsPerPage);

    return (
        <div>
            <div className="w-full overflow-x-auto rounded-none">
                <Table>
                    <TableCaption>A list of vacation adjustment transactions.</TableCaption>
                    <TableHeader className="bg-blue-400 dark:bg-amber-400">
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead className="text-center">Delete</TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('transactionDate')}>
                                    Transaction Date <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Transaction Type</TableHead>
                            <TableHead className="text-center">Num. of Days (+/-)</TableHead>
                            <TableHead>Notes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentTableData.map((adjustment) => (
                            <TableRow key={adjustment.id}>
                                <TableCell className="text-center">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </TableCell>
                                <TableCell className="font-medium whitespace-nowrap">{adjustment.transactionDate}</TableCell>
                                <TableCell>
                                    <Badge variant={adjustment.transactionType === "Add Days" ? "default" : adjustment.transactionType === "Deduct Days" ? "destructive" : "secondary"}>
                                        {adjustment.transactionType}
                                    </Badge>
                                </TableCell>
                                <TableCell className={`text-center ${adjustment.daysChange > 0 ? 'text-green-600' : adjustment.daysChange < 0 ? 'text-red-600' : ''}`}>
                                    {adjustment.daysChange.toFixed(1)}
                                </TableCell>
                                <TableCell>{adjustment.notes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total Days Change (All Pages)</TableCell>
                            <TableCell className="text-center font-bold">
                                <span className={totalDaysChange > 0 ? 'text-green-600' : totalDaysChange < 0 ? 'text-red-600' : ''}>
                                    {totalDaysChange.toFixed(1)}
                                </span>
                            </TableCell>
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
