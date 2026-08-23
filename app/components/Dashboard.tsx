"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import ApplicationList from "./ApplicationsList";
import DetailPane from "./DetailPane";
import AddApplicationModal from "./ApplicationModal";

type ChecklistItem = {
    id: string;
    label: string;
    done: boolean
};

type Application = {
    id: string;
    name: string;
    category: string;
    dueDate: string;
    daysLeft: number;
    status: "in_progress" | "not_started" | "complete";
    checklist: ChecklistItem[];
};

type Draft = {
    name: string;
    category: string;
    dueDate: string;
    checklist: string[];
};

function daysUntil(dateStr: string) {
    const due = new Date(dateStr).getTime();
    const now = new Date().setHours(0, 0, 0, 0);
    return Math.max(0, Math.round((due-now)/(1000*60*60*24)))
}

export default function Dashboard({ applications: initialApps }: {applications: Application[]}) {
    const [applications, setApplications] = useState<Application[]>(initialApps);
    const [selectedID, setSelectedID] = useState<string>(initialApps[0]?.id ?? "");
    const [modalOpen, setModalOpen] = useState(false);

    const selected = applications.find((a) => a.id === selectedID);

    function toggleItem(itemId: string) {
        setApplications((prev) => 
        prev.map((app) =>
        app.id !== selectedID ? app : {
            ...app, checklist: app.checklist.map((i) => i.id === itemId ? {...i, done:  !i.done}:i
                ),
            }
        ));   
    }

    function addApplication(draft: Draft) {
        const newApp: Application = {
            id: crypto.randomUUID(),
            name: draft.name,
            category: draft.category,
            dueDate: draft.dueDate,
            daysLeft: daysUntil(draft.dueDate),
            status: "not_started",
            checklist: draft.checklist.map((label) => ({
                id: crypto.randomUUID(),
                label,
                done: false,
            })),
        };
        setApplications((prev) => [...prev, newApp]);
        setSelectedID(newApp.id);

        //todo - persisit to db
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl text-gray-900">Applications</h2>
                <button onClick={() => setModalOpen(true)}
                        className="flex items-center gap-1.5 bg-gray-900 text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                    <Plus className="w-3.5 h-3.5"/> Add application
                </button>
                <button
                className="flex items-center gap-1.5 bg-gray-900 text-white text-sm px-4 py-2 rounded-full">
                    <a href="./pathway">
                        Hi
                    </a>
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
            <AddApplicationModal open={modalOpen} onClose={() => setModalOpen(false)} onConfirm={addApplication}/>
        </div>
    );
}