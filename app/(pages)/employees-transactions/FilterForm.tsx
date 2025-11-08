"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter, Search } from "lucide-react";
import { DatePicker } from "@/components/cui/date-picker"; // Ensure correct import path

const ETFilterForm = () => {
    // State to manage the date pickers
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    
    // State to control the accordion's open/closed state
    const [accordionValue, setAccordionValue] = useState("");

    // Set the default state of the accordion based on screen size after the component mounts
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setAccordionValue("item-1"); // Open on desktop
            } else {
                setAccordionValue(""); // Ensure it's closed on mobile
            }
        };
        
        // Set initial state
        handleResize();
        
        // Optional: listen to resize events if you want it to adapt dynamically
        // window.addEventListener('resize', handleResize);
        // return () => window.removeEventListener('resize', handleResize);

    }, []); // Empty dependency array ensures this runs only once on mount

    const handleValueChange = (value: string) => {
        // On desktop, prevent the user from closing the accordion
        if (window.innerWidth >= 1024) {
            setAccordionValue("item-1");
        } else {
            setAccordionValue(value);
        }
    };

    return (
        <form className="w-full">
            <Accordion 
              type="single" 
              collapsible 
              className="w-full p-4 border rounded-lg bg-card text-card-foreground"
              value={accordionValue}
              onValueChange={handleValueChange}
            >
                <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="p-0 hover:no-underline lg:cursor-default">
                        {/* Mobile-only Trigger: "Show Filters" */}
                        <div className="flex items-center justify-start gap-2 text-sm font-semibold lg:hidden">
                            <Filter className="h-4 w-4" />
                            Show Filters
                        </div>

                        {/* Desktop-only Title: "Filter Options" (not a clickable button) */}
                        <div className="hidden lg:flex items-center justify-start text-base font-semibold">
                            Filter Options
                        </div>
                    </AccordionTrigger>

                    <AccordionContent className="pt-6">
                        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 items-end">
                            {/* Employee ID Field */}
                            <Field>
                                <FieldLabel htmlFor="employee-id">Employee ID</FieldLabel>
                                <Input id="employee-id" placeholder="e.g., 12345" />
                            </Field>

                            {/* Transaction Type Field */}
                            <Field>
                                <FieldLabel htmlFor="transaction-type">Transaction Type</FieldLabel>
                                <Select defaultValue="all">
                                    <SelectTrigger id="transaction-type">
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="holiday-ot">Holiday-OT</SelectItem>
                                        <SelectItem value="regular-ot">Regular-OT</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>

                            {/* Transaction Status Field */}
                            <Field>
                                <FieldLabel htmlFor="transaction-status">Status</FieldLabel>
                                <Select defaultValue="all">
                                    <SelectTrigger id="transaction-status">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="unposted">Unposted</SelectItem>
                                        <SelectItem value="posted">Posted</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>

                            {/* Start Date Field */}
                            <Field>
                                <FieldLabel>Start Date</FieldLabel>
                                <DatePicker date={startDate} setDate={setStartDate} />
                            </Field>

                            {/* End Date Field */}
                            <Field>
                                <FieldLabel>End Date</FieldLabel>
                                <DatePicker date={endDate} setDate={setEndDate} />
                            </Field>

                            {/* Filter Button */}
                            <Button type="submit" className="w-full">
                                <Search className="w-4 h-4 mr-2" />
                                Filter
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </form>
    );
};

export default ETFilterForm;