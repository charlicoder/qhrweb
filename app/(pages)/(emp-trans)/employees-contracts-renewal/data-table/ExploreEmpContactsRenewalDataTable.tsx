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
import { Badge } from "@/components/ui/badge";
import { 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  FileSignature, 
  CalendarDays
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
type ContractRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  startDate: string;
  expiryDate: string;
  contractType: "Permanent" | "Temporary" | "Consultant" | "Casual";
  notes: string;
};

// --- Mock Data Generator ---
const generateMockData = (count: number): ContractRecord[] => {
  const types = ["Permanent", "Temporary", "Consultant", "Casual"] as const;
  
  return Array.from({ length: count }).map((_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const startYear = 2020 + Math.floor(Math.random() * 5);
    const endYear = startYear + Math.floor(Math.random() * 3) + 1;
    
    return {
      id: `CON-${1000 + i}`,
      employeeId: `${10800 + i}`,
      employeeName: i % 2 === 0 ? "Abdullah Hamed Hemida" : "John Doe Smith",
      startDate: new Date(startYear, Math.floor(Math.random() * 11), 1).toISOString().split('T')[0],
      expiryDate: new Date(endYear, Math.floor(Math.random() * 11), 28).toISOString().split('T')[0],
      contractType: type,
      notes: i % 3 === 0 ? "Renewal Pending" : i % 5 === 0 ? "Visa Expiring Soon" : "-",
    };
  });
};

const ITEMS_PER_PAGE = 8;

const ExploreEmpContractDataTable = () => {
  const [data, setData] = useState<ContractRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(generateMockData(35));
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

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this contract record?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
      if (currentData.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    }
  };

  // Helper for Badge Colors
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Permanent": 
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700";
      case "Temporary": 
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700";
      case "Consultant": 
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-700";
      case "Casual": 
        return "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600";
      default: 
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="w-full flex justify-center bg-gray-50 dark:bg-background p-4 min-h-[500px]">
      <Card className="w-full max-w-[1400px] shadow-sm border-t-4 border-t-blue-600 dark:border-t-blue-500 dark:bg-card">
        
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b dark:border-border">
          <div className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <FileSignature className="h-5 w-5 text-blue-600 dark:text-blue-500"/> 
              Employee Contracts
            </CardTitle>
            <p className="text-sm text-muted-foreground dark:text-slate-400">
              Manage contract renewals and expirations.
            </p>
          </div>
          <div className="hidden sm:block text-sm bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-600 dark:text-slate-300 font-medium">
            Total Contracts: {data.length}
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Responsive Scroll Wrapper */}
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-b dark:border-slate-800">
                  <TableHead className="w-[80px] text-center text-slate-600 dark:text-slate-400">Delete</TableHead>
                  <TableHead className="min-w-[120px] text-slate-600 dark:text-slate-400">Employee ID</TableHead>
                  <TableHead className="min-w-[200px] text-slate-600 dark:text-slate-400">Employee Name</TableHead>
                  <TableHead className="min-w-[150px] text-slate-600 dark:text-slate-400">Contract Start</TableHead>
                  <TableHead className="min-w-[150px] text-slate-600 dark:text-slate-400">Contract Expiry</TableHead>
                  <TableHead className="min-w-[140px] text-center text-slate-600 dark:text-slate-400">Contract Type</TableHead>
                  <TableHead className="min-w-[200px] text-slate-600 dark:text-slate-400">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={7} className="h-12 text-center text-muted-foreground animate-pulse">
                        Loading contracts...
                      </TableCell>
                    </TableRow>
                  ))
                ) : currentData.length > 0 ? (
                  currentData.map((row) => (
                    <TableRow key={row.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors border-b dark:border-slate-800">
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
                      <TableCell className="font-medium text-slate-700 dark:text-slate-200">
                        {row.employeeId}
                      </TableCell>
                      <TableCell className="text-slate-700 dark:text-slate-300">
                        {row.employeeName}
                      </TableCell>
                      <TableCell className="text-muted-foreground dark:text-slate-400">
                        <div className="flex items-center gap-2 text-sm">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {row.startDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground dark:text-slate-400">
                         <div className="flex items-center gap-2 text-sm">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {row.expiryDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={cn("font-medium border shadow-none", getTypeBadge(row.contractType))}>
                          {row.contractType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate dark:text-slate-500" title={row.notes}>
                        {row.notes}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center dark:text-muted-foreground">
                      No contracts found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex items-center justify-between border-t py-4 bg-slate-50/30 dark:bg-slate-900/20 dark:border-border">
          <div className="text-xs text-muted-foreground dark:text-slate-400">
             Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(endIndex, data.length)}</strong> of <strong>{data.length}</strong> entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1 || isLoading}
              className="h-8 w-8 p-0 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages || isLoading}
              className="h-8 w-8 p-0 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExploreEmpContractDataTable;