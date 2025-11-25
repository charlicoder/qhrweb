import { AnimatedTabs } from '@/components/AnimatedTabs';
import { HeaderActions } from '@/components/HeaderActions'
import EmployeesContactsRenewalTab from './tabs/EmployeesContactsRenewalTab';
import ExploreEmpContactsRenewalTab from './tabs/ExploreEmpContactsRenewalTab';


const EmployeesContactsRenewalPage = () => {
    const tabsData = [
        {
            value: "employees-contracts-renewal",
            label: "Employees Contacts Renewal",
            content: <EmployeesContactsRenewalTab />,
        },
        {
            value: "explore-employees-contracts-renewal",
            label: "Explore Employees Contacts Renewal",
            content: <ExploreEmpContactsRenewalTab />,
        }
    ];

  return (
    <>
            <div className="">
                <HeaderActions />            
                <AnimatedTabs tabs={tabsData} defaultValue="employees-contracts-renewal" />
            </div>
        </>
  )
}

export default EmployeesContactsRenewalPage