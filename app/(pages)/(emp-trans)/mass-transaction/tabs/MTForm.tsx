"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Checkbox } from "@/components/ui/checkbox";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

// Schema for the general options
const generalOptionsSchema = z.object({
    generalOption: z.enum([
        "overtime",
        "leaves",
        "salary_increase",
        "vacations",
        "vacations_compensation",
        "vacations_adjustments",
        "other_benefits",
        "other_deductions",
        "loans",
        "part_time",
    ]),
});

// Schema for the main form fields
const formSchema = z.object({
    employeeId: z.string().min(1, {
        message: "Employee ID is required.",
    }),
    transactionType: z.string({
        required_error: "Please select a transaction type.",
    }),
    startDate: z.date({
        required_error: "Start date is required.",
    }),
    dateOfTransactionCalculation: z.date({
        required_error: "Date of transaction calculation is required.",
    }),
    hiringMonth: z.string({
        required_error: "Please select a hiring month.",
    }),
    amount: z.number().optional(),
    numHours: z.number().optional(),
    exempted: z.boolean().optional(),
    calculateValueAsRatio: z.boolean().optional(),
    stopSalary: z.string({
        required_error: "Please select a stop salary option.",
    }),
    endDate: z.date().optional(),
    projectName: z.string({
        required_error: "Please select a project name.",
    }),
    department: z.string({
        required_error: "Please select a department.",
    }),
    job: z.string({
        required_error: "Please select a job.",
    }),
    nationality: z.string({
        required_error: "Please select a nationality.",
    }),
    classification2: z.string({
        required_error: "Please select a classification.",
    }),
    leaveType: z.string({
        required_error: "Please select a leave type.",
    }),
    exemptionOfEmployeesOnVacation: z.string({
        required_error: "Please select an exemption type.",
    }),
    calculateBasedOn: z.string({
        required_error: "Please select a calculation basis.",
    }),
    basicSalaryPlus: z.boolean().optional(),
    exemptionAmount: z.number().optional(),
    allowanceType: z.string().optional(), // Using allowanceType to store the selected radio button value
    notes: z.string().optional(),
});

// Combined schema for the entire form
const combinedSchema = generalOptionsSchema.merge(formSchema);

const transactionTypes = [
    { label: "Regular OT", value: "regular_ot" },
    { label: "Holiday OT", value: "holiday_ot" },
];

const stopSalaryOptions = [
    { label: "Not Stoped Salary", value: "not_stopped" },
    { label: "Stoped Salary", value: "stopped" },
];

const hiringMonths = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
}));
hiringMonths.unshift({ label: "All", value: "all" });

const exemptionOfEmployeesOnVacationOptions = [
    { label: "3 - absence", value: "3" },
    { label: "1 - Annaul leave", value: "1" },
    { label: "6 - Casual Leave", value: "6" },
    { label: "9 - Eid Holiday", value: "9" },
    { label: "10 - Emergency Leave", value: "10" },
    { label: "5 - long Leave", value: "5" },
    { label: "7 - Maternity Leave", value: "7" },
    { label: "8 - Public Holiday", value: "8" },
    { label: "2 - Sick", value: "2" },
    { label: "4 - Unpaid Leave", value: "4" },
];

const projectNameOptions = [
    { label: "All", value: "all" },
    { label: "18 - 0", value: "18" },
    { label: "17 - 000", value: "17" },
    { label: "29 - Accounts & Finance", value: "29" },
    { label: "33 - Aspire Zone - AWF-2337-25 - Water Bottle Filling S", value: "33" },
    { label: "11 - C821-2 5-2018", value: "11" },
    { label: "23 - Camp", value: "23" },
    { label: "22 - Darwish", value: "22" },
    { label: "26 - Dummy For Annual Leave Settlement", value: "26" },
    { label: "20 - DUMMY FOR FINAL SETTLEMENT", value: "20" },
    { label: "1 - Garage", value: "1" },
    { label: "10 - General", value: "10" },
    { label: "4 - GTC 1004-2020 3-22", value: "4" },
    { label: "3 - GTC 879 1-20", value: "3" },
    { label: "27 - HC-005", value: "27" },
    { label: "31 - HC-007", value: "31" },
    { label: "30 - HR&Administration", value: "30" },
    { label: "13 - Main office", value: "13" },
    { label: "5 - Micro HBK 2-21", value: "5" },
    { label: "14 - Micro Kharatiyat 6-2022", value: "14" },
    { label: "8 - Micro Lusail 1-23", value: "8" },
    { label: "21 - MICRO MOCASKO 3-23", value: "21" },
    { label: "7 - Micro Oman 4-22", value: "7" },
    { label: "15 - micro Petroserv 8-2022", value: "15" },
    { label: "9 - Micro Saudi 2-23", value: "9" },
    { label: "6 - Micro TSC 2-22", value: "6" },
    { label: "12 - Micro Workshop", value: "12" },
    { label: "2 - Muaither Garage", value: "2" },
    { label: "32 - Mukenis Store", value: "32" },
    { label: "25 - OTHER ALLOWANCE", value: "25" },
    { label: "24 - Procurement", value: "24" },
    { label: "28 - Tender", value: "28" },
];

