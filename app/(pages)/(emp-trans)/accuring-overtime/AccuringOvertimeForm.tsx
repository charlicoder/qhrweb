"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form"; // Import FormProvider and useFormContext
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
    Form, // Keep the Shadcn Form component
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
import { Separator } from "@/components/ui/separator";

// --- Helper for Date Picker ---
function DatePickerWithForm({ field, placeholder, label }) {
    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
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
                        disabled={(date) => date > new Date()}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    );
}

// --- Options for Select Fields ---
const allOption = { value: "All", label: "All" };
const chooseOption = { value: "Choose", label: "Choose" };

const commonSelectOptions = [
    allOption,
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
];

const yearOptions = [
    chooseOption,
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
];

const rewardAveragesOptions = [
    { value: "9", label: "9 - addition Basic" },
    { value: "3", label: "3 - Advance Payment" },
    { value: "19", label: "19 - Annual Leave payment" },
    { value: "12", label: "12 - ANNUALLEAVE PAYN" },
];

const defaultValues = {
    job: "All",
    site: "All",
    department: "All",
    section: "All",
    profitCenter: "All",
    classification2: "All",
    shiftType: "All",
    workType: "All",
    nationality: "All",
    deptAndSections: "",
    year: "Choose",
    addRewardAverages: undefined,
    employeeId: "",
    employeeName: "",
};

export function AccuringOvertimeForm() {
    const methods = useForm({
        defaultValues: defaultValues,
    });

    const {
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = methods; // Destructure from methods

    const employeeId = watch("employeeId");

    useEffect(() => {
        if (employeeId === "10810") {
            setValue("employeeName", "ABDULLAH HAMED HEMIDA MOURSI");
        } else {
            setValue("employeeName", "");
        }
    }, [employeeId, setValue]);

    function onSubmit(data) {
        console.log("Form submitted:", data);
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900">
            <h2 className="text-2xl font-bold mb-6">Accuring Overtime</h2>
            <Separator className="mb-6" />

            {/* Use FormProvider to explicitly provide context */}
            <FormProvider {...methods}>
                {/* The Shadcn Form component might internally use FormProvider, */}
                {/* but explicitly providing it here ensures context is available */}
                <Form {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Column 1 */}
                            <div className="flex flex-col gap-5">
                                <FormField
                                    control={control} // Pass control down
                                    name="job"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Job</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Job" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {commonSelectOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.job && <FormMessage>{errors.job.message as string}</FormMessage>}
                                        </FormItem>
                                    )}
                                />
                                {/* ... other fields in Column 1 ... */}
                                {/* (Same as before, ensuring control is passed and errors are checked) */}
                                <FormField
                                    control={control}
                                    name="site"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Site</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Site" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {commonSelectOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.site && <FormMessage>{errors.site.message as string}</FormMessage>}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="department"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Department</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Department" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {commonSelectOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.department && <FormMessage>{errors.department.message as string}</FormMessage>}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="section"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Section</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Section" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {commonSelectOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.section && <FormMessage>{errors.section.message as string}</FormMessage>}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="profitCenter"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Profit center</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Profit Center" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {commonSelectOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.profitCenter && <FormMessage>{errors.profitCenter.message as string}</FormMessage>}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="classification2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Classification 2</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Classification" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {commonSelectOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.classification2 && <FormMessage>{errors.classification2.message as string}</FormMessage>}
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Column 2 */}
                            <div className="flex flex-col gap-5">
                                <FormField
                                    control={control}
                                    name="shiftType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Shift Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Shift Type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {commonSelectOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.shiftType && <FormMessage>{errors.shiftType.message as string}</FormMessage>}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="workType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Work Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Work Type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {commonSelectOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.workType && <FormMessage>{errors.workType.message as string}</FormMessage>}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="nationality"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nationality</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Nationality" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {commonSelectOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.nationality && <FormMessage>{errors.nationality.message as string}</FormMessage>}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="deptAndSections"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dept & Sections</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Dept & Sections" {...field} />
                                            </FormControl>
                                            {errors.deptAndSections && <FormMessage>{errors.deptAndSections.message as string}</FormMessage>}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="year"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Year</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Year" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {yearOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.year && <FormMessage>{errors.year.message as string}</FormMessage>}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="addRewardAverages"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Add the Following Reward Averages</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Reward Average" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {rewardAveragesOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.addRewardAverages && <FormMessage>{errors.addRewardAverages.message as string}</FormMessage>}
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Column 3 - Employee Details and Update Button */}
                            <div className="lg:col-span-1 flex flex-col gap-5">
                                <FormField
                                    control={control}
                                    name="employeeId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Employee ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Employee ID" {...field} />
                                            </FormControl>
                                            {errors.employeeId && <FormMessage>{errors.employeeId.message as string}</FormMessage>}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="employeeName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Employee Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Employee Name" {...field} disabled />
                                            </FormControl>
                                            {errors.employeeName && <FormMessage>{errors.employeeName.message as string}</FormMessage>}
                                        </FormItem>
                                    )}
                                />
                                <div className="flex-grow"></div>
                                <Button type="submit" className="w-full">Update</Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </FormProvider>
        </div>
    );
}

