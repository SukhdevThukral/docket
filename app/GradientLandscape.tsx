export default function GradientLandscape() {
    return (
        <section className="relative w-full min-h-[70vh] overflow-hidden bg-black">
            <div className="absolute inset-0"
                style={{background: "linear-gradient(180deg, #04060d, #000000)"}}
            />

            <div className="absolute inset-0" style={{ filter: "saturate(1.6) contrast(1.15) brightness(1.2)"}}>

                <div className="absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse 55% 60% at 12% 28%,rgba(255,90,20,1), transparent 65%)",
                        filter: "blur(65px)",
                        mixBlendMode: "screen",
                    }}
                />

                <div className="absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse 50% 55% at 30% 80%,rgba(255,150,40,0.95), transparent 65%)",
                        filter: "blur(65px)",
                        mixBlendMode: "screen",
                    }}
                />

                <div className="absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse 30% 60% at 80% 15%,rgba(30,70,255,1), transparent 65%)",
                        filter: "blur(65px)",
                        mixBlendMode: "screen",
                    }}
                />

                <div className="absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse 30% 60% at 42% 45%,rgba(120,210,255,0.9), transparent 70%)",
                        filter: "blur(55px)",
                        mixBlendMode: "screen",
                    }}
                />

                <div className="absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse 45% 40% at 78% 85%,rgba(100,50,180,0.8), transparent 65%)",
                        filter: "blur(65px)",
                        mixBlendMode: "screen",
                    }}
                />

            </div>

            <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
                }}
            />
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.3) 100%)",
                }}
            />
        </section>
    );
}