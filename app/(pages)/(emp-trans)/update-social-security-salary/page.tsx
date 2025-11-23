import { HeaderActions } from "@/components/HeaderActions";
import { UpdateSocialSecuritySalaryForm } from "./UpdateSocialSecuritySalaryForm";
import React, { Fragment } from 'react'

export default function UpdateSocialSecuritySalaryPage() { // <-- Exporting a React Component
    return (
        <Fragment>
            <HeaderActions />
            {/* You can add a header or navigation here if needed */}
            <UpdateSocialSecuritySalaryForm />
        </Fragment>
    );
}