const departmentOptions = [
    { label: "All", value: "all" },
    { label: "4 - C821-2 5-2018", value: "4" },
    { label: "14 - DUMMY FOR FINAL SETTLEMENT", value: "14" },
    { label: "20 - Finance & Accounts", value: "20" },
    { label: "5 - GARAGE", value: "5" },
    { label: "6 - General", value: "6" },
    { label: "3 - GTC 1004-2020 3-22", value: "3" },
    { label: "2 - GTC 879 1-20", value: "2" },
    { label: "18 - HC-005", value: "18" },
    { label: "21 - HR & Administration", value: "21" },
    { label: "23 - Information & Technology", value: "23" },
    { label: "9 - Main Office", value: "9" },
    { label: "19 - Management", value: "19" },
    { label: "10 - Micro HBK 2-21", value: "10" },
    { label: "13 - Micro Lusail 1-23", value: "13" },
    { label: "8 - Micro Oman 4-22", value: "8" },
    { label: "1 - Micro Saudi 2-23", value: "1" },
    { label: "7 - Muaither Garage", value: "7" },
    { label: "25 - Operation", value: "25" },
    { label: "22 - Tender & Commercial", value: "22" },
    { label: "24 - Work Shop", value: "24" },
];

const jobOptions = [
    { label: "All", value: "all" },
    { label: "1 - A-C Technician", value: "1" },
    { label: "97 - Account Manager", value: "97" },
    { label: "90 - Accountant", value: "90" },
    { label: "25 - Accounts & Finance Assistant", value: "25" },
    { label: "113 - Assistant Maintenance Supervisor", value: "113" },
    { label: "127 - Assit. Accountant", value: "127" },
    { label: "128 - Assit. Foreman", value: "128" },
    { label: "131 - Assit. Mechanic", value: "131" },
    { label: "132 - Assit. StoreKeeper", value: "132" },
    { label: "133 - Assit. Surveyor", value: "133" },
    { label: "134 - Assit. Tyreman", value: "134" },
    { label: "2 - ASST  STORE KEEPER", value: "2" },
    { label: "3 - ASST ACCOUNTANT", value: "3" },
    { label: "4 - ASST ELECTRILCIAN", value: "4" },
    { label: "5 - ASST FOREMAN", value: "5" },
    { label: "6 - ASST MECHANIC", value: "6" },
    { label: "7 - ASST SURVEYOR", value: "7" },
    { label: "8 - ASST TYREMAN", value: "8" },
    { label: "9 - Auto Electrician", value: "9" },
    { label: "10 - Auto Mechanic", value: "10" },
    { label: "135 - Autocad Operator", value: "135" },
    { label: "11 - Camp Boss", value: "11" },
    { label: "12 - Carpenter", value: "12" },
    { label: "136 - Carpenter Foreman", value: "136" },
    { label: "124 - Charge Hand", value: "124" },
    { label: "129 - Chargehand", value: "129" },
    { label: "13 - Chief Accountant", value: "13" },
    { label: "104 - Chief Business Development Officer", value: "104" },
    { label: "91 - Civil Engineer", value: "91" },
    { label: "138 - Cleaner", value: "138" },
    { label: "14 - Clerk", value: "14" },
    { label: "137 - Concrete Breaker", value: "137" },
    { label: "100 - Construction Manager", value: "100" },
    { label: "15 - CRANE OPERATOR", value: "15" },
    { label: "16 - Data Entry", value: "16" },
    { label: "139 - Denter & Painter", value: "139" },
    { label: "142 - Diesel Attendant", value: "142" },
    { label: "17 - Diesel Mechanic", value: "17" },
    { label: "18 - Document Controller", value: "18" },
    { label: "19 - Draftsman", value: "19" },
    { label: "20 - DRIVER", value: "20" },
    { label: "21 - Electrical Engineer", value: "21" },
    { label: "22 - Electrician", value: "22" },
    { label: "101 - Environmental Manager", value: "101" },
    { label: "23 - Equipment Manager", value: "23" },
    { label: "92 - ESTIMATIED AND CAST CONTROL MANAGER", value: "92" },
    { label: "114 - Estimation & Tendering Manager", value: "114" },
    { label: "125 - Excavator Operator", value: "125" },
    { label: "24 - Finance Manager", value: "24" },
    { label: "26 - Foreman", value: "26" },
    { label: "28 - General Foreman", value: "28" },
    { label: "29 - General Foreman - Maintainance", value: "29" },
    { label: "30 - General Manager", value: "30" },
    { label: "31 - GENERAL PROJECT MANAGER", value: "31" },
    { label: "32 - Grouting Engineer", value: "32" },
    { label: "96 - Head Garage Procurement", value: "96" },
    { label: "130 - Heavy Duty Driver", value: "130" },
    { label: "146 - Heavy Equipment Supervisor", value: "146" },
    { label: "122 - HR & Admin Manager", value: "122" },
    { label: "110 - HR & Payroll Specialist", value: "110" },
    { label: "34 - HR Assistant", value: "34" },
    { label: "33 - HR Director", value: "33" },
    { label: "95 - HR Manager", value: "95" },
    { label: "112 - HR Officer", value: "112" },
    { label: "68 - HSE Engineer", value: "68" },
    { label: "35 - HSE Officer", value: "35" },
    { label: "98 - Inventory Controller", value: "98" },
    { label: "109 - Junior Site Engineer", value: "109" },
    { label: "36 - Labour", value: "36" },
    { label: "117 - Land Surveyor", value: "117" },
    { label: "37 - Lifting Supervisor", value: "37" },
    { label: "38 - Light Duty Driver", value: "38" },
    { label: "147 - Light Vehicle Supervisor", value: "147" },
    { label: "39 - Maintenance Manager", value: "39" },
    { label: "99 - Male Nurse", value: "99" },
    { label: "40 - Mason", value: "40" },
    { label: "41 - Mechanic", value: "41" },
    { label: "42 - Mechanic - Hammer", value: "42" },
    { label: "43 - Mechanic Driver", value: "43" },
    { label: "44 - Mechanic Helper", value: "44" },
    { label: "103 - Mechanical Engineer", value: "103" },
    { label: "45 - Micro Tunneling Operator", value: "45" },
    { label: "46 - Micro Tunneling Surveyor", value: "46" },
    { label: "47 - MT OPERATOR", value: "47" },
    { label: "48 - Office Boy", value: "48" },
    { label: "49 - Operation Engineer", value: "49" },
    { label: "106 - Operation Manager", value: "106" },
    { label: "111 - Operations Manger", value: "111" },
    { label: "50 - OPERATOR", value: "50" },
    { label: "51 - Painter", value: "51" },
    { label: "52 - Payroll Specialist", value: "52" },
    { label: "53 - Pipe Fitter", value: "53" },
    { label: "54 - Planner Engr", value: "54" },
    { label: "120 - Planning Engineer", value: "120" },
    { label: "55 - Plumber", value: "55" },
    { label: "56 - PMV Manager", value: "56" },
    { label: "118 - PRO", value: "118" },
    { label: "57 - PRO - HR", value: "57" },
    { label: "93 - Procurement Engineer", value: "93" },
    { label: "58 - Project Engineer", value: "58" },
    { label: "59 - Project Manager", value: "59" },
    { label: "60 - Purchaser", value: "60" },
    { label: "145 - Purchasing Officer", value: "145" },
    { label: "61 - QA-QC Engineer", value: "61" },
    { label: "62 - QA-QC Inspecto", value: "62" },
];

