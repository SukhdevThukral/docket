import Dashboard from "../components/Dashboard";

const applications = [
    {
        id: "1",
        name: "HMR Bridge Enrollment",
        category: "BRIDGE PROGRAM",
        dueDate: "2026-10-20",
        daysLeft: 63,
        status: "in_progress" as const,
        checklist: [
            { id: "1a", label: "Transcript request", done: true},
            {id: "1b", label: "Enrollment form", done: true},
            { id: "1c", label: "Fee receipt upload", done: false},
        ],
    },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-white px-6 sm:px-12 md:px-24 lg:px-50 py-10">
            <Dashboard applications={applications}/>
        </div>
    );
}