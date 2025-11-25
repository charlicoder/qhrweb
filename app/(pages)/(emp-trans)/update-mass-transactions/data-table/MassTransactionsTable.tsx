"use client";

import React, { useState } from "react";
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
import { Trash2, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
type TransactionRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  calcDate: string;
  type: string;
  duration: string;
  amount: number;
  notes: string;
};

// --- Mock Data Generator ---
const generateMockData = (count: number): TransactionRecord[] => {
  const types = ["Overtime", "Leave", "Bonus", "Deduction", "Adjustment"];
  const notes = ["Approved", "Pending Review", "System Auto-gen", "Manual Entry", "-"];
  
  return Array.from({ length: count }).map((_, i) => ({
    id: `REC-${1000 + i}`,
    employeeId: `${10800 + i}`,
    employeeName: i % 2 === 0 ? "Abdullah Hamed Hemida" : "John Doe Smith",
    startDate: "2025-11-01",
    endDate: "2025-11-30",
    calcDate: "2025-12-05",
    type: types[Math.floor(Math.random() * types.length)],
    duration: `${Math.floor(Math.random() * 8) + 1} hrs`,
    amount: Math.floor(Math.random() * 5000) + 100,
    notes: notes[Math.floor(Math.random() * notes.length)],
  }));
};

const ITEMS_PER_PAGE = 10;

const MassTransactionTable = () => {
  const [data, setData] = useState<TransactionRecord[]>(generateMockData(45));
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
      // Adjust page if deleting last item on page
      if (currentData.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    }
  };

  return (
    <div className="w-full flex justify-center bg-white dark:bg-background mt-5">
      <Card className="w-full shadow-sm border-t-4 border-t-blue-600 dark:bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400"/> 
                Mass Transaction Records
            </CardTitle>
            <div className="text-sm text-muted-foreground">
                Total Records: <span className="font-medium text-foreground dark:text-slate-200">{data.length}</span>
            </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Wrapper for responsive scrolling */}
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader className="bg-blue-100 dark:bg-blue-950/40">
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                  <TableHead className="w-[80px] text-center">Delete</TableHead>
                  <TableHead className="min-w-[100px]">Employee ID</TableHead>
                  <TableHead className="min-w-[200px]">Employee Name</TableHead>
                  <TableHead className="min-w-[120px]">Start Date</TableHead>
                  <TableHead className="min-w-[120px]">End Date</TableHead>
                  <TableHead className="min-w-[180px]">Calc Date</TableHead>
                  <TableHead className="min-w-[120px]">Type</TableHead>
                  <TableHead className="min-w-[100px]">Duration</TableHead>
                  <TableHead className="min-w-[120px] text-right">Amount</TableHead>
                  <TableHead className="min-w-[200px]">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((row) => (
                    <TableRow key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 dark:border-slate-800">
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                          onClick={() => handleDelete(row.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium dark:text-slate-200">{row.employeeId}</TableCell>
                      <TableCell className="dark:text-slate-200">{row.employeeName}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{row.startDate}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{row.endDate}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{row.calcDate}</TableCell>
                      <TableCell>
                        <span className={cn(
                            "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                            row.type === "Overtime" ? "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/30" :
                            row.type === "Deduction" ? "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-500/30" :
                            "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-500/30"
                        )}>
                            {row.type}
                        </span>
                      </TableCell>
                      <TableCell className="dark:text-slate-200">{row.duration}</TableCell>
                      <TableCell className="text-right font-medium dark:text-slate-200">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.amount)}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm truncate max-w-[200px]" title={row.notes}>
                        {row.notes}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center dark:text-muted-foreground">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t py-4 dark:border-slate-800">
          <div className="text-xs text-muted-foreground">
            Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(endIndex, data.length)}</strong> of <strong>{data.length}</strong> entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium dark:text-slate-200">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MassTransactionTable;