const classification2Options = [
    { label: "All", value: "all" },
    { label: "8 - Accounts", value: "8" },
    { label: "10 - Administration", value: "10" },
    { label: "17 - Camps", value: "17" },
    { label: "28 - Civil - Tec", value: "28" },
    { label: "27 - Construction", value: "27" },
    { label: "29 - Cost Control", value: "29" },
    { label: "31 - Electrical", value: "31" },
    { label: "1 - Executive Management", value: "1" },
    { label: "7 - Fixed Assets - Tax", value: "7" },
    { label: "38 - GTC-1004", value: "38" },
    { label: "37 - GTC-879", value: "37" },
    { label: "22 - Hardware", value: "22" },
    { label: "35 - HC-005", value: "35" },
    { label: "36 - HC-007", value: "36" },
    { label: "26 - HSSE", value: "26" },
    { label: "3 - Internal Audit", value: "3" },
    { label: "2 - Key Management", value: "2" },
    { label: "33 - Laboratary", value: "33" },
    { label: "15 - Legal & Insurance", value: "15" },
    { label: "16 - Logistics", value: "16" },
    { label: "24 - Maintenance", value: "24" },
    { label: "32 - Material", value: "32" },
    { label: "30 - Mechanical", value: "30" },
    { label: "4 - Payable", value: "4" },
    { label: "13 - Payroll", value: "13" },
    { label: "11 - Personnel", value: "11" },
    { label: "19 - Plan", value: "19" },
];

