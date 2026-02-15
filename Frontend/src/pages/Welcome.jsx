import assest from '../assets/asset2.png'
import { Link } from 'react-router-dom'
import background from '../assets/background6.jpg'
function Welcome() {
    return (
        <div className="min-h-[calc(100vh-64px)] overflow-y-auto flex justify-center bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: `url(${background})` }}>
            <div className="w-full overflow-y-auto flex justify-center items-start p-4">
                <div className="max-w-4xl bg-white shadow-2xl rounded-2xl p-10 flex flex-col items-center text-center">

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
                        Welcome to Muslim Planner
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-700 text-lg md:text-xl mb-6">
                        Your daily app that helps you organize your worship, remembrance (adhkar), Quran reading, and manage your daily tasks with ease and comfort.
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-center items-center flex-col w-full WelcomeB:flex-row gap-4 mt-2">

                        <Link
                            to="/prayer-times"
                            className="w-full WelcomeB:w-auto text-center
                            bg-green-600 text-white px-6 py-3 rounded-lg shadow-md
                            hover:bg-green-700 transition
                            max-[445px]:px-4 max-[445px]:py-2 max-[445px]:text-sm">
                            Start Your Day
                        </Link>

                        <button
                            className="w-full WelcomeB:w-auto
                            bg-white border border-green-600 text-green-600 px-6 py-3 
                            rounded-lg shadow-md hover:bg-green-50 transition
                            max-[445px]:px-4 max-[445px]:py-2 max-[445px]:text-sm">
                            Explore Features
                        </button>

                    </div>

                    {/* Optional illustration */}
                    <img
                        src={assest}
                        alt="Muslim Planner"
                        className="mt-8 w-72 md:w-96"
                    />

                </div>
            </div>
        </div>

    )
}

export default Welcome
