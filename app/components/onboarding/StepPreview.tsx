"use client";

import { useEffect, useState } from "react";
import { Loader2, RefreshCcw, CornerDownRight } from "lucide-react";
import type { OnboardingData } from "@/app/onboarding/page";
import type { Application } from "@/store/useAppStore";

const category_col: Record<string, string> = {
    "SCHOLARSHIP":  "bg-violet-50 text-violet-600",
    "UNIVERSITY":   "bg-blue-50 text-blue-600",
    "BRIDGE PROGRAM": "bg-amber-50 text-amber-600",
    "OTHERS": "bg-gray-100 text-gray-500",
};

export default function StepPreview({
    data,onBack, onConfirm,
} : {
    data: OnboardingData;
    onBack: () => void;
    onConfirm: (Applications: Application[]) => void;
}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [applications, setApplications] = useState<Application[] | null>(null);

    useEffect(() => {
        generate();
    }, []);

    async function generate() {
        setLoading(true);
        setError("");
        setApplications(null);
        try {
            const res = await fetch("/api/onboarding/generate", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error();
            const result = await res.json();
            setApplications(result.applications);
        } catch {
            setError("Couldn't generate your pathway - try again please.");
        } finally {
            setLoading(false);
        }
    }


    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400"/>
            <p className="text-sm text-gray-500">Building your personalized pathway...</p>
        </div>
    );


    if (error) return (
        <div className="py-12 flex flex-col items-start gap-4">
            <p className="text-sm text-red-500">{error}</p>
            <div className="flex gap-3">
                <button onClick={generate} className="bg-gray-900 text-white text-sm px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
                    Retry
                </button>
                <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700">Back</button>
            </div>
        </div>
    );

    const primaries = applications?.filter(a=> a.kind==="primary") ??  [];
    const fallbackOf = (id: string) => applications?.filter(a=> a.kind==="fallback"&& a.parentId===id) ?? [];

    return (
        <div>
            <h1 className="font-display text-2xl text-gray-900">Your pathway</h1>
            <p className="text-sm text-gray-500 mt-2">AI-generated based on your answers. You can edit everything after.</p>

            <div className="mt-6 flex flex-col gap-3">
            {primaries.map((app) => (
                <div key={app.id}>
                    <div className="px-5 py-4 rounded-xl border border-gray-200 bg-white">
                        <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-medium text-gray-900 leading-snug">
                                {app.name}
                            </p>
                            <span className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full ${category_col[app.category] ?? category_col["OTHER"]}`}>
                                {app.category}
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{app.timeframe}</p>

                        {app.checklist.length > 0 && (
                            <ul className="mt-3 flex flex-col gap-1 border-t border-gray-100 pt-3">
                                {app.checklist.slice(0, 3).map((item, j) => (
                                    <li key={j} className="text-xs text-gray-500 flex items-start gap-1.5">
                                        <span className="mt-[3px] w-1 h-1 rounded-full bg-gray-300 shrink-0"/>
                                        {item.label}
                                    </li>
                                ))}
                                {app.checklist.length > 3 && (
                                    <li className="text-xs text-gray-400 pl-2.5">+{app.checklist.length-3} more</li>
                                )}
                            </ul>
                        )}
                    </div>

                    {fallbackOf(app.id).map((fb) => (
                        <div key={fb.id} className="ml-5 mt-1.5 flex items-start gap-2">
                            <CornerDownRight className="w-3.5 h-3.5 text-gray-300 mt-3 shrink-0"/>
                            <div className="flex-1 px-4 py-3 rounded-xl border border-dashed border-gray-200 bg-gray-50">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-xs font-medium text-gray-600">{fb.name}</p>
                                    <span className="text-[10px] text-gray-400 italic">{fb.condition ?? "fallback"}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-0.5">{fb.timeframe}</p>
                            </div>
                        </div>
                    ))}
                    
                </div>
                ))}
            </div>

            <div className="flex items-center gap-4 mt-10 pt-6 border-t border-gray-100">
                <button onClick={() => onConfirm(applications!)} className="bg-gray-900 text-white text-sm px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
                    Confirm Pathway
                </button>
                <button onClick={generate} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">
                    <RefreshCcw className="w-3.5 h-3.5"/>
                    Regenerate
                </button>
                <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-600 ml-auto transition-colors">Back</button>
            </div>
        </div>
    );
}