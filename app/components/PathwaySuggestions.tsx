"use client";

import { useState } from "react";
import { Sparkles, Loader2, TriangleAlert, ArrowRight, Plus } from "lucide-react";
import type {Stage} from "./PathwayFlow";

type Suggestion = {
    title: string;
    reason: string;
    type: "fallback" | "next_step" | "risk";
    stageData?: Omit<Stage, "id">;
};

const ICONS = {
    fallback: ArrowRight, next_step: Sparkles, risk: TriangleAlert,
};

export default function PathwaySuggestions({
    stages, onIncorporate,} : {stages:Stage[]; onIncorporate: (stage: Stage) => void;} ) {
        const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");
        const [incorporated, setIncorporated] = useState<Set<number>>(new Set());

        async function getSuggestions() {
            setLoading(true);
            setError("");
            setIncorporated(new Set());

            try {
                const res = await fetch("/api/pathway/suggest", {
                    method:"POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ stages }),
                });
                if (!res.ok) throw new Error();
                const data = await res.json();
                setSuggestions(data.suggestions);
            } catch {
                setError("Couldn't generate suggestions - try again.");
            } finally {
                setLoading(false);
            }
        }

        function handleIncorporate(s: Suggestion, i: number) {
            if (!s.stageData) return;
            const newStage: Stage = {
                ...s.stageData, id: `ai-${Date.now()}-${i}`,
            };
            onIncorporate(newStage);
            setIncorporated((prev) => new Set(prev).add(i));
        }

    return (
        <div className="border border-gray-200 rounded-xl p-5 w-full md:w-80 shrink-0">
            <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 uppercase tracking-wide">AI Suggestions</p>
                <button
                    onClick={getSuggestions}
                    disabled={loading}
                    className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-900 disabled:opacity-40">
                        {loading ? <Loader2 className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3"/>}
                        {suggestions ? "Refresh" : "Analyse"}
                </button>
            </div>
            {error && <p className="text-xs text-red-500 mt-3">{error}</p>}

            {!suggestions && !loading && !error && (
                <p className="text-sm text-gray-400 mt-4">
                    Get AI feedback on gaps or risks in your current pathway!!
                </p>
            )}
            <div className="flex flex-col gap-3 mt-4">
                {suggestions?.map((s, i) => {
                    const Icon = ICONS[s.type];
                    const done = incorporated.has(i);
                    return (
                        <div key={i} className="border border-gray-100 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                                <Icon className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0"/>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900 font-medium">{s.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{s.reason}</p>
                                    {s.stageData && (
                                        <button onClick={() => handleIncorporate(s, i)}
                                        disabled={done}
                                        className={`mt-2 flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-all
                                            ${done 
                                                ? "text-gray-400 bg-gray-50 cursor-default"
                                                : "text-gray-900 bg-gray-100 hover:bg-gray-200"
                                            }`} >
                                                <Plus className="w-3 h-3"/>
                                                {done ? "Added" : "Add to pathway"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );    
}