import { HeaderActions } from '@/components/HeaderActions'
import FilterForm from './VR_FilterForm'
import { Separator } from '@radix-ui/react-separator'
import VacationResumptionDataTable from './data-tables/VacationResumptionDataTable'
import { Card, CardContent } from '@mui/material'

const page = () => {

    return (
        <>
            <div className="">
                <HeaderActions />
                <FilterForm />
                <Separator />
                <VacationResumptionDataTable />

            </div>

        </>
    )
}

export default page