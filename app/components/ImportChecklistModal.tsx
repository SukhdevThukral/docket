"use client"

import { useState } from "react";
import {X, Sparkles, Loader2, Trash2} from "lucide-react";

export default function ImportChecklistModal({
    open, onClose, onConfirm, appName,
} : {
    open: boolean;
    onClose: () => void;
    onConfirm: (items: string[]) => void;
    appName: string;
}) {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [items, setItems] = useState<string[] | null>(null);

    if (!open) return null;

    async function generate() {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/applications/import-checklist", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({text: input, appName}),
            });
            if (!res.ok) throw new Error();
            const data = await  res.json();
            setItems(data.items);
        } catch {
            setError("Could't extract items, try rephrasing.")
        } finally {
            setLoading(false);
        }
    }
    function reset() {
        setInput("");
        setItems(null);
        setError("");
    }

    function updateItem(index: number, value: string){
        if (!items) return;
        const next = [...items];
        next[index] = value;
        setItems(next);
    }

    function removeItem(index: number){
        if (!items) return;
        setItems(items.filter((_, i) => i!==index));
    }

    function confirm() {
        if (!items) return;
        onConfirm(items.filter((i) => i.trim().length>0));
        onClose();
        reset();
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative max-h-[85vh] overflow-y-auto">
                <button onClick={() => {onClose(); reset();}} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4"/>
                </button>
                <h3 className="font-display text-lg text-gray-900">Import from text</h3>
                <p className="text-sm text-gray-500 mt-1">
                    Paste any text - email, website, PDF copy - and we'll extract the checklist items.
                </p>

                {!items && (
                    <div className="mt-5">
                        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste requirements, email, or any text here..." rows={5}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-gray-400"/>
                        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                        <button onClick={generate} disabled={loading || input.trim().length < 10}
                        className="mt-3 flex items-center gap-2 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-40"
                        >
                            {loading ? (
                                <><Loader2 className="w-3.5 h-3.5 animate-spin"/>Extracting...</>
                            ): (
                                <><Sparkles className="w-3.5 h-3.5"/>Extract items</>
                            )}
                        </button>
                    </div>
                )}

                {items && (
                    <div className="mt-5">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                            Review before adding
                        </p>
                        <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-1.5">
                            {items.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <input value={item} onChange={(e) => updateItem(i, e.target.value)}
                                    className="flex-1 text-sm text-gray-800 border-b border-gray-100 pb-1 focus:outline-none focus:border-gray-400"/>
                                    <button onClick={() => removeItem(i)} className="text-gray-300 hover:text-red-400 shrink-0">
                                        <Trash2 className="w-3.5 h-3.5"/>
                                    </button>
                                </div>
                            ))}
                            {items.length === 0 && (
                                <p className="text-xs text-gray-400">No items extracted - try different text.</p>
                            )}
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                            <button onClick={confirm} disabled={items.length === 0} className="bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-40">
                                Add {items.length} item{items.length !== 1?"s":""}
                            </button>
                            <button onClick={reset} className="text-sm text-gray-500 hover:text-gray-700">
                                Start Over
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}