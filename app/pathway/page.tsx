"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import PathwayFlow from "../components/PathwayFlow";
import type { Stage } from "../components/PathwayFlow";
import PathwaySuggestions from "../components/PathwaySuggestions";


export default function PathwayPage () {
    const {stages, incorporateStage} = useAppStore();
    const [focusStageId, setFocusStageId] = useState<string | null>(null);

    function handleIncorporate(stage: Stage) {
        incorporateStage(stage);
    }

    return (
        <div className="min-h-screen bg-white px-6 sm:px-12 md:px-24 lg:px-50 py-10">
            <h2 className="font-display text-xl text-gray-900 mb-4">Your pathway</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <PathwayFlow stages={stages} onSuggest={setFocusStageId}/>
                </div>
                <PathwaySuggestions stages={stages} onIncorporate={handleIncorporate} focusStageId={focusStageId} onFocusClear={() => setFocusStageId(null)}/>
            </div>
        </div>
    );
}