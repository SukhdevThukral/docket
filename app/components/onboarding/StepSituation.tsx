"use client";

const LANGUAGE_TESTS = ["IELTS", "TOEFL", "Duolingo", "Other", "None yet"];

export default function StepSituation({
    data, onUpdate, onNext, onBack,
} : {
    data: OnboardingData;
    onUpdate: (patch: Partial<OnboardingData>) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    return (
        <div>
            <h1 className="font-display text-2xl text-gray-900">What do you already have?</h1>
            <p className="text-sm text-gray-500 mt-2">We'll skip what's already done.</p>

            <div className="mt-8 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 px-5 py-4 rounded-xl border border-gray-200 cursor-pointer hover:border-gray-300 transition-all">
                        <input type="checkbox" checked={data.hasTranscripts} onChange={(e) => onUpdate({hasTranscripts: e.target.checked})} className="w-4 h-4 accent-gray-900"/>
                        <div>
                            <p className="text-sm text-gray-900">Official transcripts ready</p>
                            <p className="text-xs text-gray-500">Stamped, translated if needed</p>
                        </div>
                    </label>

                    <label className="flex items-center gap-3 px-5 py-4 rounded-xl border border-gray-200 cursor-pointer hover:border-gray-300 transition-all">
                        <input type="checkbox" checked={data.hasLanguageTest} onChange={(e) => onUpdate({hasLanguageTest: e.target.checked})} className="w-4 h-4 accent-gray-900"/>
                        <div>
                            <p className="text-sm text-gray-900">Language test completed</p>
                            <p className="text-xs text-gray-500">IELTS, TOEFL, or equivalent</p>
                        </div>
                    </label>
                </div>

                {data.hasLanguageTest && (
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Which test?</p>
                        <div className="flex flex-wrap gap-2">
                            {LANGUAGE_TESTS.map((t) => (
                                <button key={t} onClick={() => onUpdate({languageTest: t})} className={`px-4 py-2 rounded-full border text-sm transition-all ${data.languageTest === t ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Anything else you have ready?</p>
                    <textarea value={data.otherDocs}
                    onChange={(e) => onUpdate({otherDocs: e.target.value})}
                    placeholder="e.g. Passport, recommendation letters, SOP draft..." rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-gray-400"/>
                </div>
            </div>

            <div className="flex items-center gap-3 mt-8">
                <button onClick={onNext} className="bg-gray-900 text-white text-sm px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
                    Continue
                </button>
                <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700">Back</button>
            </div>
        </div>
    );
}