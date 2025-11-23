import { AnimatedTabs } from '@/components/AnimatedTabs'
import { HeaderActions } from '@/components/HeaderActions'
import { Separator } from '@/components/ui/separator'
import React, { Fragment } from 'react'
import DisplayAdvancedVacaitons from './tabs/DisplayAdvancedVacaitons'
import ReturnFromVacation from './tabs/ReturnFromVacation'


const page = () => {
    const tabsData = [
        {
            value: "display_advanced_vacations",
            label: "Display Advanced Vacations",
            content: <DisplayAdvancedVacaitons />,
        },
        {
            value: "return_form_vacation",
            label: "Return Form Vacation",
            content: <ReturnFromVacation />,
        }
    ]

    return (
        <Fragment>
            <HeaderActions />
            <Separator />
            <AnimatedTabs tabs={tabsData} defaultValue="display_advanced_vacations" />
        </Fragment>
    )
}

export default page