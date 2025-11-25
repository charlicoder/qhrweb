"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Upload, FileSpreadsheet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const DataImportForm = () => {
  const form = useForm({
    defaultValues: {
      importCategory: "employees-appraisal",
      // Appraisal Fields
      appraisalType: "",
      appraisalFormType: "",
      // Social Security Fields (Toggles)
      ssnNum: true,
      ssnEligible: true,
      ssnStartDate: true,
      ssnGosiSalary: true,
      // Document Fields
      documentType: "",
      // Allowance Fields
      allowanceType: "",
      // File Upload
      file: null,
    },
  });

  const selectedCategory = form.watch("importCategory");

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 p-6 flex justify-center items-start">
      <Card className="w-full max-w-5xl shadow-md">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-green-600" />
            Data Import Wizard
          </CardTitle>
          <CardDescription>
            Select a category and configure options to import data.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <FormField
                control={form.control}
                name="importCategory"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        {/* 1. Initial Cost Distribution */}
                        <SimpleRadioOption value="initial-cost" label="Initial Cost Distribution" />

                        {/* 2. Social Security Number (With Toggles) */}
                        <div className={cn("rounded-md transition-all duration-200", selectedCategory === "social-security" ? "bg-slate-50 border border-slate-200 p-4" : "")}>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="social-security" className={selectedCategory === "social-security" ? "text-red-600 border-red-600" : ""} />
                                </FormControl>
                                <FormLabel className={cn("font-medium cursor-pointer", selectedCategory === "social-security" && "font-bold text-slate-900")}>
                                Social Security Number
                                </FormLabel>
                            </FormItem>

                            {selectedCategory === "social-security" && (
                                <div className="pl-8 pt-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                                    <SwitchRow form={form} name="ssnNum" label="Social Security Num." />
                                    <SwitchRow form={form} name="ssnEligible" label="Eligible for Social Security" />
                                    <SwitchRow form={form} name="ssnStartDate" label="Social Security Start Date" />
                                    <SwitchRow form={form} name="ssnGosiSalary" label="GOSI Salary" />
                                </div>
                            )}
                        </div>

                        {/* 3. Employees Appraisal (With Inputs) */}
                        <div className={cn("rounded-md transition-all duration-200", selectedCategory === "employees-appraisal" ? "bg-slate-50 border border-slate-200 p-4" : "")}>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="employees-appraisal" className={selectedCategory === "employees-appraisal" ? "text-red-600 border-red-600" : ""} />
                                </FormControl>
                                <FormLabel className={cn("font-medium cursor-pointer", selectedCategory === "employees-appraisal" && "font-bold text-slate-900")}>
                                Employees Appraisal
                                </FormLabel>
                            </FormItem>

                            {selectedCategory === "employees-appraisal" && (
                                <div className="pl-8 pt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                                    <FormField
                                        control={form.control}
                                        name="appraisalType"
                                        render={({ field }) => (
                                        <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4 space-y-0">
                                            <FormLabel className="w-[140px] font-semibold text-slate-700">Appraisal Type</FormLabel>
                                            <FormControl><Input {...field} className="bg-white w-full sm:w-[250px]" /></FormControl>
                                        </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="appraisalFormType"
                                        render={({ field }) => (
                                        <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4 space-y-0">
                                            <FormLabel className="w-[140px] font-semibold text-slate-700">Appraisal Form Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl><SelectTrigger className="bg-white w-full sm:w-[250px]"><SelectValue placeholder="Choose" /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    <SelectItem value="annual">Annual Review</SelectItem>
                                                    <SelectItem value="probation">Probationary</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                        </div>

                        {/* 4. Employee Documents (With Select) */}
                         <div className={cn("rounded-md transition-all duration-200", selectedCategory === "employee-documents" ? "bg-slate-50 border border-slate-200 p-4" : "")}>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="employee-documents" className={selectedCategory === "employee-documents" ? "text-red-600 border-red-600" : ""} />
                                </FormControl>
                                <FormLabel className={cn("font-medium cursor-pointer", selectedCategory === "employee-documents" && "font-bold text-slate-900")}>
                                Employee Documents
                                </FormLabel>
                            </FormItem>

                            {selectedCategory === "employee-documents" && (
                                <div className="pl-8 pt-4 animate-in fade-in slide-in-from-top-2">
                                     <FormField
                                        control={form.control}
                                        name="documentType"
                                        render={({ field }) => (
                                        <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4 space-y-0">
                                            <FormLabel className="w-[140px] font-semibold text-slate-700">Document Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl><SelectTrigger className="bg-white w-full sm:w-[350px]"><SelectValue placeholder="Select Document" /></SelectTrigger></FormControl>
                                                <SelectContent className="max-h-[300px]">
                                                    <SelectItem value="11">11 - Contract</SelectItem>
                                                    <SelectItem value="3">3 - Driving License</SelectItem>
                                                    <SelectItem value="7">7 - Education Certificates</SelectItem>
                                                    <SelectItem value="6">6 - Gate Pass</SelectItem>
                                                    <SelectItem value="5">5 - Health Card</SelectItem>
                                                    <SelectItem value="1">1 - ID Card - Iqama</SelectItem>
                                                    <SelectItem value="8">8 - Kahramaa Gate Pass</SelectItem>
                                                    <SelectItem value="9">9 - MIC Gate Pass</SelectItem>
                                                    <SelectItem value="4">4 - MMUP</SelectItem>
                                                    <SelectItem value="12">12 - NOC - Change Sponsor</SelectItem>
                                                    <SelectItem value="13">13 - NOC - Secondment</SelectItem>
                                                    <SelectItem value="2">2 - Passport</SelectItem>
                                                    <SelectItem value="16">16 - Passport Expiry</SelectItem>
                                                    <SelectItem value="15">15 - QID Expiry</SelectItem>
                                                    <SelectItem value="10">10 - RLIC Gate Pass</SelectItem>
                                                    <SelectItem value="14">14 - Secondment Permit</SelectItem>
                                                    <SelectItem value="17">17 - Sponsorship</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                        </div>

                        {/* 5. Stopped / Active Employees */}
                        <SimpleRadioOption value="stopped-active" label="Stopped / Active Employees (0 ==> Active , 1==> Stopped)" />

                         {/* 6. Deleted Allowance (With Select) */}
                         <div className={cn("rounded-md transition-all duration-200", selectedCategory === "deleted-allowance" ? "bg-slate-50 border border-slate-200 p-4" : "")}>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="deleted-allowance" className={selectedCategory === "deleted-allowance" ? "text-red-600 border-red-600" : ""} />
                                </FormControl>
                                <FormLabel className={cn("font-medium cursor-pointer", selectedCategory === "deleted-allowance" && "font-bold text-slate-900")}>
                                Deleted Allowance
                                </FormLabel>
                            </FormItem>

                            {selectedCategory === "deleted-allowance" && (
                                <div className="pl-8 pt-4 animate-in fade-in slide-in-from-top-2">
                                     <FormField
                                        control={form.control}
                                        name="allowanceType"
                                        render={({ field }) => (
                                        <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4 space-y-0">
                                            <FormLabel className="w-[140px] font-semibold text-slate-700">Allowance Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl><SelectTrigger className="bg-white w-full sm:w-[350px]"><SelectValue placeholder="Select Allowance" /></SelectTrigger></FormControl>
                                                <SelectContent className="max-h-[300px]">
                                                    <SelectItem value="7">7 - Add bonus</SelectItem>
                                                    <SelectItem value="9">9 - Additional allowance</SelectItem>
                                                    <SelectItem value="6">6 - FIXED OVERTIME Allowance</SelectItem>
                                                    <SelectItem value="4">4 - Food Allowance</SelectItem>
                                                    <SelectItem value="1">1 - House Allowance NOT use</SelectItem>
                                                    <SelectItem value="10">10 - HRA</SelectItem>
                                                    <SelectItem value="5">5 - OTHER Allowance</SelectItem>
                                                    <SelectItem value="3">3 - Phone Allowance</SelectItem>
                                                    <SelectItem value="2">2 - Transport Allowance</SelectItem>
                                                    <SelectItem value="8">8 - variable allowance</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                        </div>

                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* --- Footer Upload Section --- */}
              <div className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-6">
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem className="flex flex-col sm:flex-row items-center gap-4 space-y-0 w-full md:w-auto">
                            <FormLabel className="whitespace-nowrap font-semibold">Excel File</FormLabel>
                            <FormControl>
                                <Input 
                                    {...fieldProps}
                                    type="file"
                                    accept=".xlsx, .xls, .csv"
                                    onChange={(event) => onChange(event.target.files && event.target.files[0])}
                                    className="cursor-pointer file:bg-slate-100 file:text-slate-700 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-semibold hover:file:bg-slate-200" 
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    <Button type="submit" className="bg-amber-400 hover:bg-amber-500 text-white font-bold w-full sm:w-32">
                        <Upload className="mr-2 h-4 w-4" /> Load Data
                    </Button>
                    <span className="text-xs text-blue-600 font-medium">
                        &lt;For Example : {selectedCategory} ( <span className="underline cursor-pointer">XLSX</span>, <span className="underline cursor-pointer">XLS</span>, <span className="underline cursor-pointer">CSV</span> )
                    </span>
                </div>
              </div>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

// --- Helper Components ---

const SimpleRadioOption = ({ value, label }: { value: string, label: string }) => (
  <FormItem className="flex items-center space-x-3 space-y-0 p-1">
    <FormControl>
      <RadioGroupItem value={value} />
    </FormControl>
    <FormLabel className="font-medium cursor-pointer">
      {label}
    </FormLabel>
  </FormItem>
);

const SwitchRow = ({ form, name, label }: any) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex items-center space-x-2 space-y-0">
        <FormControl>
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            className="data-[state=checked]:bg-blue-600"
          />
        </FormControl>
        <FormLabel className="text-sm font-medium text-slate-700">
          {label}
        </FormLabel>
      </FormItem>
    )}
  />
);

export default DataImportForm;