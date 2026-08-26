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

export default function DetailPane({
    app,
    onToggleItem,
} : {
    app: Application;
    onToggleItem: (itemId: string) => void;
}) {
    const done = app.checklist.filter((i) => i.done).length;
    const total = app.checklist.length;
    const pct = total === 0? 0: (done / total) * 100;

    const statusLabel = {
        in_progress: "In progress",
        not_started: "Not started",
        complete: "Complete",
    }[app.status];

    return(
        <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3">
                <h3 className="font-display text-xl text-gray-900">
                    {app.name}
                </h3>
                <span className="">
                    {statusLabel}
                </span>
            </div>
            <p className="text-xs text-gray-500 font-mono uppercase mt-1.5 tracking-wide">
                {app.category} · {app.dueDate} · <span className="text-amber-600">{app.daysLeft} days</span>
                {total-done > 0 && <> · {total-done} left</>}
            </p>

            <div className="mt-4 flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-900 rounded-full transition-all"
                        style={{width: `${pct}%`}}
                    />
                </div>
                <span className="text-xs font-mono text-gray-500 shrink-0">
                    {done}/{total}
                </span>
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mt-6 mb-3">
                Required documents
            </p>
            <div className="flex flex-col">
                {app.checklist.map((item) => (
                    <label key={item.id} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-b-0 cursor-pointer">
                        <input type="checkbox" checked={item.done} onChange={() => onToggleItem(item.id)}
                        className="w-4 h-4 rounded border-gray-300 accent-gray-900"/>
                        <span className={`text-sm ${item.done ? "text-gray-400 line-through" : "text-gray-800"}`}>
                            {item.label}
                        </span>
                    </label>
                ))}
                <button className="text-xs text-gray-400 hover:text-gray-600 mt-3 text-left">
                    + Import from text
                </button>
            </div>
        </div>
    );
}