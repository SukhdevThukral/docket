type Application = {
    id: string;
    name: string;
    category: string;
    dueDate: string;
    daysLeft: number;
    itemsDone: number;
    itemsTotal: number;
    status: "in_progress" | "not_started" | "complete";
};

export default function ApplicationList({
    applications,
    selectedID,
    onSelect,
} : {
    applications: Application[];
    selectedID: string;
    onSelect: (id: string) => void;
}) {
    return(
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <p className="text-xs text-gray-500 uppercase tracking-wide px-4 py-3 border-b border-gray-100">
                Applications
            </p>
            <div className="flex flex-col">
                {applications.map((app) => {
                    const isSelected = app.id === selectedID;
                    return (
                        <button key={app.id} onClick={() => onSelect(app.id)} className={`flex items-center gap-3 px-4 py-3 text-left border-b border-gray-100 last:border-b-0 transition-colors ${isSelected ? "bg-gray-50":"hover:bg-gray-50"}`}>
                            <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-[10px] font-mono text-gray-600 shrink-0">
                                {app.itemsDone}/{app.itemsTotal}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-display text-sm text-gray-900 truncate">
                                    {app.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    <span className="text-amber-600">● {app.daysLeft} days</span>
                                    {app.itemsTotal - app.itemsDone > 0 && (
                                        <> · {app.itemsTotal - app.itemsDone} left</>
                                    )}
                                </p>
                            </div>
                            {isSelected && (
                                <span className="text-gray-400 shrink-0">›</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}