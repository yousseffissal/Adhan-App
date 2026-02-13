import assest1 from '../assets/assest1.jpg'
import { Link } from 'react-router-dom'
function Welcome() {
    return (
        <div className="w-full overflow-y-auto h-full flex justify-center items-start py-16 px-4 bg-gradient-to-b from-green-50 to-white">
            <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-10 flex flex-col items-center text-center">

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
                    🌿 Muslim Planner أهلاً وسهلاً بك في
                </h1>

                {/* Subtitle */}
                <p className="text-gray-700 text-lg md:text-xl mb-6">
                    تطبيقك اليومي الذي يساعدك على تنظيم عباداتك، أذكارك، قراءة القرآن، وإدارة مهامك اليومية بسهولة وراحة.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition">
                        <Link
                            to={'/prayer-times'}
                        >
                            ابدأ اليوم
                        </Link>
                    </button>
                    <button className="bg-white border border-green-600 text-green-600 px-6 py-3 rounded-lg shadow-md hover:bg-green-50 transition">
                        تعرف على المزايا
                    </button>
                </div>

                {/* Optional illustration */}
                <img
                    src={assest1}
                    alt="Muslim Planner"
                    className="mt-8 w-72 md:w-96"
                />

            </div>
        </div>
    )
}

export default Welcome