const calculateBasedOnOptions = [
    { label: "Fixed", value: "fixed" },
    { label: "Percentage", value: "percentage" },
];

export function MTForm() {
    const form = useForm<z.infer<typeof combinedSchema>>({
        resolver: zodResolver(combinedSchema),
        defaultValues: {
            generalOption: "overtime", // Default to 'Overtime'
            employeeId: "",
            transactionType: "",
            startDate: undefined,
            dateOfTransactionCalculation: undefined,
            hiringMonth: "all",
            amount: undefined,
            numHours: undefined,
            exempted: false,
            calculateValueAsRatio: false,
            stopSalary: "",
            endDate: undefined,
            projectName: "",
            department: "",
            job: "",
            nationality: "",
            classification2: "",
            leaveType: "",
            exemptionOfEmployeesOnVacation: "",
            calculateBasedOn: "",
            basicSalaryPlus: false,
            exemptionAmount: undefined,
            allowanceType: "",
            notes: "",
        },
    });

    function onSubmit(values: z.infer<typeof combinedSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
                {/* General Options Radio Group */}
                <FormField
                    control={form.control}
                    name="generalOption"
                    render={({ field }) => (
                        <FormItem className="mb-6"> {/* Added mb-6 for more bottom margin */}
                            <FormLabel className="text-lg font-semibold mb-4 block">General Options</FormLabel> {/* Larger and bolder label */}
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-wrap gap-4" // Use flex-wrap for responsiveness
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="overtime" id="r1" />
                                        <FormLabel htmlFor="r1">Overtime</FormLabel>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="leaves" id="r2" />
                                        <FormLabel htmlFor="r2">Leaves</FormLabel>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="salary_increase" id="r3" />
                                        <FormLabel htmlFor="r3">Salary Increase</FormLabel>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="vacations" id="r4" />
                                        <FormLabel htmlFor="r4">Vacations</FormLabel>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="vacations_compensation" id="r5" />
                                        <FormLabel htmlFor="r5">Vacations Compensation</FormLabel>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="vacations_adjustments" id="r6" />
                                        <FormLabel htmlFor="r6">Vacations Adjustments</FormLabel>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="other_benefits" id="r7" />
                                        <FormLabel htmlFor="r7">Other Benefits</FormLabel>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="other_deductions" id="r8" />
                                        <FormLabel htmlFor="r8">Other Deductions</FormLabel>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="loans" id="r9" />
                                        <FormLabel htmlFor="r9">Loans</FormLabel>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="part_time" id="r10" />
                                        <FormLabel htmlFor="r10">Part Time</FormLabel>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-6 p-5 card border"> {/* Added space-y-6 for vertical spacing between fields */}
                        
                        <FormField
                            control={form.control}
                            name="employeeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Employee ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Employee ID" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="transactionType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Transaction Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Transaction Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {transactionTypes.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
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
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className="w-full pl-3 text-left font-normal" // w-full for better responsiveness
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
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
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dateOfTransactionCalculation"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of Transaction Calculation</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className="w-full pl-3 text-left font-normal" // w-full for better responsiveness
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
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
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="hiringMonth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hiring Month</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Hiring Month" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {hiringMonths.map((month) => (
                                                <SelectItem key={month.value} value={month.value}>
                                                    {month.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter Amount"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(e.target.value === "" ? undefined : parseFloat(e.target.value))
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="numHours"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Num. of Hours</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter Number of Hours"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(e.target.value === "" ? undefined : parseFloat(e.target.value))
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="calculateValueAsRatio"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">Calculate the Value as a Ratio</FormLabel>
                                </FormItem>
                            )}
                        />

                    </div>

                    {/* Column 2 */}
                    <div className="space-y-6 p-5 card border"> {/* Added space-y-6 for vertical spacing between fields */}
                        
                        <FormField
                            control={form.control}
                            name="stopSalary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stop Salary</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Stop Salary Option" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {stopSalaryOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
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
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className="w-full pl-3 text-left font-normal" // w-full for better responsiveness
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
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
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="projectName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Project Name" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {projectNameOptions.map((project) => (
                                                <SelectItem key={project.value} value={project.value}>
                                                    {project.label}
                                                </SelectItem>
                                            ))}
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
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Department" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {departmentOptions.map((dept) => (
                                                <SelectItem key={dept.value} value={dept.value}>
                                                    {dept.label}
                                                </SelectItem>
                                            ))}
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
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Job" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {jobOptions.map((job) => (
                                                <SelectItem key={job.value} value={job.value}>
                                                    {job.label}
                                                </SelectItem>
                                            ))}
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
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Nationality" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* Assuming nationality options are similar to other dropdowns */}
                                            {/* Replace with actual nationality options if available */}
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="qatar">Qatar</SelectItem>
                                            <SelectItem value="indian">Indian</SelectItem>
                                            <SelectItem value="pakistani">Pakistani</SelectItem>
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
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Classification 2" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {classification2Options.map((cls) => (
                                                <SelectItem key={cls.value} value={cls.value}>
                                                    {cls.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="exempted"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">Exempted</FormLabel>
                                </FormItem>
                            )}
                        />

                    </div>

                    {/* Column 3 */}
                    <div className="space-y-6 p-5 card border"> {/* Added space-y-6 for vertical spacing between fields */}
                        
                        <FormField
                            control={form.control}
                            name="leaveType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Leave Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Leave Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* Assuming leave type options are similar to other dropdowns */}
                                            {/* Replace with actual leave type options if available */}
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="vacation">Vacation</SelectItem>
                                            <SelectItem value="sick_leave">Sick Leave</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="exemptionOfEmployeesOnVacation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Exemption of employees on vacation</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Exemption Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {exemptionOfEmployeesOnVacationOptions.map((exemption) => (
                                                <SelectItem key={exemption.value} value={exemption.value}>
                                                    {exemption.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="calculateBasedOn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Calculate based on</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Calculation Basis" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {calculateBasedOnOptions.map((basis) => (
                                                <SelectItem key={basis.value} value={basis.value}>
                                                    {basis.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="basicSalaryPlus"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">Basic Salary+</FormLabel>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="exemptionAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Exemption Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter Exemption Amount"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(e.target.value === "" ? undefined : parseFloat(e.target.value))
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Radio group for "Those who get the Allowance" / "All Employees" */}
                        <FormField
                            control={form.control}
                            name="allowanceType" // Using allowanceType to store the selected radio button value
                            render={({ field }) => (
                                <FormItem className="space-y-3 pt-4">
                                    <FormLabel>Allowance Type</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-3" // Increased vertical spacing for radio items
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="those_get_allowance" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Those who get the Allowance
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="all_employees" />
                                                </FormControl>
                                                <FormLabel className="font-normal">All Employees</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notes</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter Notes" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    </div>
                    
                </div>

                <div className="">
                    <Button type="submit" className="mt-6">Calculate</Button>
                </div>
            </form>
        </Form>
    );
}