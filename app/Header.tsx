export default function Header() {
    return (
        <div className="f-body min-h-[140px] bg-white">
            <nav className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-gray-100">
                <a href="/" className="f-display text-xl text-gray-900">Docket</a>
                <a href="/" className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block">
                    Why I'm building this
                </a>
                <a href="/" className="text-sm bg-gray-900  text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
                    Login / Signup
                </a>
            </nav>
        </div>
    )
}