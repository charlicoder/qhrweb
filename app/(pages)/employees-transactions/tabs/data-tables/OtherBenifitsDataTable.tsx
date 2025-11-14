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
import { ArrowUpDown } from "lucide-react";

// --- Demo Data for Other Benefits ---
const benefitTypes = ["Health Insurance", "Life Insurance", "Retirement Plan", "Wellness Program", "Gym Membership"];
const benefitStatuses = ["Active", "Pending", "Expired", "Cancelled"];

const otherBenefits = Array.from({ length: 20 }, (_, i) => {
    const startDate = new Date(2025, 10, 1 + i); // November 1st, 2025 onwards
    const numMonths = Math.floor(Math.random() * 12) + 3; // Benefit duration of 3-15 months
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + numMonths);

    const calculationDate = new Date(startDate);
    calculationDate.setDate(startDate.getDate() + Math.floor(Math.random() * 7) + 1); // Calculated a few days after start

    const type = benefitTypes[Math.floor(Math.random() * benefitTypes.length)];
    const amount = Math.floor(Math.random() * 500) + 50; // Benefit amount between $50 and $550
    const status = benefitStatuses[Math.floor(Math.random() * benefitStatuses.length)];
    const notes = i % 3 === 0 ? "Requires annual review" : "";

    return {
        id: `OB${1001 + i}`,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        calculationDate: calculationDate.toISOString().split('T')[0],
        transactionType: type,
        amount: amount,
        status: status,
        notes: notes,
    };
});
// --- End of Demo Data ---

export function OtherBenefitsDataTable() {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string; }>({ key: 'startDate', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Memoized sorting logic
    const sortedBenefits = useMemo(() => {
        let sortableItems = [...otherBenefits];
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
        return sortedBenefits.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, sortedBenefits]);

    // Sort request handler
    const requestSort = (key: string) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const totalAmount = otherBenefits.reduce((sum, benefit) => sum + benefit.amount, 0);
    const totalPages = Math.ceil(otherBenefits.length / itemsPerPage);

    return (
        <div>
            <div className="w-full overflow-x-auto rounded-none">
                <Table>
                    <TableCaption>A list of other benefits.</TableCaption>
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
                                    Date of Transaction Calculation <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Transaction Type</TableHead>
                            <TableHead className="text-right">
                                <Button variant="ghost" onClick={() => requestSort('amount')}>
                                    Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Transaction Status</TableHead>
                            <TableHead>Notes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentTableData.map((benefit) => (
                            <TableRow key={benefit.id}>
                                <TableCell className="font-medium whitespace-nowrap">{benefit.startDate}</TableCell>
                                <TableCell className="whitespace-nowrap">{benefit.endDate}</TableCell>
                                <TableCell className="whitespace-nowrap">{benefit.calculationDate}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{benefit.transactionType}</Badge>
                                </TableCell>
                                <TableCell className="text-right">${benefit.amount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Badge variant={benefit.status === "Active" ? "outline" : benefit.status === "Pending" ? "secondary" : "destructive"}>
                                        {benefit.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{benefit.notes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total (All Pages)</TableCell>
                            <TableCell className="text-right font-bold">${totalAmount.toFixed(2)}</TableCell>
                            <TableCell colSpan={2}></TableCell>
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
