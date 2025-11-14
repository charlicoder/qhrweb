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
import { ArrowUpDown, Eye } from "lucide-react"; // Eye icon for Details

// --- Demo Data for Loans ---
const loanStatuses = ["Active", "Paid", "Defaulted", "Pending"];
const loanTypes = ["Personal Loan", "Car Loan", "Home Loan", "Student Loan"];

const loans = Array.from({ length: 20 }, (_, i) => {
    const transactionDate = new Date(2025, 10, 1 + i); // November 1st, 2025 onwards
    const loanDeductStartDate = new Date(transactionDate);
    loanDeductStartDate.setDate(transactionDate.getDate() + Math.floor(Math.random() * 7) + 1); // 1-7 days after transaction date

    const type = loanTypes[Math.floor(Math.random() * loanTypes.length)];
    const loanAmount = Math.floor(Math.random() * 10000) + 500; // Loan amount between $500 and $10500
    const numInstallments = Math.floor(Math.random() * 36) + 12; // 12 to 48 installments
    const reference = `LOAN${1001 + i}`;
    const status = loanStatuses[Math.floor(Math.random() * loanStatuses.length)];
    const notes = i % 5 === 0 ? "Requires updated documentation" : "";

    return {
        id: `LN${1001 + i}`,
        transactionDate: transactionDate.toISOString().split('T')[0],
        loanDeductStartDate: loanDeductStartDate.toISOString().split('T')[0],
        transactionType: type,
        loanAmount: loanAmount,
        numInstallments: numInstallments,
        reference: reference,
        status: status,
        notes: notes,
        details: "View Loan Details", // Placeholder for details
    };
});
// --- End of Demo Data ---

export function LoansDataTable() {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string; }>({ key: 'transactionDate', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Memoized sorting logic
    const sortedLoans = useMemo(() => {
        let sortableItems = [...loans];
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
        return sortedLoans.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, sortedLoans]);

    // Sort request handler
    const requestSort = (key: string) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.loanAmount, 0);
    const totalInstallments = loans.reduce((sum, loan) => sum + loan.numInstallments, 0);
    const totalPages = Math.ceil(loans.length / itemsPerPage);

    // Function to handle details click (example: log to console)
    const handleViewDetails = (reference: string) => {
        console.log(`Viewing details for loan reference: ${reference}`);
        // In a real application, you would likely open a modal or navigate to a details page.
    };

    return (
        <div>
            <div className="w-full overflow-x-auto rounded-none">
                <Table>
                    <TableCaption>A list of loan transactions.</TableCaption>
                    <TableHeader className="bg-blue-400 dark:bg-amber-400">
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('transactionDate')}>
                                    Transaction Date <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('loanDeductStartDate')}>
                                    Loan Deduct Start Date <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Transaction Type</TableHead>
                            <TableHead className="text-right">
                                <Button variant="ghost" onClick={() => requestSort('loanAmount')}>
                                    Loan Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead className="text-center">Num. of Installments</TableHead>
                            <TableHead>Reference</TableHead>
                            <TableHead>Transaction Status</TableHead>
                            <TableHead>Notes</TableHead>
                            <TableHead className="text-center">Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentTableData.map((loan) => (
                            <TableRow key={loan.id}>
                                <TableCell className="font-medium whitespace-nowrap">{loan.transactionDate}</TableCell>
                                <TableCell className="whitespace-nowrap">{loan.loanDeductStartDate}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{loan.transactionType}</Badge>
                                </TableCell>
                                <TableCell className="text-right">${loan.loanAmount.toFixed(2)}</TableCell>
                                <TableCell className="text-center">{loan.numInstallments}</TableCell>
                                <TableCell>{loan.reference}</TableCell>
                                <TableCell>
                                    <Badge variant={loan.status === "Active" ? "outline" : loan.status === "Pending" ? "secondary" : "destructive"}>
                                        {loan.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{loan.notes}</TableCell>
                                <TableCell className="text-center">
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleViewDetails(loan.reference)}>
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total (All Pages)</TableCell>
                            <TableCell className="text-right font-bold">${totalLoanAmount.toFixed(2)}</TableCell>
                            <TableCell className="text-center font-bold">{totalInstallments}</TableCell>
                            <TableCell colSpan={5}></TableCell>
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
