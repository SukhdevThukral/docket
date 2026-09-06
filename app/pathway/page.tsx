"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import PathwayFlow from "../components/PathwayFlow";
import type { Stage } from "../components/PathwayFlow";
import PathwaySuggestions from "../components/PathwaySuggestions";
import Link from "next/link";


export default function PathwayPage () {
    const {applications, incorporateStage} = useAppStore();
    const [focusStageId, setFocusStageId] = useState<string | null>(null);

    const stages: Stage[] = applications.map((a) => ({
        id: a.id,
        title: a.name,
        timeframe: a.timeframe,
        category: a.category,
        kind: a.kind,
        parentId: a.parentId,
        condition: a.condition,
        status: a.pathwayStatus,
    }));

    async function handleIncorporate(stage: Stage) {

        const lastPrimary = stages.filter((s) => s.kind === "primary").at(-1);
        const fixedStage = {
            ...stage,
            parentId: stage.parentId ?? lastPrimary?.id,
        };
        
        try {
            const r = await fetch("/api/applications/generate", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    description: stage.title,
                    existingApplications: applications.map((a) => ({id: a.id, name: a.name, kind: a.kind})),
                }),
            });
            const data = await r.json();
            incorporateStage({...fixedStage, checklist: data.checklist ?? []});
        } catch {
            incorporateStage(fixedStage);
        }
    }
    return (
        <div className="min-h-screen bg-white px-6 sm:px-12 md:px-24 lg:px-50 py-10">
            <h2 className="font-display text-xl text-gray-900 mb-4">Your pathway</h2>
            <Link href="/dashboard" className="flex items-center gap-1.5 bg-gray-900 text-white text-sm px-4 py-2 rounded-full hover:bg-gray-500 transition-colors mb-4 inline-flex">
                Dashboard →
            </Link>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <PathwayFlow stages={stages} onSuggest={setFocusStageId}/>
                </div>
                <PathwaySuggestions stages={stages} onIncorporate={handleIncorporate} focusStageId={focusStageId} onFocusClear={() => setFocusStageId(null)}/>
            </div>
        </div>
    );
}