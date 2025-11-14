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

// --- Demo Data for Employees ---
const transactionStatuses = ["Completed", "Pending", "Failed", "Processing"];
const transactionTypes = ["Salary", "Bonus", "Reimbursement", "Deduction"];
const transactionPeriods = ["Monthly", "Quarterly", "Annually", "One-Time"];
const projectNameOptions = ["Project Alpha", "Project Beta", "Project Gamma", "Internal Tools", "R&D"];

const employees = Array.from({ length: 25 }, (_, i) => {
    const transactionDate = new Date(2025, 10, 1 + i * 2); // Every two days in November 2025
    const transactionAmount = Math.floor(Math.random() * 5000) + 100; // Amount between $100 and $5100
    const status = transactionStatuses[Math.floor(Math.random() * transactionStatuses.length)];
    const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    const period = transactionPeriods[Math.floor(Math.random() * transactionPeriods.length)];
    const projectName = projectNameOptions[Math.floor(Math.random() * projectNameOptions.length)];

    return {
        id: `EMP${1001 + i}`,
        employeeId: `E${1001 + i}`,
        employeeName: `Employee Name ${i + 1}`,
        transactionDate: transactionDate.toISOString().split('T')[0],
        transactionPeriod: period,
        transactionAmount: transactionAmount,
        transactionName: `Transaction ${type} for ${period}`,
        transactionType: type,
        projectName: projectName,
        transactionStatus: status,
    };
});
// --- End of Demo Data ---

export function MassTransactionDataTable() {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string; }>({ key: 'transactionDate', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Memoized sorting logic
    const sortedEmployees = useMemo(() => {
        let sortableItems = [...employees];
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
        return sortedEmployees.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, sortedEmployees]);

    // Sort request handler
    const requestSort = (key: string) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const totalTransactionAmount = employees.reduce((sum, emp) => sum + emp.transactionAmount, 0);
    const totalPages = Math.ceil(employees.length / itemsPerPage);

    // Function to determine badge color based on status
    const getBadgeVariant = (status: string) => {
        switch (status) {
            case "Completed":
                return "outline";
            case "Pending":
                return "secondary";
            case "Processing":
                return "outline"; // Could also be secondary or a custom color
            case "Failed":
                return "destructive";
            default:
                return "default";
        }
    };

    return (
        <div>
            <div className="w-full overflow-x-auto rounded-none">
                <Table>
                    <TableCaption>A list of employee transactions.</TableCaption>
                    <TableHeader className="bg-blue-400 dark:bg-amber-400">
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
                                <Button variant="ghost" onClick={() => requestSort('transactionDate')}>
                                    Transaction Date <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => requestSort('transactionPeriod')}>
                                    Transaction Period <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead className="text-right">
                                <Button variant="ghost" onClick={() => requestSort('transactionAmount')}>
                                    Transaction Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Transaction Name</TableHead>
                            <TableHead>Transaction Type</TableHead>
                            <TableHead>Project Name</TableHead>
                            <TableHead className="text-center">Transaction Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentTableData.map((emp) => (
                            <TableRow key={emp.id}>
                                <TableCell className="font-medium">{emp.employeeId}</TableCell>
                                <TableCell>{emp.employeeName}</TableCell>
                                <TableCell className="whitespace-nowrap">{emp.transactionDate}</TableCell>
                                <TableCell>{emp.transactionPeriod}</TableCell>
                                <TableCell className="text-right">${emp.transactionAmount.toFixed(2)}</TableCell>
                                <TableCell>{emp.transactionName}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{emp.transactionType}</Badge>
                                </TableCell>
                                <TableCell>{emp.projectName}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={getBadgeVariant(emp.transactionStatus)}>
                                        {emp.transactionStatus}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total (All Pages)</TableCell>
                            <TableCell className="text-right font-bold">${totalTransactionAmount.toFixed(2)}</TableCell>
                            <TableCell colSpan={4}></TableCell>
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
