import GradientLandscape from "./GradientLandscape";

export default function Hero(){
    return(
        <div className="bg-white">
            <section className="relative w-full px-6 sm:px-12 md:px-24 lg:px-50 pt-16 pb-20">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full pl-3 pr-4 py-1.5 text-xs text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>
                        <span className="font-medium text-gray-900">What's new?</span>
                        Seamless integration with your goals
                        <span aria-hidden="true">→</span>
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl text-gray-900 leading-tight tracking-tighter mt-6"
                        style={{fontFamily: "var(--font-hero)"}}>
                        Dream big, achieve faster, and grow your career.
                    </h1>

                    <p className="mt-4 text-gray-600 tracking-wide max-w-lg"
                    >
                        Whether youre a high schooler or preparing to do your postgraduate, our platform
                        equips you to grow, manage, schedule and thrive.
                    </p>

                    <div className="flex items-center gap-6 mt-6">
                        <a href="/dashboard" className="bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
                            Start now
                        </a>
                    </div>
                </div>
                <div className="mt-12 w-full max-w-10xl rounded-2xl"
                    style={{
                        maskImage: "radial-gradient(ellipse 88% 88% at 50% 50%, black 55%, transparent 100%)",
                        WebkitMaskImage: "radial-gradient(ellipse 88% 88% at 50% 50%, black 55%, transparent 100%)",
                    }}>
                    <GradientLandscape/>
                </div>
            </section>
        </div>
    );
}