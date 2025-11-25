import { AnimatedTabs } from '@/components/AnimatedTabs';
import { HeaderActions } from '@/components/HeaderActions'
import LoanPostponementForm from './PostponeLoanInstallmentsTab';

const PostponeLoadInstallmentsPage = () => {
    const tabsData = [
        {
            value: "postpone-loan-installments",
            label: "Postpone Loan Installments",
            content: <LoanPostponementForm />,
        }
    ];

  return (
    <>
            <div className="">
                <HeaderActions />            
                <AnimatedTabs tabs={tabsData} defaultValue="postpone-loan-installments" />
            </div>
        </>
  )
}

export default PostponeLoadInstallmentsPage