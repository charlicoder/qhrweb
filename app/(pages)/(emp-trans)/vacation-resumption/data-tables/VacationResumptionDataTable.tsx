"use client";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Demo Data
const demoData = Array.from({ length: 42 }).map((_, i) => ({
    employeeId: `EMP-${1000 + i}`,
    employeeName: `Employee ${i + 1}`,
    transactionType: i % 2 === 0 ? "Leave" : "Adjustment",
    startDate: new Date(2024, 0, (i % 28) + 1).toISOString().split("T")[0],
    endDate: new Date(2024, 0, (i % 28) + 5).toISOString().split("T")[0],
    numDays: 5,
    amount: (i + 1) * 100,
    transactionStatus: i % 3 === 0 ? "Approved" : "Pending",
}));

const VacationResumptionDataTable = () => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const sortedData = (() => {
        if (!sortConfig.key) return demoData;
        return [...demoData].sort((a, b) => {
            const valA = a[sortConfig.key];
            const valB = b[sortConfig.key];
            if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
            if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    })();

    const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);
    const totalPages = Math.ceil(demoData.length / pageSize);

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="mt-5">
            <Table className="rounded-xl shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <TableHeader className="bg-blue-200 dark:bg-amber-200">
                    <TableRow>
                        <TableHead className="text-gray-700 dark:text-gray-900">Employee ID</TableHead>

                        <TableHead
                            onClick={() => requestSort("employeeName")}
                            className="cursor-pointer text-gray-700"
                        >
                            Employee Name{" "}
                            {sortConfig.key === "employeeName"
                                ? sortConfig.direction === "asc"
                                    ? "▲"
                                    : "▼"
                                : ""}
                        </TableHead>

                        <TableHead className="text-gray-700">Transaction Type</TableHead>

                        <TableHead
                            onClick={() => requestSort("startDate")}
                            className="cursor-pointer text-gray-700"
                        >
                            Start Date{" "}
                            {sortConfig.key === "startDate"
                                ? sortConfig.direction === "asc"
                                    ? "▲"
                                    : "▼"
                                : ""}
                        </TableHead>

                        <TableHead className="text-gray-700">End Date</TableHead>
                        <TableHead className="text-gray-700">Num. of Days</TableHead>
                        <TableHead className="text-gray-700">Amount</TableHead>
                        <TableHead className="text-gray-700">Transaction Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {paginatedData.map((row, index) => (
                        <TableRow
                            key={index}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                        >
                            <TableCell className="text-gray-800 dark:text-white">
                                {row.employeeId}
                            </TableCell>
                            <TableCell className="text-gray-800 dark:text-white">
                                {row.employeeName}
                            </TableCell>
                            <TableCell className="text-gray-800 dark:text-white">
                                {row.transactionType}
                            </TableCell>
                            <TableCell className="text-gray-800 dark:text-white">
                                {row.startDate}
                            </TableCell>
                            <TableCell className="text-gray-800 dark:text-white">
                                {row.endDate}
                            </TableCell>
                            <TableCell className="text-gray-800 dark:text-white">
                                {row.numDays}
                            </TableCell>
                            <TableCell className="text-gray-800 dark:text-white">
                                ${row.amount}
                            </TableCell>
                            <TableCell className="text-gray-800 dark:text-white">
                                {row.transactionStatus}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-4 text-gray-800 dark:text-gray-200">
                <Button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="dark:bg-gray-800 dark:text-white"
                >
                    Previous
                </Button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <Button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="dark:bg-gray-800 dark:text-white"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default VacationResumptionDataTable;
