import { Package, Smile, Globe, Receipt, Zap, ShieldCheck } from "lucide-react";

const FEATURES = [
    {
        icon: Package,
        title: "Add applications",
        body: "Add any scholarship, university, or program manually — set a due date, drop in your checklist items, and track status as you go. Everything lives in one place instead of scattered across browser tabs and notes apps."
    },
    {
        icon: Smile,
        title: "Multi-step onboarding",
        body: "Answer five quick questions about your goal, what you already have, where you want to go, and your budget. Takes under two minutes and gives Docket everything it needs to build a pathway that actually fits your situation."
    },
    {
        icon: Globe,
        title: "AI-generated pathways",
        body: "Gemini looks at your answers and generates a ranked list of applications ordered by deadline and priority — with fallback routes built in for the competitive ones. You review it, regenerate if needed, and confirm in one tap."
    },
    {
        icon: Receipt,
        title: "Per-application checklists",
        body: "Every application comes with a checklist specific to its type — a scholarship has different steps than a university transfer. Tick items off as you complete them and see your progress at a glance on the dashboard."
    },
    {
        icon: Zap,
        title: "Pathway visualiser",
        body: "See your entire plan as a flow graph — primary stages in sequence, fallback branches off the risky ones. Spot gaps, understand dependencies, and know exactly what comes next without having to read through a list."
    },
];

export default function Features(){
    return (
        <section className="w-full px-6 sm:px-12 md:px-24 lg:px-50 py-20">
            <h2 className="font-display text-2xl sm:text-3xl text-gray-900">
                The one platform behind it all
            </h2>
            <p className="mt-2 text-gray-600 max-w-lg">
                We've got everything you need to sell locally and globally.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                {FEATURES.map(({ icon: Icon, title, body }) => (
                    <div key={title} className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors">
                        <div className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700">
                            <Icon className="w-4 h-4"/>
                        </div>
                        <h3 className="font-display text-lg text-gray-900 mt-4">{title}</h3>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{body}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}