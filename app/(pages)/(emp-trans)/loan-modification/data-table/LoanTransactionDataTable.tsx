"use client";

import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
    ChevronLeft,
    ChevronRight,
    CreditCard,
    CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
type LoanTransaction = {
    id: string;
    transactionDate: string;
    transactionType:
        | "Loan Issue"
        | "Installment"
        | "Postponement"
        | "Early Settlement";
    loanAmount: number;
    numInstallments: number;
    remainedInstallments: number;
    notes: string;
};

// --- Mock Data Generator ---
const generateMockData = (count: number): LoanTransaction[] => {
    const types = [
        "Loan Issue",
        "Installment",
        "Postponement",
        "Early Settlement",
    ] as const;

    return Array.from({ length: count }).map((_, i) => {
        const type = types[Math.floor(Math.random() * types.length)];
        const totalInst = Math.floor(Math.random() * 24) + 12; // 12 to 36 months
        const remained =
            type === "Loan Issue"
                ? totalInst
                : Math.floor(Math.random() * totalInst);

        return {
            id: `TRX-${2025000 + i}`,
            transactionDate: new Date(
                2025,
                Math.floor(Math.random() * 11),
                Math.floor(Math.random() * 28) + 1
            )
                .toISOString()
                .split("T")[0],
            transactionType: type,
            loanAmount: Math.floor(Math.random() * 50000) + 5000,
            numInstallments: totalInst,
            remainedInstallments: type === "Early Settlement" ? 0 : remained,
            notes:
                i % 3 === 0
                    ? "Approved by HR"
                    : i % 4 === 0
                    ? "System Auto-deduction"
                    : "-",
        };
    });
};

const ITEMS_PER_PAGE = 8;

const LoanTransactionDataTable = () => {
    // Use state for data to simulate fetching
    const [data, setData] = useState<LoanTransaction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API delay
        const timer = setTimeout(() => {
            setData(generateMockData(40));
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // Pagination Logic
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentData = data.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    // Helper for Badge Colors with Dark Mode Support
    const getTypeBadge = (type: string) => {
        switch (type) {
            case "Loan Issue":
                return "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
            case "Installment":
                return "bg-green-100 text-green-800 hover:bg-green-200 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
            case "Postponement":
                return "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800";
            case "Early Settlement":
                return "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800";
            default:
                return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
        }
    };

    return (
        <div className="w-full flex justify-center bg-gray-50 dark:bg-background h-fit">
            <Card className="w-full shadow-sm border-t-4 border-t-indigo-600 h-fit dark:bg-card">
                {/* Accordion Wrapper */}
                <Accordion
                    type="single"
                    collapsible
                    defaultValue="table-view"
                    className="w-full"
                >
                    <AccordionItem value="table-view" className="border-none">
                        {/* Header acts as the trigger container */}
                        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b dark:border-border">
                            <div className="space-y-1">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                    Loan Transactions
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    History of loans, installments, and
                                    adjustments.
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="hidden sm:block text-sm bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-600 dark:text-slate-400 font-medium">
                                    Total Records: {data.length}
                                </div>
                                {/* The Chevron Trigger */}
                                <AccordionTrigger className="py-0 hover:no-underline" />
                            </div>
                        </CardHeader>

                        {/* Collapsible Content */}
                        <AccordionContent className="p-0">
                            <CardContent className="p-0">
                                <div className="w-full overflow-x-auto">
                                    <Table>
                                        <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                                            <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                                                <TableHead className="min-w-[140px]">
                                                    Transaction Date
                                                </TableHead>
                                                <TableHead className="min-w-[160px]">
                                                    Transaction Type
                                                </TableHead>
                                                <TableHead className="min-w-[140px] text-right">
                                                    Loan Amount
                                                </TableHead>
                                                <TableHead className="min-w-[140px] text-center">
                                                    Num. of Inst.
                                                </TableHead>
                                                <TableHead className="min-w-[140px] text-center">
                                                    Remained Inst.
                                                </TableHead>
                                                <TableHead className="min-w-[200px]">
                                                    Notes
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {isLoading ? (
                                                Array.from({ length: 5 }).map(
                                                    (_, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell
                                                                colSpan={6}
                                                                className="h-12 text-center text-muted-foreground animate-pulse"
                                                            >
                                                                Loading data...
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )
                                            ) : currentData.length > 0 ? (
                                                currentData.map((row) => (
                                                    <TableRow
                                                        key={row.id}
                                                        className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors border-b dark:border-border"
                                                    >
                                                        <TableCell className="font-medium text-slate-700 dark:text-slate-200">
                                                            <div className="flex items-center gap-2">
                                                                <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                                                                {
                                                                    row.transactionDate
                                                                }
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant="outline"
                                                                className={cn(
                                                                    "font-medium border shadow-none",
                                                                    getTypeBadge(
                                                                        row.transactionType
                                                                    )
                                                                )}
                                                            >
                                                                {
                                                                    row.transactionType
                                                                }
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right font-semibold text-slate-700 dark:text-slate-200">
                                                            {new Intl.NumberFormat(
                                                                "en-US",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "USD",
                                                                }
                                                            ).format(
                                                                row.loanAmount
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-center dark:text-slate-300">
                                                            {
                                                                row.numInstallments
                                                            }
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <span
                                                                className={cn(
                                                                    "font-bold",
                                                                    row.remainedInstallments ===
                                                                        0
                                                                        ? "text-green-600 dark:text-green-500"
                                                                        : "text-slate-600 dark:text-slate-400"
                                                                )}
                                                            >
                                                                {
                                                                    row.remainedInstallments
                                                                }
                                                            </span>
                                                        </TableCell>
                                                        <TableCell
                                                            className="text-muted-foreground text-sm max-w-[200px] truncate"
                                                            title={row.notes}
                                                        >
                                                            {row.notes}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={6}
                                                        className="h-24 text-center dark:text-muted-foreground"
                                                    >
                                                        No records found.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>

                            <CardFooter className="flex items-center justify-between border-t py-4 bg-slate-50/30 dark:bg-slate-900/20 dark:border-border">
                                <div className="text-xs text-muted-foreground">
                                    Page <strong>{currentPage}</strong> of{" "}
                                    <strong>{totalPages}</strong>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handlePrevPage}
                                        disabled={
                                            currentPage === 1 || isLoading
                                        }
                                        className="h-8 w-8 p-0"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleNextPage}
                                        disabled={
                                            currentPage === totalPages ||
                                            isLoading
                                        }
                                        className="h-8 w-8 p-0"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Card>
        </div>
    );
};

export default LoanTransactionDataTable;
