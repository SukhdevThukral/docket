"use client";

import { useState } from "react";
import {X, Sparkles, Loader2, Trash2, Plus } from "lucide-react";

type Draft = {
    name: string;
    category: string;
    dueDate: string;
    checklist: string[];
};

export default function AddApplicationModal({
    open,
    onClose,
    onConfirm,
} : {
    open: boolean;
    onClose: () => void;
    onConfirm: (draft: Draft) => void;
}) {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [draft, setDraft] = useState<Draft | null>(null);

    if (!open) return null;

    async function generate() {
        setLoading(true);
        setError("");
        try {
            const res =  await fetch("/api/applications/generate", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({description: input}),
            });
            if (!res.ok) throw new Error();
            const data = await res.json();
            setDraft(data);
        } catch {
            setError("Couldn't process that - try rephrasing!");
        } finally {
            setLoading(false);
        }
    }

    function reset() {
        setInput("");
        setDraft(null);
        setError("");
    }

    function updateChecklistItem(index: number, value: string) {
        if (!draft) return;
        const next = [...draft.checklist];
        next[index] = value;
        setDraft({ ...draft, checklist: next });
    }

    function removeChecklistItem(index: number) {
        if (!draft) return;
        setDraft({ ...draft, checklist: draft.checklist.filter((_, i) => i !== index) });
    }

    function addChecklistItem() {
        if (!draft) return;
        setDraft({ ...draft, checklist: [...draft.checklist, ""] });
    }

    function confirm(){
        if (!draft) return;
        onConfirm({...draft, checklist: draft.checklist.filter((c) => c.trim().length > 0) });
        onClose();
        reset();
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative max-h-[85vh] overflow-y-auto">
                <button onClick={() => {onClose(); reset(); }} className="absolute t op-4 right-4 text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4"/>
                </button>
                <h3 className="font-display text-lg text-gray-900">Add application</h3>
                <p className="text-sm text-gray-500 mt-1">
                    Describe it in your own words - Docket will in the rest.
                </p>

                {!draft && (
                    <div className="mt-5">
                        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. Stipendium Hangaricum Scholarship, deadline mid november, applying to ELTE and Debrecen" rows={3}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:border-gray-400"/>

                        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                        <button onClick={generate} disabled={loading || input.trim().length < 3} className="mt-3 flex items-center gap-2 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-40">
                            {loading ? (
                                <><Loader2 className="w-3.5 h-3.5 animate-spin"/>Thinking...</>
                            ): (
                                <><Sparkles className="w-3.5 h-3.5"/>Generate</>
                            )}
                        </button>
                    </div>
                )}
                {draft && (
                    <div className="mt-5">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                            Review before adding
                        </p>
                        <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
                            <div>
                                <label className="text-[10px] text-gray-400 uppercase tracking-wide">Name</label>
                                <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value})} className="w-full text-sm font-display text-gray-900 border-b border-gray-200 pb-1.5 focus:outline-none focus:border-gray-400"/>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="text-[10px] text-gray-400 uppercase tracking-wide">Category</label>
                                    <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                                    className="f-wull text-sm text-gray-800 border-b border-gray-200 pb-1.5 focus:outline-none focus:border-gray-400 bg-transparent">
                                        <option value="SCHOLARSHIP">Scholarship</option>
                                        <option value="UNIVERSITY">University</option>
                                        <option value="BRIDGE PROGRAM">Bridge Program</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="text-[10px] text-gray-400 uppercase tracking-wide">
                                        Due Date
                                    </label>
                                    <input type="date" value={draft.dueDate} onChange={(e) => setDraft({...draft, dueDate: e.target.value})}
                                    className="w-full text-sm text-gray-800 border-b border-gray-200 pb-1.5 focus:outline-none focus:border-gray-400"/>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] text-gray-400 uppercase tracking-wide">Checklist</label>
                                <div className="flex flex-col gap-1.5 mt-1.5">
                                    {draft.checklist.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <input value={item} onChange={(e) => updateChecklistItem(i, e.target.value )}
                                            className="flex-1 text-sm text-gray-800 border-b border-gray-100 pb-1 focus:outline-none focus:border-gray-400"/>
                                            <button onClick={() => removeChecklistItem(i)} className="text-gray-300 hover:text-red-400 shrink-0">
                                                <Trash2 className="w-3.5 h-3.5"/>
                                            </button>
                                        </div>
                                    ))}
                                    <button onClick={addChecklistItem} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 mt-1">
                                        <Plus className="w-3 h-3"/> Add item 
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                            <button onClick={confirm}
                            className="bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
                                Add application
                            </button>
                            <button onClick={reset}
                            className="text-sm text-gray-500 hover:text-gray-700">Start over</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}