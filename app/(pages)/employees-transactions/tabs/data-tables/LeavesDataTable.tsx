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

// --- Demo Data for Leaves ---
const leaveTransactionTypes = ["Annual Leave", "Sick Leave", "Personal Leave", "Unpaid Leave"];
const leaveTransactionStatuses = ["Approved", "Pending", "Rejected"];
const leaveDepartments = ["Engineering/HQ", "Marketing/North", "Operations/West", "HR/HQ"];

const leaves = Array.from({ length: 20 }, (_, i) => {
    const hours = Math.floor(Math.random() * 8) + 1;
    const type = leaveTransactionTypes[Math.floor(Math.random() * leaveTransactionTypes.length)];
    const rate = type === "Annual Leave" ? 45.50 : 25.00; // Example rates, adjust as needed

    // Generate random times for From Time and To Time
    const fromHour = Math.floor(Math.random() * 10) + 8; // 8 AM to 5 PM
    const fromMinute = Math.floor(Math.random() * 60);
    const toHour = fromHour + Math.floor(Math.random() * 4) + 1; // Max 4 hours after fromHour
    const toMinute = Math.floor(Math.random() * 60);

    return {
        id: `LV${1001 + i}`,
        transactionDate: `2025-11-${String(1 + i).padStart(2, '0')}`,
        calculationDate: `2025-12-${String(1 + i).padStart(2, '0')}`,
        fromTime: `${String(fromHour).padStart(2, '0')}:${String(fromMinute).padStart(2, '0')}`,
        toTime: `${String(toHour).padStart(2, '0')}:${String(toMinute).padStart(2, '0')}`,
        transactionType: type,
        hours: hours, // This might need recalculation based on fromTime and toTime for accuracy
        amount: hours * rate, // Placeholder amount, calculate based on actual hours and rate
        departmentBranch: leaveDepartments[Math.floor(Math.random() * leaveDepartments.length)],
        status: leaveTransactionStatuses[Math.floor(Math.random() * leaveTransactionStatuses.length)],
        documentFile: `doc_${1001 + i}.pdf`,
        notes: i % 4 === 0 ? "Manager approval pending" : "",
    };
});
// --- End of Demo Data ---

export function LeavesDataTable() {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string; }>({ key: 'transactionDate', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Memoized sorting logic
    const sortedLeaves = useMemo(() => {
        let sortableItems = [...leaves];
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
        return sortedLeaves.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, sortedLeaves]);

    // Sort request handler
    const requestSort = (key: string) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const totalAmount = leaves.reduce((sum, leave) => sum + leave.amount, 0);
    const totalPages = Math.ceil(leaves.length / itemsPerPage);

    return (
        <div>
            <div className="w-full overflow-x-auto rounded-none mx-0">
                <Table>
                    <TableCaption>A list of recent leave transactions.</TableCaption>
                    <TableHeader className="bg-blue-400 dark:bg-amber-400">
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('transactionDate')}>
                                    Trx Date <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('calculationDate')}>
                                    Date of Trx Calculation <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>From Time</TableHead>
                            <TableHead>To Time</TableHead>
                            <TableHead>Trx Type</TableHead>
                            <TableHead className="text-center">Num. of Hours</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Dept and Branches</TableHead>
                            <TableHead>Trx Status</TableHead>
                            <TableHead className="text-center">Document File</TableHead>
                            <TableHead>Notes</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentTableData.map((leave) => (
                            <TableRow key={leave.id}>
                                <TableCell className="font-medium whitespace-nowrap">{leave.transactionDate}</TableCell>
                                <TableCell className="whitespace-nowrap">{leave.calculationDate}</TableCell>
                                <TableCell>{leave.fromTime}</TableCell>
                                <TableCell>{leave.toTime}</TableCell>
                                <TableCell>
                                    <Badge variant={leave.transactionType === "Annual Leave" ? "default" : "secondary"}>
                                        {leave.transactionType}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">{leave.hours.toFixed(2)}</TableCell>
                                <TableCell className="text-right">${leave.amount.toFixed(2)}</TableCell>
                                <TableCell>{leave.departmentBranch}</TableCell>
                                <TableCell>
                                    <Badge variant={leave.status === "Approved" ? "outline" : leave.status === "Pending" ? "secondary" : "destructive"}>
                                        {leave.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                        <FileDown className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                                <TableCell>{leave.notes}</TableCell>
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
