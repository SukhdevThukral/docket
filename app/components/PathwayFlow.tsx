"use client";

import { useMemo } from "react";
import {
    ReactFlow,
    Background,
    Controls,
    Node,
    Edge,
    Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export type Stage = {
    id: string;
    title: string;
    timeframe: string;
    category: string;
    kind: "primary" | "fallback";
    parentId?: string;
    condition?: string;
    status: "done" | "current" | "upcoming";
};

const DEMO_STAGES: Stage[] = [
    {id: "s1", title: "HMR Bridge Enrollment", timeframe: "2026", category: "BRIDGE PROGRAM", kind: "primary", status: "current"},
    {id: "s2", title: "Stipendium Hungaricum", timeframe: "Nov 2026 - Sep 2027", category: "SCHOLARSHIP", kind: "primary", status: "upcoming"},
    {id: "s3", title: "US Transfer (need-based)", timeframe: "2027", category: "TRANSFER", kind: "fallback", parentId: "s2", condition: "If rejected", status: "upcoming"},
];

function StageNode({data}:{data: Stage & { label: string }}) {
    const isFallBack = data.kind === "fallback";
    const isCurrent = data.status === "current";

    return (
        <div className={`rounded-xl px-4 py-3 w-56 ${isFallBack ? "border border-dashed border-gray-300 bg-gray-50" : "border border-gray-200 bg-white"} ${isCurrent ? "border-gray-900 ring-1 ring-gray-900" : ""}`}>
            {isFallBack && data.condition && (
                <p className="text-[10px] text-gray-400 italic mb-1">{data.condition}</p>
            )}
            <div className="flex items-center gap-1.5">
                <p className="font-display text-sm text-gray-900">{data.title}</p>
                {isCurrent && (
                    <span className="text-[9px] font-mono uppercase bg-gray-900 text-white px-1.5 py-0.5 rounded-full shrink-0">
                        Now
                    </span>
                )}
            </div>
            <p className="text-[10px] text-gray-500 font-mono uppercase mt-1 tracking-wide">
                {data.category} · {data.timeframe}
            </p>
        </div>
    );
}

const nodeTypes = {stage:StageNode};

function layout(stages: Stage[]) : {nodes: Node[]; edges: Edge[]} {
    const primary = stages.filter((s) => s.kind === "primary");
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    primary.forEach((stage, i) => {
        const y = i* 160;
        nodes.push({
            id: stage.id,
            type: "stage",
            position: {x: 0, y},
            data: {...stage, label: stage.title},
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
        });

        if (i>0) {
            edges.push({
                id: `${primary[i-1].id}-${stage.id}`,
                source: primary[i-1].id,
                target: stage.id,
                type: "smoothstep",
            });
        }
        
        const fallbacks = stages.filter((s) => s.kind === "fallback" && s.parentId === stage.id);
        fallbacks.forEach((fb, j) => {
            nodes.push({
                id: fb.id,
                type: "stage",
                position: {x: 340, y: y+j*100},
                data: {...fb, label: fb.title},
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            });
            edges.push({
                id: `${stage.id}-${fb.id}`,
                source: stage.id,
                target: fb.id,
                type: "smoothstep",
                style: {strokeDasharray: "4 4"},
                label: fb.condition,
                labelStyle: {fontSize: 10, fill: "#9ca3af"},
            });
        });
    });

    return {nodes,edges};
}

export default function PathwayFlow({ stages = DEMO_STAGES} : {stages?: Stage[]}) {
    const {nodes, edges} = useMemo(() => layout(stages), [stages]);

    return (
        <div className="w-full h-[600px] border border-gray-200 rounded-xl overflow-hidden">
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView proOptions={{hideAttribution:true}}>
                <Background color="#e5e7eb" gap={20}/>
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    );
}