import {
    LayoutDashboard, Building2, Network, Users2, Key, History, Warehouse, Package,
    CreditCard, BookOpenText, MapPin, CalendarClock, LayoutGrid, Link2, Inbox,
    Calendar, Settings2, DollarSign, CalendarOff, HandCoins, ShieldCheck,
    CalendarRange, CalendarPlus, GraduationCap, Search, Settings, Repeat, Shield, Clock,
    FileSpreadsheet, FileText, Scale, TrendingUp, Star, CalendarDays, XCircle, Eye, UserX,
    PieChart, Building, Plane, Ticket, UserCheck, Briefcase, Printer, Award, Phone, Stethoscope,
    Asterisk, Signature, Truck, Layers, ChevronDown
} from 'lucide-react';

export const menuItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Administration",
        url: "/administration",
        submenus: [
            {
                title: "Company Setup",
                url: "/administration/company",
                icon: Building2
            },
            {
                title: "Sites Setup",
                url: "/administration/sites",
                icon: Network
            },
            {
                title: "User accounts",
                url: "/administration/user-accounts",
                icon: Users2
            },
            {
                title: "Change Password",
                url: "/account/change-password",
                icon: Key
            },
            {
                title: "Audit Log",
                url: "/administration/audit-log",
                icon: History
            },
            {
                title: "Dept & Sections Setup",
                url: "/administration/dept-sections",
                icon: Warehouse
            },
            {
                title: "Project Setup",
                url: "/administration/project",
                icon: Package
            },
            {
                title: "Currency Setup",
                url: "/administration/currency",
                icon: CreditCard
            },
            {
                title: "Dictinary Management",
                url: "/administration/dictionary",
                icon: BookOpenText
            },
            {
                title: "Regions & Cities Setup",
                url: "/administration/regions-cities",
                icon: MapPin
            },
            {
                title: "Calendar Setup",
                url: "/administration/calendar",
                icon: CalendarClock
            },
            {
                title: "Icons Setup",
                url: "/administration/icons",
                icon: LayoutGrid
            },
            {
                title: "Accounting Linkage Setup",
                url: "/administration/accounting-linkage",
                icon: Link2
            },
            {
                title: "Mandatory Fields Setup",
                url: "/administration/mandatory-feilds",
                icon: Key // Consider Lock or Asterisk for mandatory fields
            },
        ],
        icon: Inbox, // You could use Briefcase or Gears for Administration
    },
    {
        title: "General Setup",
        url: "#",
        icon: Settings, // Changed from Calendar to Settings for better representation
        submenus: [
            {
                title: "System Parameters",
                url: "/general-setup",
                icon: Settings2
            },
            {
                title: "General Information Setup",
                url: "/general-setup",
                icon: Building2 // Could also use Info or Newspaper
            },
            {
                title: "Financial Information Setup",
                url: "/general-setup",
                icon: CreditCard
            },
            {
                title: "Extra Salary Setup",
                url: "/general-setup",
                icon: DollarSign
            },
            {
                title: "Vacations Setup",
                url: "/general-setup",
                icon: CalendarOff // Or Beach, PalmTree for vacation
            },
            {
                title: "Allowances Setup",
                url: "/general-setup",
                icon: HandCoins
            },
            {
                title: "Insurance Setup",
                url: "/general-setup",
                icon: ShieldCheck
            },
            {
                title: "Vacation Parameters Setup",
                url: "/general-setup",
                icon: CalendarRange
            },
            {
                title: "Advance Vacation Setup",
                url: "/general-setup",
                icon: CalendarPlus
            },
            {
                title: "Contacts Setup",
                url: "/general-setup",
                icon: Users2
            },
            {
                title: "Training Setup",
                url: "/general-setup",
                icon: GraduationCap
            },
        ],
    },
    {
        title: "Reports Setup",
        url: "#",
        icon: Search, // Or FileText for reports
        submenus: [
            {
                title: "Report Building",
                url: "/general-setup",
                icon: Settings2 // Consider List or BarChart for report building
            },
            {
                title: "Customized Salary Setup",
                url: "/general-setup",
                icon: Settings2 // Could use Salary or Percent
            },
            {
                title: "Salaries Reports Setup",
                url: "/general-setup",
                icon: Settings2 // Could use Salary or BarChart
            },
        ]
    },
    {
        title: "Employee Profile",
        url: "#",
        icon: Settings, // Could use User or Person for employee profile
        submenus: [
            {
                title: "Employee Profile",
                url: "/general-setup",
                icon: Users2 // Or User
            },
            {
                title: "Display Employee Information",
                url: "/general-setup",
                icon: Users2 // Or Eye
            },
            {
                title: "Employee Explorer",
                url: "/general-setup",
                icon: Search // Or Compass
            },
        ]
    },
    {
        title: "Financial Profile",
        url: "#",
        icon: CreditCard // Changed from Settings for better representation
    },
    {
        title: "Employee Transactions",
        url: "#",
        icon: Settings, // Could use Handshake or ArrowsRightLeft for transactions
        submenus: [
            {
                title: "Employees Transation",
                url: "/employees-transactions",
                icon: Users2 // Or Repeat
            },
            {
                title: "Mass Transaction",
                url: "/general-setup",
                icon: Repeat // Or Shuffle
            },
            {
                title: "Vacation Resumption",
                url: "/general-setup",
                icon: CalendarClock // Or Check
            },
            {
                title: "Display Advanced Vacations",
                url: "/general-setup",
                icon: Calendar // Or Eye
            },
            {
                title: "Update Social Security Salary",
                url: "/general-setup",
                icon: Shield // Or DollarSign
            },
            {
                title: "Accruing Vacations Balances",
                url: "/general-setup",
                icon: Calendar // Or TrendingUp
            },
            {
                title: "Accruing Overtime",
                url: "/general-setup",
                icon: Clock // Or TrendingUp
            },
            {
                title: "Accruing Leaves",
                url: "/general-setup",
                icon: Calendar // Or TrendingUp
            },
            {
                title: "Update Mass Transactions",
                url: "/general-setup",
                icon: Repeat // Or UploadCloud
            },
            {
                title: "Postpone Loans Installments",
                url: "/general-setup",
                icon: Clock // Or CalendarDays
            },
            {
                title: "Modify Mass Data Using Excel",
                url: "/general-setup",
                icon: FileSpreadsheet // Or UploadCloud
            },
            {
                title: "Loan Modification",
                url: "/general-setup",
                icon: CreditCard // Or Edit
            },
            {
                title: "Employees Contracts Renewal",
                url: "/general-setup",
                icon: FileText // Or RefreshCcw
            }
        ]
    },
    {
        title: "Non-Payroll Transactions",
        url: "#",
        icon: Settings, // Could use Coin or DollarSignOff
        submenus: [
            {
                title: "Non-Payroll Item 1",
                url: "/general-setup",
                icon: DollarSign // Or CreditCardOff
            }
        ]
    },
    {
        title: "Promotion",
        url: "#",
        icon: Settings, // Could use Star or Trophy
        submenus: [
            {
                title: "Salary Scale Setup",
                url: "/general-setup",
                icon: Scale // Or Percent
            },
            {
                title: "Annual Increase \ Promotion",
                url: "/general-setup",
                icon: TrendingUp // Or Star
            },
            {
                title: "Annual Increase & Promotion Report",
                url: "/general-setup",
                icon: TrendingUp // Or FileText
            },
            {
                title: "Promotion Appraisal Report",
                url: "/general-setup",
                icon: Star // Or FileText
            }
        ]
    },
    {
        title: "Time Sheet",
        url: "#",
        icon: Settings, // Could use Clock or CalendarDays
        submenus: [
            {
                title: "Setup",
                url: "/general-setup",
                icon: Settings2
            },
            {
                title: "Time Sheet",
                url: "/general-setup",
                icon: Clock
            },
            {
                title: "Monthly Time SHeet",
                url: "/general-setup",
                icon: CalendarDays // Or Clock
            },
            {
                title: "Time Sheet Form Excel",
                url: "/general-setup",
                icon: FileSpreadsheet // Or Clock
            },
            {
                title: "Close Time Sheet",
                url: "/general-setup",
                icon: XCircle // Or Clock
            },
            {
                title: "Mass Transactions",
                url: "/general-setup",
                icon: Repeat // Or Clock
            }
        ]
    },
    {
        title: "Display & Post Transactions",
        url: "#",
        icon: Eye // Changed from Settings for better representation
    },
    {
        title: "Salary Calculation",
        url: "#",
        icon: Settings, // Could use Calculator or Percent
        submenus: [
            {
                title: "Salary Calculation",
                url: "/general-setup",
                icon: DollarSign // Or Calculator
            },
            {
                title: "Extra Salary Calculation",
                url: "/general-setup",
                icon: DollarSign // Or Calculator
            },
            {
                title: "Employee Termination",
                url: "/general-setup",
                icon: UserX // Or X
            },
            {
                title: "Salary Audit Log Report",
                url: "/general-setup",
                icon: History // Or FileText
            },
            {
                title: "Cost Distribution",
                url: "/general-setup",
                icon: PieChart // Or Layers
            },
            {
                title: "Salary Calculation Update",
                url: "/general-setup",
                icon: DollarSign // Or UploadCloud
            },
            {
                title: "Salary Explore",
                url: "/general-setup",
                icon: Search // Or DollarSign
            }
        ]
    },
    {
        title: "Tickets",
        url: "#",
        icon: Settings, // Could use Ticket or Airplane
        submenus: [
            {
                title: "Setup",
                url: "/general-setup",
                icon: Settings2
            },
            {
                title: "Airports Setup",
                url: "/general-setup",
                icon: Building // Or Building
            },
            {
                title: "Flights Setup",
                url: "/general-setup",
                icon: Plane // Or Airplane
            },
            {
                title: "Ticket Issuing",
                url: "/general-setup",
                icon: Ticket // Or Pen
            },
            {
                title: "Ticket Accruals",
                url: "/general-setup",
                icon: Ticket // Or TrendingUp
            },
            {
                title: "Tickets Issuing Report",
                url: "/general-setup",
                icon: Ticket // Or FileText
            },
            {
                title: "Ticket Report",
                url: "/general-setup",
                icon: Ticket // Or FileText
            }
        ]
    },
    {
        title: "General Reports",
        url: "#",
        icon: Settings, // Could use FileText or BarChart
        submenus: [
            {
                title: "Employees Report",
                url: "/general-setup",
                icon: Users2 // Or FileText
            },
            {
                title: "Addresses Report",
                url: "/general-setup",
                icon: Map // Or FileText
            },
            {
                title: "Referees Report",
                url: "/general-setup",
                icon: UserCheck // Or FileText
            },
            {
                title: "Experiences Report",
                url: "/general-setup",
                icon: Briefcase // Or FileText
            },
            {
                title: "Documents Report",
                url: "/general-setup",
                icon: FileText
            },
            {
                title: "Print Documents Report",
                url: "/general-setup",
                icon: Printer // Or FileText
            },
            {
                title: "Skills Report",
                url: "/general-setup",
                icon: Award // Or FileText
            },
            {
                title: "Family Report",
                url: "/general-setup",
                icon: Users2 // Or FileText
            },
            {
                title: "Children Report",
                url: "/general-setup",
                icon: Users2 // Or FileText
            },
            {
                title: "Dependents Report",
                url: "/general-setup",
                icon: Users2 // Or FileText
            },
            {
                title: "Qualifications Report",
                url: "/general-setup",
                icon: GraduationCap // Or FileText
            },
            {
                title: "Contact Information Report",
                url: "/general-setup",
                icon: Phone // Or FileText
            },
            {
                title: "Employee Assets Report",
                url: "/general-setup",
                icon: Package // Or FileText
            },
            {
                title: "Training Courses Report",
                url: "/general-setup",
                icon: GraduationCap // Or FileText
            },
            {
                title: "Medical Files Report",
                url: "/general-setup",
                icon: Stethoscope // Or FileText
            },
            {
                title: "Notes Report",
                url: "/general-setup",
                icon: FileText // Or StickyNote
            },
            {
                title: "Additional Fields Report",
                url: "/general-setup",
                icon: Asterisk // Or FileText
            },
            {
                title: "Employees Count Report",
                url: "/general-setup",
                icon: Users2 // Or BarChart
            },
            {
                title: "Scholarships Report",
                url: "/general-setup",
                icon: GraduationCap // Or FileText
            },
            {
                title: "Terminated Employees Report",
                url: "/general-setup",
                icon: UserX // Or FileText
            },
            {
                title: "Job Description Report",
                url: "/general-setup",
                icon: Briefcase // Or FileText
            },
            {
                title: "C.V Report",
                url: "/general-setup",
                icon: FileText
            },
            {
                title: "Employees Contracts Report",
                url: "/general-setup",
                icon: FileText
            },
            {
                title: "Signature Report",
                url: "/general-setup",
                icon: Signature // Or FileText
            },
            {
                title: "Signature Model Report",
                url: "/general-setup",
                icon: Signature // Or FileText
            },
            {
                title: "Employee Card",
                url: "/general-setup",
                icon: CreditCard // Or User
            },
            {
                title: "Appraisal Report",
                url: "/general-setup",
                icon: Star // Or FileText
            },
            {
                title: "Employees Count Detailed Report",
                url: "/general-setup",
                icon: Users2 // Or BarChart
            },
            {
                title: "Operator / Vehicle Assignment Report",
                url: "/general-setup",
                icon: Truck // Or FileText
            }
        ]
    },
    {
        title: "Financial Reports",
        url: "#",
        icon: Settings, // Could use Banknote or BarChart
        submenus: [
            {
                title: "Salaries Reports",
                url: "/general-setup",
                icon: DollarSign // Or BarChart
            },
            {
                title: "Social Security Reports",
                url: "/general-setup",
                icon: Shield // Or BarChart
            },
            {
                title: "Transactions Reports",
                url: "/general-setup",
                icon: Repeat // Or BarChart
            },
            {
                title: "Reserve Reports",
                url: "/general-setup",
                icon: Layers // Or BarChart
            },
            {
                title: "Other Reports",
                url: "/general-setup",
                icon: FileText // Or BarChart
            },
            {
                title: "Time Sheet Reports",
                url: "/general-setup",
                icon: Clock // Or BarChart
            },
            {
                title: "Loans Report",
                url: "/general-setup",
                icon: CreditCard // Or BarChart
            }
        ]
    }
];