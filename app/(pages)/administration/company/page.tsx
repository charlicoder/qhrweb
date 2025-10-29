import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ModernDetailsTab from './_tabs/DetailsTab'


const CompanySetupPage = () => {
    return (
        <Tabs defaultValue="account" className="w-full">
            <TabsList className='w-full'>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
                <ModernDetailsTab />
            </TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
    )
}

export default CompanySetupPage