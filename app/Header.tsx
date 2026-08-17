export default function Header() {
    return (
        <nav className="flex items-center justify-between px-4 sm:px-6 py-5 border-b border-gray-100 bg-white">
            <a href="/" className="font-display text-xl text-gray-900">Docket</a>
            <a href="/" className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block">
                Why I'm building this
            </a>
            <a href="/" className="text-sm bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
                Login / Signup
            </a>
        </nav>
    )
}