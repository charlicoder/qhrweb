"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Fragment, useState } from "react";

// Helper component for the date picker
function DatePickerWithForm({ field, placeholder }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                    >
                        {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date("2024-01-01")} // Example: disable future dates and dates before 2024
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

const formSchema = z.object({
    employeeId: z.string().optional(),
    site: z.string().optional(),
    job: z.string().optional(),
    gender: z.string().optional(),
    profitCenter: z.string().optional(),
    deptAndSections: z.string().optional(),
    startDate: z.date().optional(),
    vacationStartDateFrom: z.date().optional(),
    vacationEndDateFrom: z.date().optional(),
    shiftType: z.string().optional(),
    department: z.string().optional(),
    nationality: z.string().optional(),
    classification2: z.string().optional(),
    workType: z.string().optional(),
    section: z.string().optional(),
    transactionStatus: z.string().optional(),
    endDate: z.date().optional(),
    calculateVacation: z.string().optional(),
    returnFromVacation: z.string().optional(),
});

export function DAV_FilterForm() {
    const [showFilters, setShowFilters] = useState(true)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employeeId: "",
            site: "All",
            job: "All",
            gender: "All",
            profitCenter: "All",
            deptAndSections: "",
            startDate: undefined,
            vacationStartDateFrom: undefined,
            vacationEndDateFrom: undefined,
            shiftType: "All",
            department: "All",
            nationality: "All",
            classification2: "All",
            workType: "All",
            section: "All",
            transactionStatus: "All",
            endDate: undefined,
            calculateVacation: "All",
            returnFromVacation: "All",
        },
    });

    function onSubmit(values) {
        console.log(values);
    }

    return (
        <Fragment>
            <div className="w-full dark:bg-gray-800">
                <div className="flex justify-end mb-3 pt-3">
                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className="dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
                    >
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </Button>
                </div>
                <div
                    className={`transition-all duration-300 overflow-hidden ${showFilters ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <div
                        className="
                        p-4 border rounded-none shadow-sm
                        bg-white text-gray-900
                        dark:bg-gray-900 dark:text-gray-100
                    "
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {/* Increased padding and gap for columns */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 px-4">
                                    {/* Column 1 */}
                                    <div className="flex flex-col gap-4">
                                        <FormField
                                            control={form.control}
                                            name="employeeId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Employee ID</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="10810" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="site"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Site</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full"> {/* w-full for equal width */}
                                                                <SelectValue placeholder="Select a site" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="All">All</SelectItem>
                                                            {/* Add more site options here */}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="job"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Job</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select a job" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="All">All</SelectItem>
                                                            {/* Add more job options here */}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="gender"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Gender</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select a gender" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="All">All</SelectItem>
                                                            {/* Add more gender options here */}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="profitCenter"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Profit center</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select a profit center" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="All">All</SelectItem>
                                                            {/* Add more profit center options here */}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="deptAndSections"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Dept & Sections</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Column 2 */}
                                    <div className="flex flex-col gap-4">
                                        <FormField
                                            control={form.control}
                                            name="shiftType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Shift Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select shift type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="All">All</SelectItem>
                                                            {/* Add more shift type options here */}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="department"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Department</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select a department" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="All">All</SelectItem>
                                                            {/* Add more department options here */}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="nationality"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nationality</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select nationality" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="All">All</SelectItem>
                                                            {/* Add more nationality options here */}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="classification2"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Classification 2</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select classification" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="All">All</SelectItem>
                                                            {/* Add more classification options here */}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="startDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Start Date</FormLabel>
                                                    <DatePickerWithForm
                                                        field={field}
                                                        placeholder="01/11/2025"
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="vacationStartDateFrom"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Vacation Start Date From</FormLabel>
                                                    <DatePickerWithForm
                                                        field={field}
                                                        placeholder="Select date"
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="vacationEndDateFrom"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Vacation End Date From</FormLabel>
                                                    <DatePickerWithForm
                                                        field={field}
                                                        placeholder="Select date"
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Column 3 */}
                                    <div className="flex flex-col gap-4">
                                        <FormField
                                            control={form.control}
                                            name="workType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Work Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select work type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="All">All</SelectItem>
                                                            {/* Add more work type options here */}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="section"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Section</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select section" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="All">All</SelectItem>
                                                            {/* Add more section options here */}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="transactionStatus"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Transaction Status</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="All">All</SelectItem>
                                                            {/* Add more transaction status options here */}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="endDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>End Date</FormLabel>
                                                    <DatePickerWithForm
                                                        field={field}
                                                        placeholder="30/11/2025"
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="calculateVacation"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Calculate Vacation</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select option" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="All">All</SelectItem>
                                                            {/* Add more options here */}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="returnFromVacation"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Return From Vacation</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select option" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="All">All</SelectItem>
                                                            {/* Add more options here */}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="submit">Calculate</Button>
                                    <Button type="button" variant="secondary">
                                        Vacation Settlement
                                    </Button>
                                    <Button type="button" variant="outline">
                                        Display
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
