import { HeaderActions } from "@/components/HeaderActions";
import { AccuringOvertimeForm } from "./AccuringOvertimeForm";
import React, { Fragment } from 'react'

export default function AccuringVacationsBalancesPage() { // <-- Exporting a React Component
    return (
        <Fragment>
            <HeaderActions />
            {/* You can add a header or navigation here if needed */}
            <AccuringOvertimeForm />
        </Fragment>
    );
}
