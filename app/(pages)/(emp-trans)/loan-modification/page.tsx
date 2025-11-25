import { AnimatedTabs } from '@/components/AnimatedTabs';
import { HeaderActions } from '@/components/HeaderActions'
import LoadModificationTab from './LoanModificationTab';

const LoanModificationPage = () => {
    const tabsData = [
        {
            value: "loan-modification",
            label: "Loan Modification",
            content: <LoadModificationTab />,
        }
    ];

  return (
    <>
            <div className="">
                <HeaderActions />            
                <AnimatedTabs tabs={tabsData} defaultValue="loan-modification" />
            </div>
        </>
  )
}

export default LoanModificationPage