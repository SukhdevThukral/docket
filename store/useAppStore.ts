import { create } from "zustand";

type ChecklistItem = {
    id: string;
    label: string;
    done: boolean;
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

type Stage = {
    id: string;
    title: string;
    timeframe: string;
    category: string;
    kind: "primary" | "fallback";
    parentId?: string;
    condition?: string;
    status: "done" | "current" | "upcoming";
};

function daysUntil(dateStr: string) {
    const due = new Date(dateStr).getTime();
    const now = new Date().setHours(0,0,0,0);
    return Math.max(0, Math.round((due-now)/(1000*60*60*24)));
}

type AppStore = {
    stages: Stage[];
    applications: Application[];
    setStages: (stages: Stage[]) => void;
    addStage: (stage: Stage) => void;
    addApplication: (app: Application) => void;
    incorporateStage: (stage: Stage) => void;
    toggleChecklistItem: (appId: string, itemId: string) => void;
};

export const useAppStore = create<AppStore>()((set) => ({
    stages: [
        { id: "s1", title: "IDK Bridge enrollment", timeframe: "2026", category: "BRIDGE PROGRAM", kind: "primary", status: "current" },
        { id: "s2", title: "Stipendium Hungaricum", timeframe: "Nov 2026 - Sep 2027", category: "SCHOLARSHIP", kind: "primary", status: "upcoming" },
        { id: "s3", title: "US Transfer (need-based aid)", timeframe: "2027", category: "TRANSFER", kind: "fallback", parentId: "s2", condition: "If rejected", status: "upcoming" },
    ],
    applications: [
        {
            id: "1",
            name: "IDK Bridge Enrollment",
            category: "BRIDGE PROGRAM",
            dueDate: "2026-10-20",
            daysLeft: daysUntil("2026-10-20"),
            status: "in_progress",
            checklist: [
                { id: "1a", label: "Transcript request", done: true },
                { id: "1b", label: "Enrollment form", done: true },
                { id: "1c", label: "Fee receipt upload", done: false },
            ],
        },
    ],

    setStages: (stages) => set({stages}),

    addStage: (stage) => 
        set((state) => ({
            stages: state.stages.some((s) => s.id=== stage.id)
                ? state.stages
                : [...state.stages, stage], 
        })),

    addApplication: (app) => 
        set((state) => ({
            applications: state.applications.some((a) => a.id === app.id)
                ? state.applications
                : [...state.applications, app],
        })),

    incorporateStage: (stage) => 
        set((state) => {
            const newStages = state.stages.some((s) => s.id === stage.id)
                ? state.stages
                : [...state.stages, stage];


            const newApp: Application = {
                id:`app-${stage.id}`,
                name:stage.title,
                category: stage.category,
                dueDate: "",
                daysLeft: 0,
                status: "not_started",
                checklist: [],
            };

            const newApplications = state.applications.some((a) => a.id === newApp.id)
                ? state.applications
                : [...state.applications, newApp];

            return {stages: newStages, applications: newApplications};
        }),

    toggleChecklistItem: (appId, itemId) =>
        set((state) => ({
            applications: state.applications.map((app) => 
                app.id !== appId ? app : {
                    ...app,
                    checklist: app.checklist.map((i) => 
                        i.id === itemId ? { ...i, done: !i.done} : i
                    ),
                }
            ),
        })),
}))