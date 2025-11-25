"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { ArrowLeftCircle, ArrowRightCircle, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const LoanPostponementForm = () => {
    // 1. Initialize form without Zod (Standard React Hook Form)
    const form = useForm({
        defaultValues: {
            employeeId: "10810",
            site: "",
            workType: "",
            department: "",
            gender: "",
            profitCenter: "",
            projectName: "",
            year: "2025",
            mechanism: "posted-salaries",
            shiftType: "",
            job: "",
            section: "",
            nationality: "",
            classification2: "",
            loanType: "",
            month: "11",
            deptSections: "",
            rangeFrom: "",
            rangeTo: "",
            viewOption: "will-be-postponed",
        },
    });

    const onSubmit = (data: any) => {
        console.log("Form Submitted:", data);
    };

    return (
        <div className="min-h-screen w-full flex justify-center items-start bg-slate-50 dark:bg-background">
            <Card className="w-full shadow-md border-t-4 border-t-blue-500 dark:bg-card">
                <CardHeader className="pb-4 border-b dark:border-border">
                    <CardTitle className="text-xl">Loan Postponement</CardTitle>
                    <CardDescription>
                        Manage employee loan postponements and criteria.
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* --- Top Section: Employee ID & Name --- */}
                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                                <FormField
                                    control={form.control}
                                    name="employeeId"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2 space-y-0">
                                            <FormLabel className="w-[120px] pt-2 sm:pt-0 text-slate-600 font-semibold dark:text-slate-400">
                                                Employee ID
                                            </FormLabel>
                                            <div className="flex items-center gap-2">
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className="w-full sm:w-[150px] h-9 bg-white dark:bg-background"
                                                    />
                                                </FormControl>
                                                {/* Navigation Arrows from image */}
                                                <div className="flex gap-1">
                                                    <ArrowLeftCircle className="h-5 w-5 text-green-600 cursor-pointer hover:text-green-700 dark:text-green-500 dark:hover:text-green-400" />
                                                    <ArrowRightCircle className="h-5 w-5 text-green-600 cursor-pointer hover:text-green-700 dark:text-green-500 dark:hover:text-green-400" />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                {/* Employee Name Display */}
                                <div className="flex-1 md:pl-4">
                                    <span className="text-sm font-bold text-red-600 uppercase tracking-wide dark:text-red-500">
                                        ABDULLAH HAMED HEMIDA MOURSI
                                    </span>
                                </div>
                            </div>

                            {/* --- Main Filter Grid --- */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
                                {/* Left Column */}
                                <div className="space-y-3">
                                    <SelectRow
                                        form={form}
                                        name="site"
                                        label="Site"
                                    />
                                    <SelectRow
                                        form={form}
                                        name="workType"
                                        label="Work Type"
                                    />
                                    <SelectRow
                                        form={form}
                                        name="department"
                                        label="Department"
                                    />
                                    <SelectRow
                                        form={form}
                                        name="gender"
                                        label="Gender"
                                    />
                                    <SelectRow
                                        form={form}
                                        name="profitCenter"
                                        label="Profit Center"
                                    />
                                    <SelectRow
                                        form={form}
                                        name="projectName"
                                        label="Project Name"
                                    />
                                    <SelectRow
                                        form={form}
                                        name="year"
                                        label="Year"
                                        placeholder="2025"
                                    />
                                    <SelectRow
                                        form={form}
                                        name="mechanism"
                                        label="Mechanism for Postpone loan"
                                        placeholder="Posted Salaries"
                                    />
                                </div>

                                {/* Right Column */}
                                <div className="space-y-3">
                                    <SelectRow
                                        form={form}
                                        name="shiftType"
                                        label="Shift Type"
                                    />
                                    <SelectRow
                                        form={form}
                                        name="job"
                                        label="Job"
                                    />
                                    <SelectRow
                                        form={form}
                                        name="section"
                                        label="Section"
                                    />
                                    <SelectRow
                                        form={form}
                                        name="nationality"
                                        label="Nationality"
                                    />
                                    <SelectRow
                                        form={form}
                                        name="classification2"
                                        label="Classification 2"
                                    />
                                    <SelectRow
                                        form={form}
                                        name="loanType"
                                        label="Loan Type"
                                    />
                                    <SelectRow
                                        form={form}
                                        name="month"
                                        label="Month"
                                        placeholder="11"
                                    />
                                </div>
                            </div>

                            <Separator className="my-6 dark:bg-border" />

                            {/* --- Dept & Sections (Gray Bar Look) --- */}
                            <FormField
                                control={form.control}
                                name="deptSections"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2 space-y-0">
                                        <FormLabel className="w-[120px] text-slate-600 font-semibold shrink-0 dark:text-slate-400">
                                            Dept & Sections
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative w-full">
                                                <Input
                                                    {...field}
                                                    className="w-full bg-slate-200/80 border-slate-300 h-9 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
                                                    readOnly // Assuming this is a selector trigger in a real app, looking like the gray bar in screenshot
                                                />
                                                <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* --- Range Inputs --- */}
                            <div className="space-y-2">
                                <div className="text-sm text-slate-600 font-medium dark:text-slate-400">
                                    Display Employees whose Numbers lie between
                                </div>
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm w-[80px] sm:w-auto text-right sm:text-left dark:text-slate-300">
                                            From
                                        </span>
                                        <FormField
                                            control={form.control}
                                            name="rangeFrom"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className="w-[150px] h-9 dark:bg-background"
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm w-[80px] sm:w-auto text-right sm:text-left dark:text-slate-300">
                                            To
                                        </span>
                                        <FormField
                                            control={form.control}
                                            name="rangeTo"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className="w-[150px] h-9 dark:bg-background"
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-6 dark:bg-border" />

                            {/* --- Bottom Action Section --- */}
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                                {/* Radio Group */}
                                <FormField
                                    control={form.control}
                                    name="viewOption"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem
                                                                value="will-be-postponed"
                                                                className="text-red-600 border-red-600 dark:text-red-500 dark:border-red-500"
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal cursor-pointer dark:text-slate-300">
                                                            Show Employees that
                                                            Loans Will be
                                                            Postponed for them
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="were-postponed" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal cursor-pointer dark:text-slate-300">
                                                            Show Employees that
                                                            Loans were Postponed
                                                            for them
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className="border-slate-800 text-slate-900 hover:bg-slate-100 font-medium w-full sm:w-auto px-8 dark:border-slate-200 dark:text-slate-100 dark:hover:bg-slate-800"
                                >
                                    Postpone Loans Installments
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

// --- Helper Component for Consistent Select Rows ---
const SelectRow = ({ form, name, label, placeholder = "All" }: any) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2 space-y-0">
                    {/* Label: Fixed width for alignment */}
                    <FormLabel className="w-[180px] text-slate-600 font-medium shrink-0 pt-2 sm:pt-0 dark:text-slate-400">
                        {label}
                    </FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            {/* Trigger: Fixed width on desktop, full on mobile */}
                            <SelectTrigger className="w-full sm:w-[280px] h-9 bg-white dark:bg-background">
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="opt1">Option 1</SelectItem>
                            <SelectItem value="opt2">Option 2</SelectItem>
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    );
};

export default LoanPostponementForm;
