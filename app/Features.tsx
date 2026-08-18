import { Package, Smile, Globe, Receipt, Zap, ShieldCheck } from "lucide-react";
import { title } from "process";

const FEATURES = [
    {
        icon: Package,
        title: "Sell anything",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets"
    },
    {
        icon: Smile,
        title: "Sell anything.",
        body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets"
    },
    {
        icon: Globe,
        title: "Sell anything.",
        body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets"
    },
    {
        icon: Receipt,
        title: "Sell anything.",
        body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets"
    },
    {
        icon: Zap,
        title: "Sell anything.",
        body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets"
    },
    {
        icon: ShieldCheck,
        title: "Sell anything.",
        body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets"
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