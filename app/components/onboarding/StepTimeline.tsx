"use client";

const TIMELINES = ["Within 6 months", "6-12 months", "1-2 years", "2+ years"];
const LEVELS = ["High school","Undergraduate", "Postgraduate", "Other"];

export default function StepTimeline({
    data, onUpdate, onNext, onBack
} : {
    data: OnboardingData;
    onUpdate: (patch: Partial<OnboardingData>) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    const ready = data.timeline && data.level;

    return (
        <div>
            <h1 className="font-display text-2xl text-gray-900">When and where are you now?</h1>
            <p className="text-sm text-gray-500 mt-2">Helps us set realistic deadlines.</p>

            <div className="mt-8 flex flex-col gap-6">
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">When do you want to start?</p>
                    <div className="flex flex-col gap-2">
                        {TIMELINES.map((t) =>  (
                            <button key={t} onClick={() => onUpdate({timeline: t})}
                            className={`text-left px-5 py-3 rounded-xl border text-sm transition-all ${data.timeline === t ? "border-gray-900 bg-gray-50 text-gray-900" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Current academic level</p>
                    <div className="flex flex-wrap gap-2">
                        {LEVELS.map((l) => (
                            <button key={l} onClick={() => onUpdate({level: l})} className={`px-4 py-2 rounded-full border text-sm transition-all ${data.level === l ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                                {l}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 mt-8">
                <button onClick={onNext} disabled={!ready} className="bg-gray-900 text-white text-sm px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-40">
                    Continue
                </button>
                <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700">
                    Back
                </button>
            </div>
        </div>
    );
}