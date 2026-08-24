"use client";

import { useMemo, useState } from "react";
import {
    ReactFlow,
    Background,
    Controls,
    Node,
    Edge,
    Position,
    MarkerType,
    Handle,
} from "@xyflow/react";
import { Sparkles } from "lucide-react";

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

function StageNode({data}:{data: Stage & { label: string; onSuggest?: (id: string) => void }}) {
    const [hovered, setHovered] = useState(false);
    const isFallBack = data.kind === "fallback";
    const isCurrent = data.status === "current";

    return (
        <div onMouseLeave={() => setHovered(false)}
            onMouseEnter={() => setHovered(true)}
            className={`relative rounded-xl px-4 py-3 w-56 transition-all duration-150 ${isFallBack ? "border border-dashed border-gray-300 bg-gray-50" : "border border-gray-200 bg-white"} ${isCurrent ? "border-gray-900 ring-1 ring-gray-900" : ""} ${hovered ? "shadow-[0_8px_20px_rgba(0,0,0,0.1)] -translate-y-0.5" : ""}`}
        >
            <Handle type="target" position={Position.Top} style={{opacity: 0}}/>
            <Handle type="target" position={Position.Left} style={{opacity: 0}}/>
            <Handle type="source" position={Position.Bottom} style={{opacity: 0}}/>
            <Handle type="source" position={Position.Right} style={{opacity:0}}/>
            
            <button onClick={(e) => { e.stopPropagation(); data.onSuggest?.(data.id);}}
                className={`absolute -top-3 -right-3 w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center transition-all duration-150 ${hovered?"opacity-100 scale-100": "opacity-0 scale-75 pointer-events-none"}`}
                aria-label="Get suggestion for this stage">
                    <Sparkles className="w-3.5 h-3.5"/>
            </button>

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

function layout(stages: Stage[], onSuggest?: (id:string) => void ) : {nodes: Node[]; edges: Edge[]} {
    const primary = stages.filter((s) => s.kind === "primary");
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    primary.forEach((stage, i) => {
        const y = i* 160;
        nodes.push({
            id: stage.id,
            type: "stage",
            position: {x: 0, y},
            data: {...stage, label: stage.title, onSuggest},
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
        });

        if (i>0) {
            edges.push({
                id: `${primary[i-1].id}-${stage.id}`,
                source: primary[i-1].id,
                target: stage.id,
                type: "smoothstep",
                markerEnd: {type: MarkerType.ArrowClosed, color: '#111827', width: 18, height: 18},
                style: {stroke: "#111827", strokeWidth: 1.5}
            });
        }
        
        const fallbacks = stages.filter((s) => s.kind === "fallback" && s.parentId === stage.id);
        fallbacks.forEach((fb, j) => {
            nodes.push({
                id: fb.id,
                type: "stage",
                position: {x: 340, y: y+j*100},
                data: {...fb, label: fb.title, onSuggest},
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            });
            edges.push({
                id: `${stage.id}-${fb.id}`,
                source: stage.id,
                target: fb.id,
                type: "smoothstep",
                style: {strokeDasharray: "4 4", stroke: '#9ca3af', strokeWidth: 1.5},
                markerEnd: {type: MarkerType.ArrowClosed, color: "#9ca3af", width: 16, height: 16},
                label: fb.condition,
                labelStyle: {fontSize: 10, fill: "#9ca3af"},
                labelBgStyle: { fill: "#ffffff"},
            });
        });
    });

    return {nodes,edges};
}

export default function PathwayFlow({ stages = DEMO_STAGES, onSuggest,} : {stages?: Stage[]; onSuggest?: (stageId: string) => void;}) {
    const {nodes, edges} = useMemo(() => layout(stages, onSuggest), [stages, onSuggest]);

    return (
        <div className="w-full h-[600px] border border-gray-200 rounded-xl overflow-hidden bg-gradient-to-b from-gray-50 to-white">
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView proOptions={{hideAttribution:true}}>
                <Background color="#d1d5db" gap={22} size={1.5}/>
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    );
}