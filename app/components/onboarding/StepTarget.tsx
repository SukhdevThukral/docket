"use client";

import { OnboardingData } from "@/app/onboarding/page";

const COUNTRIES = ["Hungary", "Germany", "Italy", "France", "Netherlands", "USA", "Canada", "UK", "Other"];
const FIELDS = ["Engineering", "Business", "Medicine", "Law", "Arts", "Computer Science", "Social Sciences", "Other"];
const BUDGETS = ["Full scholarship only", "Partial funding ok", "Self-funded"];

export default function StepTarget({
    data, onUpdate, onNext, onBack,
} : {
    data: OnboardingData;
    onUpdate: (patch: Partial<OnboardingData>) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    function toggleCountry(c: string) {
        const current = data.countries;
        onUpdate({countries: current.includes(c) ? current.filter((x) => x !== c) : [...current, c]});
    }

    function toggleField(f: string) {
        const current = data.fields;
        onUpdate({fields: current.includes(f) ? current.filter((x) => x!== f): [...current, f] });
    }

    const ready = data.countries.length > 0 && data.fields.length >0 && data.budget;

    return (
        <div>
            <h1 className="font-display text-2xl text-gray-900">Where and what?</h1>
            <p className="text-sm text-gray-500 mt-2">Pick all that apply.</p>

            <div className="mt-8 flex flex-col gap-6">
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Target countries</p>
                    <div className="flex flex-wrap gap-2">
                        {COUNTRIES.map((c) => (
                            <button key={c} onClick={() => toggleCountry(c)} className={`px-4 py-2 rounded-full border text-sm transition-all ${data.countries.includes(c) ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Fields of study</p>
                    <div className="flex flex-wrap gap-2">
                        {FIELDS.map((f) => (
                            <button key={f} onClick={() => toggleField(f)} className={`px-4 py-2 rounded-full border text-sm transition-all ${data.fields.includes(f) ? "border-gray-900 bg-gray-900 text-white":"border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Budget</p>
                    <div className="flex flex-col gap-2">
                        {BUDGETS.map((b) => (
                            <button key={b} onClick={() => onUpdate({budget: b})} className={`text-left px-5 py-3 rounded-xl border text-sm transition-all ${data.budget === b ? "border-gray-900 bg-gray-50 text-gray-900": "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                                {b}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3 mt-8">
                <button onClick={onNext} disabled={!ready} className="bg-gray-900 text-white text-sm px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-40">
                    Continue
                </button>
                <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700">Back</button>
            </div>
        </div>
    );
}