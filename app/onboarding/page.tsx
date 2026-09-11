"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

import StepGoal from "../components/onboarding/StepGoal";
import StepTimeline from "../components/onboarding/StepTimeline";
import StepTarget from "../components/onboarding/StepTarget";
import StepSituation from "../components/onboarding/StepSituation";
import StepPreview from "../components/onboarding/StepPreview";

export type OnboardingData = {
    goal: string;
    timeline: string;
    level: string;
    countries: string[];
    fields: string[];
    budget: string;
    hasTranscripts: boolean;
    hasLanguageTest: boolean;
    languageTest: string;
    otherDocs: string;
};

const EMPTY:  OnboardingData = {
    goal: "",
    timeline: "",
    level: "",
    countries: [],
    fields: [],
    budget: "",
    hasTranscripts: false,
    hasLanguageTest: false,
    languageTest: "",
    otherDocs: "",
};

export default function OnboardingPage() {
    const {isOnboarded} = useAppStore();
    const [step, setStep] = useState(0);
    const [data,setData] = useState<OnboardingData>(EMPTY);
    const {setOnboarded, addApplication} = useAppStore();
    const router = useRouter();
    
    useEffect(() => {
        if (isOnboarded) router.push("/dashboard");
    }, [isOnboarded]);
    
    function update(patch: Partial<OnboardingData>) {
        setData((prev) => ({...prev, ...patch}));
    }

    function next() { setStep((s) => s+1);}
    function back() { setStep((s) => s -1);}

    function handleConfirm(applications: Parameters<typeof addApplication>[0][]) {
        applications.forEach((app) => addApplication(app));
        setOnboarded();

        router.push("/dashboard");
    }

    const steps = [
        <StepGoal key={0} data={data} onUpdate={update} onNext={next}/>,
        <StepTimeline key={1} data={data} onUpdate={update} onNext={next} onBack={back}/>,
        <StepTarget key={2} data={data} onUpdate={update} onNext={next} onBack={back}/>,
        <StepSituation key={3} data={data} onUpdate={update} onNext={next} onBack={back}/>,
        <StepPreview key={4} data={data} onBack={back} onConfirm={handleConfirm}/>,
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-lg">
                <div className="flex gap-1.5 mb-8">
                    {steps.map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= step ? "bg-gray-900" : "bg-gray-100"}`}/>
                    ))}
                </div>
                {steps[step]}
            </div>
        </div>
    );
}
