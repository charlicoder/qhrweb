import { HeaderActions } from "@/components/HeaderActions";
import { AnimatedTabs } from "@/components/AnimatedTabs";
import Overtime from "./Overtime";
import ETFilterForm from "./FilterForm";

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
            content: <div>Change your password here.</div>,
        },
        {
            value: "vacations",
            label: "Vacations",
            content: <div>Vacations content goes here.</div>,
        },
        {
            value: "vacations_compensation",
            label: "Vacations Compensation",
            content: <div>Vacations Compensation content.</div>,
        },
        {
            value: "vacation_adjustment",
            label: "Vacation Adjustment",
            content: <div>Vacation Adjustment content.</div>,
        },
        {
            value: "salary_increase",
            label: "Salary Increase",
            content: <div>Salary Increase content.</div>,
        },
        {
            value: "loans",
            label: "Loans",
            content: <div>Loans content goes here.</div>,
        },
        {
            value: "other_benefits",
            label: "Other Benefits",
            content: <div>Other Benefits content.</div>,
        },
        {
            value: "other_deductions",
            label: "Other Deductions",
            content: <div>Other Deductions content.</div>,
        },
    ];

    return (
        <>
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-5">
                Employee Transactions
            </h1>
            <hr />

            <div className="p-5">
                <HeaderActions />
                <ETFilterForm />
                <AnimatedTabs tabs={tabsData} defaultValue="overtimes" />
            </div>
        </>
    );
};

export default EmployeeTransactions;
