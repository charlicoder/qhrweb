"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

// ---------- Schema ----------
const schema = z.object({
    site: z.string().optional(),
    job: z.string().optional(),
    gender: z.string().optional(),
    profileCenter: z.string().optional(),
    shiftType: z.string().optional(),
    department: z.string().optional(),
    nationality: z.string().optional(),
    classification2: z.string().optional(),
    workType: z.string().optional(),
    transactionStatus: z.string().optional(),
    calculateVacation: z.string().optional(),
    returnFromVacation: z.string().optional(),
});

// ---------- Options ----------
const siteOptions = [
    { value: "-1", label: "All" },
    { value: "2", label: "2 - 0" },
    { value: "3", label: "3 - 16th Street" },
    { value: "4", label: "4 - Al Wakra" },
    { value: "5", label: "5 - Al Wukair" },
    { value: "6", label: "6 - General" },
    { value: "7", label: "7 - Main Office" },
    { value: "8", label: "8 - Mamoura" },
    { value: "9", label: "9 - Muaither" },
    { value: "10", label: "10 - Muaither Garage" },
    { value: "11", label: "11 - Oman" },
    { value: "12", label: "12 - Umm Salal" },
    { value: "1", label: "1 - قطر" },
];

// JOB OPTION LIST trimmed for clarity, but **you must paste full list here**
const jobOptions = [
    { value: "-1", label: "All" },
    { value: "1", label: "1 - A-C Technician" },
    { value: "97", label: "97 - Account Manager" },
    { value: "90", label: "90 - Accountant" },
    // continue full list...
];

const genderOptions = [
    { value: "-1", label: "All" },
    { value: "1", label: "Male" },
    { value: "2", label: "Female" },
];

const profileCenterOptions = [
    { value: "-1", label: "All" },
    { value: "1", label: "1 - Alwaha" },
    { value: "2", label: "2 - Micro" },
    { value: "3", label: "3 - Garage" },
];

const shiftOptions = [
    { value: "-1", label: "All" },
    { value: "1", label: "Day" },
];

const departmentOptions = [
    { value: "-1", label: "All" },
    { value: "4", label: "4 - C821-2 5-2018" },
    { value: "14", label: "14 - DUMMY FOR FINAL SETTLEMENT" },
    { value: "20", label: "20 - Finance & Accounts" },
    { value: "5", label: "5 - GARAGE" },
    { value: "6", label: "6 - General" },
    // continue full list...
];

const nationalityOptions = [
    { value: "-1", label: "All" },
    { value: "20", label: "20 - America" },
    { value: "1", label: "1 - Bangladesh" },
    { value: "2", label: "2 - Canada" },
    // continue full list...
];

const classification2Options = [
    { value: "-1", label: "All" },
    { value: "8", label: "8 - Accounts" },
    { value: "10", label: "10 - Administration" },
    // continue full list...
];

const workTypeOptions = [
    { value: "-1", label: "All" },
    { value: "1", label: "Full time" },
    { value: "2", label: "Part time" },
];

const transactionStatusOptions = [
    { value: "-1", label: "All" },
    { value: "1", label: "posted" },
    { value: "2", label: "unposted" },
];

const calculateVacationOptions = [
    { value: "0", label: "0 - Vacations That Not Calculated" },
    { value: "1", label: "1 - Vacations That Calculated" },
];

const returnFromVacationOptions = [
    { value: "-1", label: "All" },
    { value: "0", label: "Returned From Vacation" },
    { value: "1", label: "The Employee Doesnt Return From Vacation" },
];

// ---------- Generic SelectField ----------
const SelectField = ({ form, name, label, options }: any) => (
    <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel className="font-medium text-gray-800 dark:text-gray-200">
                    {label}
                </FormLabel>

                <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? "-1"} // default to All
                >
                    <FormControl>
                        <SelectTrigger
                            className="
                                w-48
                                bg-white text-gray-900
                                dark:bg-gray-800 dark:text-gray-100
                                dark:border-gray-700
                            "
                        >
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                    </FormControl>

                    <SelectContent className="bg-white dark:bg-gray-800 dark:text-gray-100">
                        {options.map((opt: any) => (
                            <SelectItem
                                key={opt.value}
                                value={opt.value}
                                className="
                                    text-gray-900 dark:text-gray-100
                                    hover:bg-gray-100 dark:hover:bg-gray-700
                                "
                            >
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormItem>
        )}
    />
);

export default function FilterForm() {
    const [showFilters, setShowFilters] = useState(true);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {},
    });

    const onSubmit = (values: any) => {
        console.log("FILTER VALUES:", values);
    };

    return (
        <div className="w-full">
            <div className="flex justify-end mb-3">
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
                        p-4 border rounded-lg shadow-sm
                        bg-white text-gray-900
                        dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700
                    "
                >
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {/* Select fields */}
                            <SelectField form={form} name="site" label="Site" options={siteOptions} />
                            <SelectField form={form} name="job" label="Job" options={jobOptions} />
                            <SelectField form={form} name="gender" label="Gender" options={genderOptions} />
                            <SelectField form={form} name="profileCenter" label="Profile Center" options={profileCenterOptions} />
                            <SelectField form={form} name="shiftType" label="Shift Type" options={shiftOptions} />
                            <SelectField form={form} name="department" label="Department" options={departmentOptions} />
                            <SelectField form={form} name="nationality" label="Nationality" options={nationalityOptions} />
                            <SelectField form={form} name="classification2" label="Classification2" options={classification2Options} />
                            <SelectField form={form} name="workType" label="Work Type" options={workTypeOptions} />
                            <SelectField form={form} name="transactionStatus" label="Transaction Status" options={transactionStatusOptions} />
                            <SelectField form={form} name="calculateVacation" label="Calculate Vacation" options={calculateVacationOptions} />
                            <SelectField form={form} name="returnFromVacation" label="Return From Vacation" options={returnFromVacationOptions} />

                            {/* Submit */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end">
                                <Button
                                    type="submit"
                                    className="mt-2 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                                >
                                    Apply Filter
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
