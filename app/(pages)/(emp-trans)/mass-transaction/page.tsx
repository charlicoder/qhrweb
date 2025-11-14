import React from 'react'
import { HeaderActions } from "@/components/HeaderActions";
import { AnimatedTabs } from "@/components/AnimatedTabs";
import MassTransactions from './tabs/mass-transactions';
import DisplayMassTransactions from './tabs/DisplayMassTransactions';
import TransactionThroughExcel from './tabs/TransactionThroughExcel';

const MassTransactionPage = () => {
    const tabsData = [
        {
            value: "massTransaction",
            label: "Mass Transaction",
            content: <MassTransactions />,
        },
        {
            value: "transactionexcel",
            label: "Transaction Through Excel",
            content: <TransactionThroughExcel />,
        },
        {
            value: "displaymasstransaction",
            label: "Display Mass Transaction",
            content: <DisplayMassTransactions />,
        }
    ]

    return (
        <>
            <div className="">
                <HeaderActions />
                <AnimatedTabs tabs={tabsData} defaultValue="massTransaction" />
            </div>

        </>
    )
}

export default MassTransactionPage