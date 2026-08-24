"use client";

import { useState, useCallback } from "react";
import PathwayFlow, {Stage} from "../components/PathwayFlow";
import PathwaySuggestions from "../components/PathwaySuggestions";

// have to replac wtih real fetch from the datab
const INITIAL_STAGES: Stage[] = [
    {id: "s1", title: "IDK Bridge enrollment", timeframe: "2026", category: "BRIDGE PROGRAM", kind: "primary", status: "current"},
    {id: "s2", title: "Stipendium Hungaricum", timeframe: "Nov 2026 - Sep 2027", category: "SCHOLARSHIP", kind: "primary", status: "upcoming"},
    {id: "s3", title: "US Transfer (need-based aid)", timeframe: "2027", category: "TRANSFER", kind: "fallback", parentId: "s2", condition: "If rejected", status: "upcoming"},
];

export default function PathwayPage () {
    const [stages, setStages] = useState<Stage[]>(INITIAL_STAGES);
    const [focusStageId, setFocusStageId] = useState<string | null>(null);


    const handleSuggest = useCallback((stageId: string) => {
        setFocusStageId(stageId);
    }, []);


    const handleIncorporate = useCallback((newStage: Stage) => {
        setStages((prev) => {
            if (prev.some((s) => s.id === newStage.id)) return prev;
            return [...prev, newStage];
        });
    }, []);

    <PathwaySuggestions 
        stages={stages}
        onIncorporate={handleIncorporate}
        focusStageId = {focusStageId}
        onFocusClear = {() => setFocusStageId(null)}
    />

    return (
        <div className="min-h-screen bg-white px-6 sm:px-12 md:px-24 lg:px-50 py-10">
            <h2 className="font-display text-xl text-gray-900 mb-4">Your pathway</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <PathwayFlow stages={stages} onSuggest={handleSuggest}/>
                </div>
                <PathwaySuggestions stages={stages} onIncorporate={handleIncorporate} focusStageId={focusStageId} onFocusClear={() => setFocusStageId(null)}/>
            </div>
        </div>
    );
}