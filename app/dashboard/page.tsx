"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

import Dashboard from "../components/Dashboard";

export default function DashboardPage() {
    const { isOnboarded } = useAppStore();
    const router = useRouter();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (hydrated && !isOnboarded) router.push("/onboarding");
    }, [hydrated, isOnboarded, router]);

    if (!hydrated || !isOnboarded) return null;
    return (
        <div className="min-h-screen bg-white px-6 sm:px-12 md:px-24 lg:px-50 py-10">
            <Dashboard />
        </div>
    );
}