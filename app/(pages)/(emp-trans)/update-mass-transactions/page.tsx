import { AnimatedTabs } from '@/components/AnimatedTabs';
import { HeaderActions } from '@/components/HeaderActions'
import MassTransactions from './UpdateMassTransactionsTab';

const UpdateMassTransactionsPage = () => {
    const tabsData = [
        {
            value: "update-mass-transactions",
            label: "Update Mass Transactions",
            content: <MassTransactions />,
        }
    ];

  return (
    <>
            <div className="">
                <HeaderActions />            
                <AnimatedTabs tabs={tabsData} defaultValue="update-mass-transactions" />
            </div>
        </>
  )
}

export default UpdateMassTransactionsPage