"use client";

import { useAppStore } from "@/store/useAppStore";
import Dashboard from "../components/Dashboard";

export default function DashboardPage() {
    const {applications} = useAppStore();
    return (
        <div className="min-h-screen bg-white px-6 sm:px-12 md:px-24 lg:px-50 py-10">
            <Dashboard applications={applications}/>
        </div>
    );
}