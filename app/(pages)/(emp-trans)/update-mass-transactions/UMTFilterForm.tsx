"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarIcon, Search, ChevronUp, ChevronDown } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
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
import { CardContent } from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const UMTFilterForm = () => {
    // State to manage visibility of form fields
    const [isFormVisible, setIsFormVisible] = useState(true);

    const form = useForm({
        defaultValues: {
            category: "overtime",
            employeeId: "10810",
            site: "",
            job: "",
            profitCenter: "",
            shiftType: "",
            department: "",
            classification2: "",
            gender: "",
            workType: "",
            section: "",
            nationality: "",
            deptSections: "",
            calcDateFrom: null,
            calcDateTo: null,
            startDate: new Date("2025-11-01"),
            endDate: new Date("2025-11-30"),
            periodFrom: null,
            periodTo: null,
            transactionType: "",
        },
    });

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
    };

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            >
                {isFormVisible ? (
                    <>
                        Hide Filters
                        <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                ) : (
                    <>
                        Show Filters
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                )}
            </Button>

            {isFormVisible && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-6 pt-6">
                            {/* --- Top Radio Group (Categories) --- */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-wrap gap-x-6 gap-y-2 text-sm"
                                            >
                                                {[
                                                    "Overtime",
                                                    "Leaves",
                                                    "Vacations",
                                                    "Vacations Adjustments",
                                                    "Other Income",
                                                    "Other Deductions",
                                                ].map((item) => (
                                                    <FormItem
                                                        key={item}
                                                        className="flex items-center space-x-2 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <RadioGroupItem
                                                                value={item
                                                                    .toLowerCase()
                                                                    .replace(
                                                                        " ",
                                                                        "-"
                                                                    )}
                                                                className="border-slate-400 text-primary dark:border-slate-500 dark:text-primary"
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal cursor-pointer text-slate-700 dark:text-slate-300">
                                                            {item}
                                                        </FormLabel>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className="w-full h-px bg-slate-200 dark:bg-slate-800" />

                            {/* --- Main Filter Grid --- */}
                            <div className="flex flex-wrap lg:flex-nowrap gap-8">
                                {/* Column 1 */}
                                <div className="space-y-3 flex-1 min-w-[250px] max-w-xs">
                                    <FormField
                                        control={form.control}
                                        name="employeeId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                                                    Employee ID
                                                </FormLabel>
                                                <div className="flex flex-col gap-1">
                                                    <FormControl>
                                                        <Input
                                                            placeholder="ID"
                                                            {...field}
                                                            className="w-full sm:w-[150px] h-9 dark:bg-background"
                                                        />
                                                    </FormControl>
                                                    <span className="text-sm font-medium text-blue-700 truncate dark:text-blue-400">
                                                        ABDULLAH HAMED HEMIDA
                                                        MOURSI
                                                    </span>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <SelectField
                                        form={form}
                                        name="site"
                                        label="Site"
                                    />
                                    <SelectField
                                        form={form}
                                        name="job"
                                        label="Job"
                                    />
                                    <SelectField
                                        form={form}
                                        name="profitCenter"
                                        label="Profit Center"
                                    />
                                </div>

                                {/* Column 2 */}
                                <div className="space-y-3 flex-1 min-w-[250px] max-w-xs pt-0 lg:pt-[58px]">
                                    {/* Padding top aligns with Site field (skipping Employee ID height) */}
                                    <SelectField
                                        form={form}
                                        name="shiftType"
                                        label="Shift Type"
                                    />
                                    <SelectField
                                        form={form}
                                        name="department"
                                        label="Department"
                                    />
                                    <SelectField
                                        form={form}
                                        name="classification2"
                                        label="Classification 2"
                                    />
                                </div>

                                {/* Column 3 */}
                                <div className="space-y-3 flex-1 min-w-[250px] max-w-xs">
                                    <SelectField
                                        form={form}
                                        name="gender"
                                        label="Gender"
                                    />
                                    <SelectField
                                        form={form}
                                        name="workType"
                                        label="Work Type"
                                    />
                                    <SelectField
                                        form={form}
                                        name="section"
                                        label="Section"
                                    />
                                    <SelectField
                                        form={form}
                                        name="nationality"
                                        label="Nationality"
                                    />
                                </div>

                                {/* Column 4 (Transaction Type & Actions) */}
                                <div className="space-y-3 flex-1 min-w-[250px] max-w-xs flex flex-col justify-end">
                                    <SelectField
                                        form={form}
                                        name="transactionType"
                                        label="Transaction Type"
                                    />
                                    <div className="pt-4 space-y-2">
                                        <Button
                                            type="button"
                                            className="w-full sm:w-[220px]"
                                            variant="outline"
                                        >
                                            Update and Save By Criteria
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="w-full sm:w-[220px]"
                                        >
                                            Display
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* --- Full Width Field: Dept & Sections --- */}
                            <div className="w-full">
                                <FormField
                                    control={form.control}
                                    name="deptSections"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                                                Dept & Sections
                                            </FormLabel>
                                            <div className="flex w-full items-center">
                                                <FormControl>
                                                    <div className="relative w-full">
                                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                                                        <Input
                                                            placeholder="Select departments..."
                                                            className="pl-8 bg-slate-50 border-slate-300 w-full dark:bg-slate-900/50 dark:border-slate-700"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="ml-2"
                                                >
                                                    <img
                                                        src="/placeholder-icon.png"
                                                        alt=""
                                                        className="w-5 h-5 opacity-50 dark:invert"
                                                    />
                                                </Button>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="w-full h-px bg-slate-200 dark:bg-slate-800" />

                            {/* --- Date Ranges & Bottom Actions --- */}
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Left: Date Inputs */}
                                <div className="space-y-3 lg:w-1/2">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <DatePickerField
                                            form={form}
                                            name="calcDateFrom"
                                            label="Calc Date From"
                                        />
                                        <DatePickerField
                                            form={form}
                                            name="calcDateTo"
                                            label="To"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <DatePickerField
                                            form={form}
                                            name="startDate"
                                            label="Start Date"
                                        />
                                        <DatePickerField
                                            form={form}
                                            name="endDate"
                                            label="End Date"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <DatePickerField
                                            form={form}
                                            name="periodFrom"
                                            label="Period From"
                                        />
                                        <DatePickerField
                                            form={form}
                                            name="periodTo"
                                            label="To"
                                        />
                                    </div>
                                </div>

                                {/* Right: Batch Update Actions */}
                                <div className="lg:w-1/2 flex flex-col justify-end">
                                    <div className="bg-slate-100 p-4 rounded border border-slate-200 space-y-4 dark:bg-slate-900/20 dark:border-slate-800">
                                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                                            <div className="w-full sm:w-auto">
                                                <SelectField
                                                    form={form}
                                                    name="updateType"
                                                    label="Update Field"
                                                    width="w-full sm:w-[160px]"
                                                    placeholder="Start Date"
                                                />
                                            </div>
                                            <div className="w-full sm:w-auto flex-1">
                                                <Input
                                                    placeholder="New Value"
                                                    className="bg-white dark:bg-background"
                                                />
                                            </div>
                                            <Button
                                                variant="secondary"
                                                className="bg-white border hover:bg-slate-50 text-slate-800 dark:bg-background dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
                                            >
                                                Update
                                            </Button>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2">
                                            <div className="flex items-center gap-2 w-full">
                                                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                    Filter:
                                                </span>
                                                <Input className="h-8 bg-white max-w-[250px] dark:bg-background" />
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                                    Number
                                                </span>
                                                <Select defaultValue="100">
                                                    <SelectTrigger className="w-[70px] h-8 bg-white dark:bg-background">
                                                        <SelectValue placeholder="100" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="100">
                                                            100
                                                        </SelectItem>
                                                        <SelectItem value="200">
                                                            200
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-500 text-right font-medium dark:text-slate-400">
                                            Affected Number of Records: 0
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </form>
                </Form>
            )}
        </>
    );
};

/* --- Helper Components with Fixed Widths --- */

const SelectField = ({
    form,
    name,
    label,
    placeholder = "All",
    width = "w-full sm:w-[220px]",
}: any) => (
    <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                    {label}
                </FormLabel>
                <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                >
                    <FormControl>
                        <SelectTrigger
                            className={`${width} h-9 dark:bg-background`}
                        >
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="opt1">Option 1</SelectItem>
                        <SelectItem value="opt2">Option 2</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )}
    />
);

const DatePickerField = ({ form, name, label }: any) => (
    <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                    {label}
                </FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full sm:w-[180px] h-9 pl-3 text-left font-normal border-slate-300 dark:border-slate-700 dark:bg-background",
                                    !field.value && "text-muted-foreground"
                                )}
                            >
                                {field.value ? (
                                    format(field.value, "dd/MM/yyyy")
                                ) : (
                                    <span>dd/mm/yyyy</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <FormMessage />
            </FormItem>
        )}
    />
);

export default UMTFilterForm;
