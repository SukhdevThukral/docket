"use client";

import { useState } from "react";
import { Sparkles, Loader2, TriangleAlert, ArrowRight } from "lucide-react";
import type {Stage} from "./PathwayFlow";
import { triggerAsyncId } from "async_hooks";
import { SP } from "next/dist/shared/lib/utils";

type Suggestion = {
    title: string;
    reason: string;
    type: "fallback" | "next_step" | "risk";
};

const ICONS = {
    fallback: ArrowRight, next_step: Sparkles, risk: TriangleAlert,
};

export default function PathwaySuggestions({
    stages} : {stages:Stage[]} ) {
        const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");

        async function getSuggestions() {
            setLoading(true);
            setError("");

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
                    return (
                        <div key={i} className="border border-gray-100 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                                <Icon className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0"/>
                                <div>
                                    <p className="text-sm text-gray-900 font-medium">{s.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{s.reason}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );    
}