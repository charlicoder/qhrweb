import { HeaderActions } from "@/components/HeaderActions";
import { AnimatedTabs } from "@/components/AnimatedTabs";
import Overtime from "./tabs/Overtime";
import ETFilterForm from "./FilterForm";
import Leaves from "./tabs/Leaves";
import Vacations from "./tabs/Vacations";
import VacationCompensation from "./tabs/VacationsCompensation";
import VacationAdjustment from "./tabs/VacationAdjustment";
import SalaryIncrease from "./tabs/SalaryIncrease";
import Loans from "./tabs/Loans";
import OtherBenifits from "./tabs/OtherBenifits";
import OtherDeductions from "./tabs/OtherDeductions";

const EmployeeTransactions = () => {

    const tabsData = [
        {
            value: "overtimes",
            label: "Overtimes",
            content: <Overtime />,
        },
        {
            value: "leaves",
            label: "Leaves",
            content: <Leaves />,
        },
        {
            value: "vacations",
            label: "Vacations",
            content: <Vacations />,
        },
        {
            value: "vacations_compensation",
            label: "Vacations Compensation",
            content: <VacationCompensation />,
        },
        {
            value: "vacation_adjustment",
            label: "Vacation Adjustment",
            content: <VacationAdjustment />,
        },
        {
            value: "salary_increase",
            label: "Salary Increase",
            content: <SalaryIncrease />,
        },
        {
            value: "loans",
            label: "Loans",
            content: <Loans />,
        },
        {
            value: "other_benefits",
            label: "Other Benefits",
            content: <OtherBenifits />,
        },
        {
            value: "other_deductions",
            label: "Other Deductions",
            content: <OtherDeductions />,
        },
    ];

    return (
        <>
            <div className="">
                <HeaderActions />
                <ETFilterForm />
                <AnimatedTabs tabs={tabsData} defaultValue="overtimes" />
            </div>
        </>
    );
};

export default EmployeeTransactions;
