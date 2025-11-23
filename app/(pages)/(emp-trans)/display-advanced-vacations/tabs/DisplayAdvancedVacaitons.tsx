import React, { Fragment } from 'react'
import { DAV_FilterForm } from './DAV_FilterForm'
import { Card, CardContent, CardHeader } from '@mui/material'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AdvancedVacationDataTable } from './DAV_DataTable'

const DisplayAdvancedVacaitons = () => {
    return (
        <Fragment>
            <DAV_FilterForm />
            <Card className="rounded-none">
                <CardContent className="dark:bg-gray-800">

                    <AdvancedVacationDataTable />

                </CardContent>
            </Card>
        </Fragment>
    )
}

export default DisplayAdvancedVacaitons