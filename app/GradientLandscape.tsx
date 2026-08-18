export default function GradientLandscape() {
    return (
        <section className="relative w-full min-h-[70vh] overflow-hidden bg-black">
            <div className="absolute inset-0"
                style={{
                    background:`
                        radial-gradient(ellipse 65% 55% at 15% 25%, rgba(255, 87, 34, 0.9), transparent 60%),
                        radial-gradient(ellipse 60% 60% at 78% 12%, rgba(26, 42, 108, 0.95), transparent 65%),
                        radial-gradient(ellipse 55% 50% at 88% 55%, rgba(0, 0, 0, 0.9), transparent 60%),
                        radial-gradient(ellipse 55% 50% at 30% 75%, rgba(255, 138, 61, 0.75), transparent 60%),
                        radial-gradient(ellipse 45% 40% at 60% 45%, rgba(120, 200, 220, 0.4), transparent 55%),
                        radial-gradient(ellipse 50% 45% at 60% 45%, rgba(60, 30, 100, 0.6), transparent 60%),
                        linear-gradient(180deg, #05070f, #000000)
                    `, 
                    filter: "blur(90px) saturate(1.25)",
                }}
            />
            <div className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(ellipse 30% 70% at 40% 40%, rgba(80,180,255,0.5), transparent 70%)
                    `, filter: "blur(70px)",
                    mixBlendMode: "screen",
                }}
            />
            
            <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
                }}
            />
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
                }}
            />
        </section>
    );
}