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

// --- Demo Data for Vacation Compensation (same structure as exemptions) ---
const vacationCompensationTypes = ["Standard", "Special", "Bonus"]; // Example types
const exemptionStatusOptions = ["None", "Partial", "Full"]; // Example types for 'Exempted' status

const vacationCompensations = Array.from({ length: 20 }, (_, i) => {
    const transactionDate = new Date(2025, 10, 1 + i); // November 1st, 2025 onwards
    const numDays = Math.floor(Math.random() * 10) + 1; // 1 to 10 days
    const amount = Math.floor(Math.random() * 500) + 100; // $100 to $600

    const isExempted = Math.random() > 0.5; // 50% chance of being exempted
    const exemptionStatus = isExempted ? exemptionStatusOptions[Math.floor(Math.random() * (exemptionStatusOptions.length - 1)) + 1] : "None"; // If exempted, pick from Partial/Full
    const exemptionAmount = isExempted ? Math.floor(Math.random() * amount) : 0; // Exemption amount is random if exempted, else 0

    return {
        id: `VC${1001 + i}`,
        transactionDate: transactionDate.toISOString().split('T')[0],
        transactionType: vacationCompensationTypes[Math.floor(Math.random() * vacationCompensationTypes.length)],
        numDays: numDays,
        amount: amount,
        exempted: isExempted,
        exemptionStatus: exemptionStatus,
        exemptionAmount: exemptionAmount,
        documentFile: `doc_${1001 + i}.pdf`,
        notes: i % 3 === 0 ? "Manager review required" : "",
    };
});
// --- End of Demo Data ---

export function VacationCompensationDataTable() {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string; }>({ key: 'transactionDate', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Memoized sorting logic
    const sortedVacationCompensations = useMemo(() => {
        let sortableItems = [...vacationCompensations];
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
        return sortedVacationCompensations.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, sortedVacationCompensations]);

    // Sort request handler
    const requestSort = (key: string) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const totalAmount = vacationCompensations.reduce((sum, vc) => sum + vc.amount, 0);
    const totalExemptionAmount = vacationCompensations.reduce((sum, vc) => sum + vc.exemptionAmount, 0);
    const totalPages = Math.ceil(vacationCompensations.length / itemsPerPage);

    return (
        <div>
            <div className="w-full overflow-x-auto rounded-none">
                <Table>
                    <TableCaption>A list of vacation compensation transactions.</TableCaption>
                    <TableHeader className="bg-blue-400 dark:bg-amber-400">
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead className="text-center">Delete</TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('transactionDate')}>
                                    Transaction Date <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Transaction Type</TableHead>
                            <TableHead className="text-center">Num. of Days</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-center">Exempted</TableHead>
                            <TableHead className="text-right">Exemption Amount</TableHead>
                            <TableHead className="text-center">Document File</TableHead>
                            <TableHead>Notes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentTableData.map((vc) => (
                            <TableRow key={vc.id}>
                                <TableCell className="text-center">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </TableCell>
                                <TableCell className="font-medium whitespace-nowrap">{vc.transactionDate}</TableCell>
                                <TableCell>
                                    <Badge variant={vc.transactionType === "Bonus" ? "default" : "secondary"}>
                                        {vc.transactionType}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">{vc.numDays}</TableCell>
                                <TableCell className="text-right">${vc.amount.toFixed(2)}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={vc.exempted ? "outline" : "secondary"}>
                                        {vc.exemptionStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {vc.exemptionAmount > 0 ? `$${vc.exemptionAmount.toFixed(2)}` : "-"}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                        <FileDown className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                                <TableCell>{vc.notes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total (All Pages)</TableCell>
                            <TableCell className="text-center font-bold">{vacationCompensations.reduce((sum, item) => sum + item.numDays, 0)}</TableCell>
                            <TableCell className="text-right font-bold">${totalAmount.toFixed(2)}</TableCell>
                            <TableCell colSpan={1}></TableCell>
                            <TableCell className="text-right font-bold">${totalExemptionAmount.toFixed(2)}</TableCell>
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
