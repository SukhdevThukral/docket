"use client";
import { OnboardingData } from "@/app/onboarding/page";

const GOALS = [
    {id: "study_abroad", label: "Study abroad", desc: "Enroll in a university in another country"},
    {id: "scholarship", label: "Win a scholarship", desc: "Secure funding for my studies"},
    {id: "transfer", label:"Transfer university", desc: "Move to a better-fit university"},
    {id: "gap_year", label: "Gap year program", desc: "Structured program before university"},

];

export default function StepGoal({
    data, onUpdate, onNext,
}: {
    data: OnboardingData;
    onUpdate: (patch: Partial<OnboardingData>) => void;
    onNext: () => void;
}) {
    return (
        <div>
            <h1 className="font-display text-2xl text-gray-900">What are you trying to do?</h1>
            <p className="text-sm text-gray-500 mt-2">We'll build your pathway around this.</p>

            <div className="flex flex-col gap-3 mt-8">
                {GOALS.map((g)=> (
                    <button key={g.id} onClick={() => {onUpdate({goal: g.id}); onNext();}}
                    className={`text-left px-5 py-4 rounded-xl border transition-all ${
                        data.goal === g.id? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-900"
                    }`}>
                        <p className="text-sm font-medium text-gray-900">{g.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{g.desc}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}