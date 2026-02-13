import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Top Section */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-green-500 mb-4">
                            Muslim Planner
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            Organize your prayers, tasks, and spiritual goals
                            in one simple and beautiful place.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-500">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <Link to="/" className="hover:text-green-400 transition">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/prayer-times" className="hover:text-green-400 transition">
                                    Prayer Times
                                </Link>
                            </li>
                            <li>
                                <Link to="/tasks" className="hover:text-green-400 transition">
                                    Tasks
                                </Link>
                            </li>
                            <li>
                                <Link to="/quran" className="hover:text-green-400 transition">
                                    Quran
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact / Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-500">
                            About
                        </h3>
                        <p className="text-gray-400">
                            Built to help Muslims stay consistent with their daily
                            worship and productivity.
                        </p>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Muslim Planner. All rights reserved.
                </div>

            </div>
        </footer>
    )
}

export default Footer
