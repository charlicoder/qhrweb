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
import { Checkbox } from "@/components/ui/checkbox";
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
    TrendingUp,
    Calendar,
    FileText,
    Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
type IncreaseRecord = {
    id: string;
    increaseDate: string;
    increaseAmount: number;
    remainingAmount: number;
    addedInstallments: number;
    remainedInstallments: number;
    installmentAmount: number;
    status: "Approved" | "Pending" | "Rejected";
    notes: string;
    hasDocument: boolean;
};

// --- Mock Data Generator ---
const generateIncreaseData = (count: number): IncreaseRecord[] => {
    const statuses = ["Approved", "Pending", "Rejected"] as const;

    return Array.from({ length: count }).map((_, i) => {
        const increaseAmt = Math.floor(Math.random() * 10000) + 1000;
        const remaining = increaseAmt * 2.5; // Arbitrary logic

        return {
            id: `INC-${5000 + i}`,
            increaseDate: new Date(
                2025,
                Math.floor(Math.random() * 11),
                Math.floor(Math.random() * 28) + 1
            )
                .toISOString()
                .split("T")[0],
            increaseAmount: increaseAmt,
            remainingAmount: remaining,
            addedInstallments: Math.floor(Math.random() * 6) + 1,
            remainedInstallments: Math.floor(Math.random() * 24) + 12,
            installmentAmount: Math.floor(remaining / 24),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            notes: i % 2 === 0 ? "Request via Portal" : "Manual Adjustment",
            hasDocument: Math.random() > 0.3, // 70% chance of having a file
        };
    });
};

const ITEMS_PER_PAGE = 8;

const LoanIncreaseDataTable = () => {
    const [data, setData] = useState<IncreaseRecord[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

    useEffect(() => {
        const timer = setTimeout(() => {
            setData(generateIncreaseData(25));
            setIsLoading(false);
        }, 600);
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

    // Checkbox Logic
    const toggleRow = (id: string) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
    };

    const toggleAll = () => {
        if (selectedRows.size === currentData.length) {
            setSelectedRows(new Set());
        } else {
            const allIds = currentData.map((d) => d.id);
            setSelectedRows(new Set(allIds));
        }
    };

    // Helper for Status Badge with Dark Mode Support
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Approved":
                return "bg-green-100 text-green-700 border-green-200 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
            case "Pending":
                return "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800";
            case "Rejected":
                return "bg-red-100 text-red-700 border-red-200 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
            default:
                return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
        }
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(val);

    return (
        <div className="w-full flex justify-center bg-gray-50 dark:bg-background h-fit mt-5">
            <Card className="w-full shadow-sm border-t-4 border-t-emerald-600 h-fit dark:bg-card">
                {/* Accordion Wrapper */}
                <Accordion
                    type="single"
                    collapsible
                    defaultValue="table-view"
                    className="w-full"
                >
                    <AccordionItem value="table-view" className="border-none">
                        {/* Header / Trigger */}
                        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b dark:border-border">
                            <div className="space-y-1">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                                    Loan Increases
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Manage loan top-ups and installment
                                    adjustments.
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="hidden sm:block text-sm bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-600 dark:text-slate-400 font-medium">
                                    Records: {data.length}
                                </div>
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
                                                <TableHead className="w-[50px] text-center">
                                                    <Checkbox
                                                        checked={
                                                            currentData.length >
                                                                0 &&
                                                            selectedRows.size ===
                                                                currentData.length
                                                        }
                                                        onCheckedChange={
                                                            toggleAll
                                                        }
                                                        aria-label="Select all"
                                                    />
                                                </TableHead>
                                                <TableHead className="min-w-[130px]">
                                                    Increase Date
                                                </TableHead>
                                                <TableHead className="min-w-[140px] text-right">
                                                    Increase Amt.
                                                </TableHead>
                                                <TableHead className="min-w-[150px] text-right">
                                                    Remaining Amt.
                                                </TableHead>
                                                <TableHead className="min-w-[120px] text-center">
                                                    Added Inst.
                                                </TableHead>
                                                <TableHead className="min-w-[120px] text-center">
                                                    Remained Inst.
                                                </TableHead>
                                                <TableHead className="min-w-[140px] text-right">
                                                    Inst. Amount
                                                </TableHead>
                                                <TableHead className="min-w-[120px] text-center">
                                                    Status
                                                </TableHead>
                                                <TableHead className="min-w-[180px]">
                                                    Notes
                                                </TableHead>
                                                <TableHead className="min-w-[80px] text-center">
                                                    Doc
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {isLoading ? (
                                                Array.from({ length: 5 }).map(
                                                    (_, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell
                                                                colSpan={10}
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
                                                        <TableCell className="text-center">
                                                            <Checkbox
                                                                checked={selectedRows.has(
                                                                    row.id
                                                                )}
                                                                onCheckedChange={() =>
                                                                    toggleRow(
                                                                        row.id
                                                                    )
                                                                }
                                                                aria-label={`Select row ${row.id}`}
                                                            />
                                                        </TableCell>
                                                        <TableCell className="font-medium text-slate-700 dark:text-slate-200">
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                                                {
                                                                    row.increaseDate
                                                                }
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-right font-semibold text-emerald-700 dark:text-emerald-400">
                                                            {formatCurrency(
                                                                row.increaseAmount
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-right text-slate-600 dark:text-slate-400">
                                                            {formatCurrency(
                                                                row.remainingAmount
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-center dark:text-slate-300">
                                                            +
                                                            {
                                                                row.addedInstallments
                                                            }
                                                        </TableCell>
                                                        <TableCell className="text-center font-medium dark:text-slate-300">
                                                            {
                                                                row.remainedInstallments
                                                            }
                                                        </TableCell>
                                                        <TableCell className="text-right text-slate-600 dark:text-slate-400">
                                                            {formatCurrency(
                                                                row.installmentAmount
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Badge
                                                                variant="outline"
                                                                className={cn(
                                                                    "font-medium border shadow-none",
                                                                    getStatusBadge(
                                                                        row.status
                                                                    )
                                                                )}
                                                            >
                                                                {row.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell
                                                            className="text-muted-foreground text-xs max-w-[180px] truncate"
                                                            title={row.notes}
                                                        >
                                                            {row.notes}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {row.hasDocument ? (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
                                                                >
                                                                    <FileText className="h-4 w-4" />
                                                                </Button>
                                                            ) : (
                                                                <span className="text-slate-300 dark:text-slate-600">
                                                                    -
                                                                </span>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={10}
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

export default LoanIncreaseDataTable;
