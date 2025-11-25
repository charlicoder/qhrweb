"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

const ContractRenewalForm = () => {
  const form = useForm({
    defaultValues: {
      employeeId: "10810",
      site: "",
      workType: "",
      department: "",
      gender: "",
      profitCenter: "",
      contractType: [],
      shiftType: "",
      job: "",
      section: "",
      nationality: [],
      classification2: [],
      deptSections: "",
      jobHierarchy: "",
      expireFrom: null,
      expireTo: null,
      isExtensionChecked: false,
      extensionDate: null,
      isCalcDateChecked: false,
      calcDate: null,
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-slate-50 dark:bg-background p-4">
      <Card className="w-full max-w-[1400px] shadow-sm border-t-4 border-t-blue-600 dark:bg-card dark:border-blue-500">
        
        {/* Header Section */}
        <CardHeader className="pb-4 border-b dark:border-border flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium text-slate-800 dark:text-slate-200">
            General Options
          </CardTitle>
          <Button variant="outline" className="border-slate-800 text-slate-800 hover:bg-slate-100 dark:border-slate-200 dark:text-slate-200 dark:hover:bg-slate-800">
            Renewal
          </Button>
        </CardHeader>

        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* --- Row 1: Employee ID --- */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <FormField
                  control={form.control}
                  name="employeeId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2 space-y-0">
                      <FormLabel className="w-[140px] pt-2 sm:pt-0 text-slate-600 dark:text-slate-400 font-medium">
                        Employee ID
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="w-full sm:w-[150px] h-8 bg-white dark:bg-slate-900" 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 pl-0 sm:pl-4 uppercase">
                  Abdullah Hamed Hemida Moursi
                </span>
              </div>

              {/* --- Main Grid: Left & Right Columns --- */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
                
                {/* Left Column */}
                <div className="space-y-3">
                  <SelectRow form={form} name="site" label="Site" />
                  <SelectRow form={form} name="workType" label="Work Type" />
                  <SelectRow form={form} name="department" label="Department" />
                  <SelectRow form={form} name="gender" label="Gender" />
                  <SelectRow form={form} name="profitCenter" label="Profit Center" placeholder="Choose" />
                  
                  {/* List Box: Contract Type */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <span className="w-[140px] text-sm font-medium text-slate-600 dark:text-slate-400 pt-1">
                      Contract Type
                    </span>
                    <div className="w-full sm:w-[300px] h-[100px] border rounded-md bg-white dark:bg-slate-900 dark:border-slate-700 overflow-hidden">
                       <ScrollArea className="h-full w-full p-2">
                          {["Permanent", "Temporary", "Casual", "Consultant"].map((item) => (
                             <div key={item} className="flex items-center space-x-2 mb-1">
                                <Checkbox id={`ct-${item}`} />
                                <label htmlFor={`ct-${item}`} className="text-xs">{item}</label>
                             </div>
                          ))}
                       </ScrollArea>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <SelectRow form={form} name="shiftType" label="Shift Type" />
                  <SelectRow form={form} name="job" label="Job" />
                  <SelectRow form={form} name="section" label="Section" />
                  
                  {/* List Box: Nationality */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <span className="w-[140px] text-sm font-medium text-slate-600 dark:text-slate-400 pt-1">
                      Nationality
                    </span>
                    <div className="w-full sm:w-[300px] h-[100px] border rounded-md bg-white dark:bg-slate-900 dark:border-slate-700 overflow-hidden">
                       <ScrollArea className="h-full w-full p-2">
                          {["20 - America", "1 - Bangladesh", "2 - Canada", "3 - Egypt", "4 - India", "5 - Qatar"].map((item) => (
                             <div key={item} className="text-xs py-0.5 px-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                                {item}
                             </div>
                          ))}
                       </ScrollArea>
                    </div>
                  </div>

                  {/* List Box: Classification 2 */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <span className="w-[140px] text-sm font-medium text-slate-600 dark:text-slate-400 pt-1">
                      Classification 2
                    </span>
                    <div className="w-full sm:w-[300px] h-[100px] border rounded-md bg-white dark:bg-slate-900 dark:border-slate-700 overflow-hidden">
                       <ScrollArea className="h-full w-full p-2">
                          {["Choose", "8 - Accounts", "10 - Administration", "17 - Camps", "18 - HR"].map((item) => (
                             <div key={item} className="text-xs py-0.5 px-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                                {item}
                             </div>
                          ))}
                       </ScrollArea>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Full Width Input Rows --- */}
              <div className="space-y-3 pt-2">
                 <FormField
                    control={form.control}
                    name="deptSections"
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2 space-y-0">
                        <FormLabel className="w-[140px] text-slate-600 dark:text-slate-400 font-medium">Dept & Sections</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full max-w-[800px] h-8 bg-white dark:bg-slate-900" />
                        </FormControl>
                      </FormItem>
                    )}
                 />
                 <FormField
                    control={form.control}
                    name="jobHierarchy"
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2 space-y-0">
                        <FormLabel className="w-[140px] text-slate-600 dark:text-slate-400 font-medium">Job Hierarchy</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full max-w-[800px] h-8 bg-white dark:bg-slate-900" />
                        </FormControl>
                      </FormItem>
                    )}
                 />
              </div>

              {/* --- Date Ranges & Checkboxes --- */}
              <div className="space-y-4 pt-4">
                
                {/* Expire From / To */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="w-[140px] text-sm font-medium text-slate-600 dark:text-slate-400">Whose Contracts Expire From</span>
                        <DatePickerField form={form} name="expireFrom" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="w-auto sm:w-[40px] text-sm font-medium text-slate-600 dark:text-slate-400 text-left sm:text-center">To</span>
                        <DatePickerField form={form} name="expireTo" />
                    </div>
                </div>

                {/* Extension Checkbox + Date */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                     <FormField
                        control={form.control}
                        name="isExtensionChecked"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0 w-[140px]">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="text-xs font-normal leading-tight cursor-pointer">
                                    Employees Contracts Extension to Date
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                     <DatePickerField form={form} name="extensionDate" />
                </div>

                 {/* Calculation Checkbox + Date */}
                 <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                     <FormField
                        control={form.control}
                        name="isCalcDateChecked"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0 w-[140px]">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="text-xs font-normal leading-tight cursor-pointer">
                                    Date of Transaction Calculation
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                     <DatePickerField form={form} name="calcDate" />
                </div>

              </div>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

/* --- Helper Components --- */

const SelectRow = ({ form, name, label, placeholder = "All" }: any) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2 space-y-0">
        <FormLabel className="w-[140px] text-sm font-medium text-slate-600 dark:text-slate-400 pt-2 sm:pt-0">
          {label}
        </FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className="w-full sm:w-[300px] h-8 bg-white dark:bg-slate-900 dark:border-slate-700">
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

const DatePickerField = ({ form, name }: any) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full sm:w-[150px] h-8 pl-3 text-left font-normal border-slate-300 dark:border-slate-700 dark:bg-slate-900",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(field.value, "dd/MM/yyyy")
                ) : (
                  <span></span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 text-green-600 dark:text-green-500" />
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
      </FormItem>
    )}
  />
);

export default ContractRenewalForm;