import { Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="px-6 sm:px-12 md:px-24 lg:px-50 pt-16 pb-10">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div>
                        <div className="flex items-center gap-3">
                            <a href="https://github.com/SukhdevThukral" className="w-9 h-9 rounded-full border-gray-400 flex items-center justify-center hover:border-gray-500 transition-colors">
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
                                </svg>
                            </a>
                            <a href="https://x.com/shizzei" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-gray-500 transition-colors">
                                <svg>

                                </svg>
                            </a>
                            <a href="mailto:sukhdevthukral2411@gmail.com" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-gray-500 transition-colors">
                                <Mail className="w-4 h-4"/>
                            </a>
                        </div>

                        <p className="text-sm text-gray-400 mt-6 leading-relaxed">
                            New Delhi, India
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            sukhdevthukral2411@gmail.com
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Menu</p>
                        <div className="flex flex-col gap-3 mt-4 text-sm text-gray-300">
                            <a href="/" className="hover:text-white transition-colors">Why I'm building this</a>
                            <a href="/" className="hover:text-white transition-colors">Home</a>
                            <a href="/" className="hover:text-white transition-colors">Roadmap</a>
                        </div>
                    </div>
                    
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Product</p>
                        <div className="flex flex-col gap-3 mt-4 text-sm text-gray-300">
                            <a href="/" className="hover:text-white transition-colors">Dashboard</a>
                            <a href="/" className="hover:text-white transition-colors">Applications</a>
                            <a href="/" className="hover:text-white transition-colors">Checklist</a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-16 pt-6 border-t border-gray-800">
                    <p className="text-sm text-gray-500 max-w-sm">
                        Build to keep your scholarship and university deadlines from slipping through the cracks.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-gray-500">
                        <a href="/" className="hover:text-white transition-colors">Terms & Conditions</a>
                        <a href="/" className="hover:text-white transition-colors">Privacy Policy</a>
                    </div>
                </div>
            </div>
            <div className="px-6 sm:px-12 md:px-24 lg:px-50 overflow-hidden select-none pointer-events-none">
                <p className="font-display text-[25vw] leading-[0.75] text-gray-900 whitespace-nowrap translate-y-[1.5vw] [color:transparent] [-webkit-text-stroke:1px_white]">
                    Docket.
                </p>
            </div>
        </footer>
    )
}