import { HeaderActions } from "@/components/HeaderActions";
import { AccuringVacationsBalancesForm } from "./AccuringVacationsBalancesForm";
import React, { Fragment } from 'react'

export default function AccuringVacationsBalancesPage() { // <-- Exporting a React Component
    return (
        <Fragment>
            <HeaderActions />
            {/* You can add a header or navigation here if needed */}
            <AccuringVacationsBalancesForm />
        </Fragment>
    );
}
