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

// --- Demo Data (same as before) ---
const transactionTypes = ["Holiday-OT", "Regular-OT"];
const transactionStatuses = ["Posted", "Unposted"];
const projectNames = ["Project Phoenix", "Quantum Leap", "Odyssey Initiative", "Starlight Project"];
const departments = ["Engineering/HQ", "Marketing/North", "Operations/West", "HR/HQ"];

const transactions = Array.from({ length: 20 }, (_, i) => {
  const hours = Math.floor(Math.random() * 8) + 1;
  const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
  const rate = type === "Holiday-OT" ? 45.50 : 25.00;
  
  return {
    id: `TXN${1001 + i}`,
    transactionDate: `2025-10-${String(10 + i).padStart(2, '0')}`,
    calculationDate: `2025-11-${String(1 + i).padStart(2, '0')}`,
    transactionType: type,
    hours: hours,
    amount: hours * rate,
    projectName: projectNames[Math.floor(Math.random() * projectNames.length)],
    departmentBranch: departments[Math.floor(Math.random() * departments.length)],
    status: transactionStatuses[Math.floor(Math.random() * transactionStatuses.length)],
    documentFile: `doc_${1001 + i}.pdf`,
    notes: i % 3 === 0 ? "Approved by manager" : "",
  };
});
// --- End of Demo Data ---

export function OvertimeDataTable() {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string; }>({ key: 'transactionDate', direction: 'descending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Memoized sorting logic
  const sortedTransactions = useMemo(() => {
    let sortableItems = [...transactions];
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
    return sortedTransactions.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedTransactions]);

  // Sort request handler
  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  return (
    <div>
      <div className="w-full overflow-x-auto border rounded-lg">
        <Table>
          <TableCaption>A list of recent overtime transactions.</TableCaption>
          <TableHeader>
            {/* 1. Added background color to the header row */}
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('transactionDate')}>
                  Transaction Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                 <Button variant="ghost" onClick={() => requestSort('calculationDate')}>
                  Calculation Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Transaction Type</TableHead>
              <TableHead className="text-center">Hours</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>
                 <Button variant="ghost" onClick={() => requestSort('projectName')}>
                  Project Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Dept./Branch</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Document</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTableData.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium whitespace-nowrap">{transaction.transactionDate}</TableCell>
                <TableCell className="whitespace-nowrap">{transaction.calculationDate}</TableCell>
                <TableCell>
                  <Badge variant={transaction.transactionType === "Holiday-OT" ? "default" : "secondary"}>
                    {transaction.transactionType}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{transaction.hours.toFixed(2)}</TableCell>
                <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{transaction.projectName}</TableCell>
                <TableCell>{transaction.departmentBranch}</TableCell>
                <TableCell>
                  <Badge variant={transaction.status === "Posted" ? "outline" : "destructive"}>
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <FileDown className="h-4 w-4" />
                    </Button>
                </TableCell>
                <TableCell>{transaction.notes}</TableCell>
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
              <TableCell colSpan={4}>Total (All Pages)</TableCell>
              <TableCell className="text-right font-bold">${totalAmount.toFixed(2)}</TableCell>
              <TableCell colSpan={6}></TableCell> 
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      
      {/* 3. Pagination Controls */}
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