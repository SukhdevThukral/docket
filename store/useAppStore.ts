import { create } from "zustand";
import { persist } from "zustand/middleware";


type Stage = {
    id: string;
    title: string;
    timeframe:string;
    category: string;
    kind: "primary" | "fallback";
    parentId?: string;
    condition?: string;
    status: "done" | "current" | "upcoming";
};

export type Item = {
    id: string;
    label: string;
    done: boolean;
}

export type Application = {
    //shared content
    id: string;
    name: string;
    category: string;
    status: "in_progress" | "not_started" | "complete";

    //aplicaton fields
    dueDate: string;
    daysLeft: number;
    checklist: Item[];

    // pathway fields
    timeframe: string;
    kind: "primary" | "fallback";
    parentId?: string;
    condition?: string;
    pathwayStatus: "done" | "current" | "upcoming";
};

function daysUntil(dateStr: string) {
    if (!dateStr) return 0;
    const due = new Date(dateStr).getTime();
    const now = new Date().setHours(0,0,0,0);
    return Math.max(0, Math.round((due-now)/(1000*60*60*24)));
}

type AppStore = {
    applications: Application[];
    addApplication: (app: Application) => void;
    updateApplication: (id: string, patch: Partial<Application>) => void;
    removeApplication: (id: string) => void;
    toggleChecklistItem: (appId: string, itemId: string) => void;
    incorporateStage: (stage: Stage) => void;
};

export const useAppStore = create<AppStore>()(
    persist(
        (set) => ({
            applications: [
                {
                    id: "s1",
                    name: "IDK Bridge Enrollment",
                    category: "BRIDGE PROGRAM",
                    status: "in_progress",
                    dueDate: "2026-10-20",
                    daysLeft: daysUntil("2026-10-20"),
                    checklist: [
                        { id: "1a", label: "Transcript request", done: true },
                        { id: "1b", label: "Enrollment form", done: true },
                        { id: "1c", label: "Fee receipt upload", done: false },
                    ],
                    timeframe: "2026",
                    kind: "primary",
                    pathwayStatus: "current",
                },
                {
                    id:"s2",
                    name: "Stipendium Hungaricum",
                    category: "SCHOLARSHIP",
                    status: "not_started",
                    dueDate: "2026-11-01",
                    daysLeft: daysUntil("2026-11-01"),
                    checklist: [],
                    timeframe: "Nov 2026 - Sep 2027",
                    kind: "primary",
                    pathwayStatus: "upcoming",
                },
                {
                    id: "s3",
                    name: "US Transfer (need-based aid)",
                    category: "TRANSFER",
                    status: "not_started",
                    dueDate: "",
                    daysLeft: 0,
                    checklist: [],
                    timeframe: "2027",
                    kind: "fallback",
                    parentId: "s2",
                    condition: "If rejected",
                    pathwayStatus: "upcoming",
                },
            ],

            addApplication: (app) => 
                set((state) => ({
                    applications: state.applications.some((a) => a.id === app.id)
                        ? state.applications
                        : [...state.applications, app],
                })),
            
            updateApplication: (id, patch) =>
                set((state) => ({
                    applications: state.applications.map((a) => a.id === id ? {...a, ...patch} : a),
                })),

            removeApplication: (id) => 
                set((state) => ({
                    applications: state.applications.filter((a) => a.id !== id),
                })),

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

            incorporateStage: (stage) => 
                set((state) => {
                    const newApp: Application = {
                        id: stage.id,
                        name: stage.title,
                        category: stage.category,
                        status:"not_started",
                        dueDate: "",
                        daysLeft: 0,
                        checklist: [],
                        timeframe: stage.timeframe,
                        kind: stage.kind,
                        parentId: stage.parentId,
                        condition: stage.condition,
                        pathwayStatus: stage.status,
                    };
                    const already = state.applications.some((a) => a.id === newApp.id);
                    return {
                        applications: already ? state.applications : [...state.applications, newApp],
                    };
                }),
        }),
        {
            name: "docket-store",
        }
    )
)