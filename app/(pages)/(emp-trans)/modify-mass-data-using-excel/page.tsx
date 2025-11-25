import { AnimatedTabs } from '@/components/AnimatedTabs';
import { HeaderActions } from '@/components/HeaderActions'
import DataImportForm from './ModifyMassDataTab'

const ModifyMassDataPage = () => {
    const tabsData = [
        {
            value: "modify-mass-data",
            label: "Modify Mass Data Using Excel",
            content: <DataImportForm />,
        }
    ];

  return (
    <>
            <div className="">
                <HeaderActions />            
                <AnimatedTabs tabs={tabsData} defaultValue="modify-mass-data" />
            </div>
        </>
  )
}

export default ModifyMassDataPage