"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import ApplicationList from "./ApplicationsList";
import DetailPane from "./DetailPane";
import AddApplicationModal from "./ApplicationModal";
import { useAppStore } from "@/store/useAppStore";
import type { Application } from "@/store/useAppStore";

type Draft = {
    name: string;
    category: string;
    dueDate: string;
    checklist: string[];
};

function daysUntil(dateStr: string) {
    if (!dateStr) return 0;
    const due = new Date(dateStr).getTime();
    const now = new Date().setHours(0, 0, 0, 0);
    return Math.max(0, Math.round((due-now)/(1000*60*60*24)))
}

export default function Dashboard() {
    const {applications, addApplication, toggleChecklistItem} = useAppStore();
    const [selectedID, setSelectedID] = useState<string>(applications[0]?.id ?? "");
    const [modalOpen, setModalOpen] = useState(false);

    const selected = applications.find((a) => a.id === selectedID);

    function toggleItem(itemId: string) {
        toggleChecklistItem(selectedID, itemId);
    }

    function handleAdd(draft: Draft) {
        const newApp: Application = {
            id: crypto.randomUUID(),
            name: draft.name,
            category: draft.category,            
            status: "not_started",
            dueDate: draft.dueDate,
            daysLeft: daysUntil(draft.dueDate),
            checklist: draft.checklist.map((label) => ({
                id: crypto.randomUUID(),
                label,
                done: false,
            })),
            timeframe: draft.dueDate,
            kind: "primary",
            pathwayStatus: "upcoming",
        };
        addApplication(newApp);
        setSelectedID(newApp.id);
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h2 className="font-display text-xl text-gray-900">Applications</h2>
                    <a href="./pathway"
                        className="flex items-center gap-1.5 bg-gray-900 text-white text-sm px-4 py-2 rounded-full hover:bg-gray-500 transition-colors">
                        Pathway →
                    </a>
                </div>
                <button onClick={() => setModalOpen(true)}
                        className="flex items-center gap-1.5 bg-gray-900 text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                    <Plus className="w-3.5 h-3.5"/> Add application
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4">
                <ApplicationList applications={applications.map((a) => ({
                    ...a, itemsDone: a.checklist.filter((i) => i.done).length,
                    itemsTotal: a.checklist.length,
                }))}
                selectedID={selectedID} onSelect={setSelectedID}/>
                {selected && <DetailPane app={selected} onToggleItem={toggleItem}/>}
            </div>
            <AddApplicationModal open={modalOpen} onClose={() => setModalOpen(false)} onConfirm={handleAdd}/>
        </div>
    );
}