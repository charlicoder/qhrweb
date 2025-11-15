"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react"; // Assuming you might want a calendar icon for date picker
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export function ExcelTransactionForm() {
    const [selectedTransactionType, setSelectedTransactionType] = useState("Overtime");
    const [transactionDetails, setTransactionDetails] = useState({
        transactionType: "Regular OT",
        projectName: "",
        dateOfTransactionCalculation: new Date(),
        excelFile: null,
        takeTransactionTypeFromShift: false,
    });

    const handleInputChange = (field: string, value: any) => {
        setTransactionDetails((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setTransactionDetails((prev) => ({
                ...prev,
                excelFile: event.target.files[0],
            }));
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Form submitted with:", transactionDetails);
        // Add your form submission logic here
    };

    return (
        <div className="p-5">
            <form onSubmit={handleSubmit}>
                {/* Transaction Type Radio Group (Horizontal) */}
                <div className="mb-8"> {/* Increased margin-bottom for spacing */}
                    <Label className="font-bold mb-3 block">Transaction Type</Label> {/* Increased margin-bottom */}
                    <RadioGroup
                        defaultValue="Overtime"
                        onValueChange={(value) => setSelectedTransactionType(value)}
                        className="flex flex-row space-x-4 flex-wrap"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Overtime" id="rOvertime" />
                            <Label htmlFor="rOvertime">Overtime</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Monthly Loan Details" id="rMonthlyLoanDetails" />
                            <Label htmlFor="rMonthlyLoanDetails">Monthly Loan Details</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Leaves" id="rLeaves" />
                            <Label htmlFor="rLeaves">Leaves</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Part Time" id="rPartTime" />
                            <Label htmlFor="rPartTime">Part Time</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Salary Increase" id="rSalaryIncrease" />
                            <Label htmlFor="rSalaryIncrease">Salary Increase</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Allowance Increase" id="rAllowanceIncrease" />
                            <Label htmlFor="rAllowanceIncrease">Allowance Increase</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Vacations" id="rVacations" />
                            <Label htmlFor="rVacations">Vacations</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Other Benefits" id="rOtherBenefits" />
                            <Label htmlFor="rOtherBenefits">Other Benefits</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Other Deductions" id="rOtherDeductions" />
                            <Label htmlFor="rOtherDeductions">Other Deductions</Label>
                        </div>
                    </RadioGroup>
                </div>
                <Separator />

                {/* Two-column grid for other fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 card border">
                    <div className="grid gap-4"> {/* Left column */}
                        <div>
                            <Label htmlFor="transactionType">Transaction Type</Label>
                            <Select
                                onValueChange={(value) => handleInputChange("transactionType", value)}
                                value={transactionDetails.transactionType}
                            >
                                <SelectTrigger className="w-full mt-1"> {/* Added mt-1 for spacing */}
                                    <SelectValue placeholder="Select transaction type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Regular OT">Regular OT</SelectItem>
                                    <SelectItem value="Overtime Type 2">Overtime Type 2</SelectItem>
                                    {/* Add more transaction types as needed */}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="mt-6"> {/* Added mt-6 for row spacing */}
                            <Label htmlFor="projectName">Project Name</Label>
                            <Select
                                onValueChange={(value) => handleInputChange("projectName", value)}
                                value={transactionDetails.projectName}
                            >
                                <SelectTrigger className="w-full mt-1"> {/* Added mt-1 for spacing */}
                                    <SelectValue placeholder="Choose Project" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Project Alpha">Project Alpha</SelectItem>
                                    <SelectItem value="Project Beta">Project Beta</SelectItem>
                                    <SelectItem value="Project Gamma">Project Gamma</SelectItem>
                                    {/* Add more project names as needed */}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-6"> {/* Right column */}
                        <div>
                            <Label htmlFor="dateOfTransactionCalculation">Date of Transaction Calculation</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className="w-full justify-start text-left font-normal mt-1" // Added mt-1 for spacing
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {transactionDetails.dateOfTransactionCalculation.toLocaleDateString()}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={transactionDetails.dateOfTransactionCalculation}
                                        onSelect={(date) => handleInputChange("dateOfTransactionCalculation", date || new Date())}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="mt-6"> {/* Added mt-6 for row spacing */}
                            <Label htmlFor="excelFile">Excel File</Label>
                            <div className="flex items-center space-x-2 mt-1"> {/* Added mt-1 for spacing */}
                                <Input id="excelFile" type="file" onChange={handleFileChange} className="w-full" />
                                <span className="text-sm text-gray-500">{transactionDetails.excelFile ? transactionDetails.excelFile.name : "No file chosen"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Example text and Checkbox */}
                <div className="mt-8 mb-6"> {/* Added mt-8 for spacing */}
                    <p className="text-sm text-gray-600 mb-3"> {/* Increased margin-bottom */}
                        For Example : Overtime ( XLSX, XLS, CSV )
                    </p>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="takeTransactionTypeFromShift"
                            checked={transactionDetails.takeTransactionTypeFromShift}
                            onCheckedChange={(checked) => handleInputChange("takeTransactionTypeFromShift", checked)}
                        />
                        <Label htmlFor="takeTransactionTypeFromShift">Take Transaction Type from Shift Setup</Label>
                    </div>
                </div>

                {/* Calculation Button */}
                <div className="flex justify-end">
                    <Button type="submit" size="lg">Calculation</Button>
                </div>
            </form>
        </div>

    );
}
