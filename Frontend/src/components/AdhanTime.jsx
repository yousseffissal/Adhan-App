import '../index.css'
import { AdhanHook } from '../hooks/AdhanHook.js'
import background from '../assets/background3.jpg'

function AdhanTime() {

  const {
    loading,
    city,
    setCity,
    result,
    date,
    setDate,
    error,
    successMsg,
    fetchAdhan
  } = AdhanHook();

  return (
    <div className="overflow-y-auto flex justify-center p-4 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${background})` }}>
      <div className="flex items-start justify-center">

        <div className="w-full max-w-xl rounded-2xl bg-white p-8 md:shadow-2xl">

          <h1 className="text-3xl font-bold text-center text-red-800 mb-2">
            🕌 Adhan Application
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Enter a city name to get today's prayer times
          </p>

          {/* City Input */}
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City name..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-1 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            disabled={loading}
          />

          {/* Date Input */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            disabled={loading}
          />

          {/* Small note for the user */}
          <p className="text-xs text-gray-500 mb-4">
            You can type city names in English or Arabic. <br />
            ⚠️ Note: If the city name is incorrect, the app may return random or approximate prayer times
            because the API tries to find the closest match based on available locations. <br />
            ℹ️ This app uses <a href="https://aladhan.com" className="underline text-blue-600">AlAdhan.com API</a> for prayer times. <br />
            🛠 I will add a solution to validate city names properly in the future.
          </p>

          {/* Button */}
          <button
            onClick={fetchAdhan}
            disabled={loading}
            className={`w-full rounded-xl py-3 font-semibold text-white transition-all duration-200 mb-6
        ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-700 hover:bg-red-800 active:scale-95'}`}
          >
            {loading ? 'Loading...' : 'Get Adhan Time'}
          </button>

          {/* Results Area */}
          <div className="min-h-[150px]">

            {/* Loader */}
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
              </div>
            )}

            {!loading && (
              <>
                {error && (
                  <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-center">
                    {error}
                  </p>
                )}

                {successMsg && (
                  <p className="text-green-600 bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-center">
                    {successMsg}
                  </p>
                )}

                {result?.data && (
                  <div className="grid grid-cols-2 gap-4 mt-4">

                    <PrayerCard name="Fajr" time={result.data.Fajr} />
                    <PrayerCard name="Dhuhr" time={result.data.Dhuhr} />
                    <PrayerCard name="Asr" time={result.data.Asr} />
                    <PrayerCard name="Maghrib" time={result.data.Maghrib} />
                    <PrayerCard name="Isha" time={result.data.Isha} />

                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>

  )
}

/* Small reusable component */
function PrayerCard({ name, time }) {
  return (
    <div className="bg-gray-50 hover:bg-red-50 transition rounded-xl p-4 shadow-sm border border-gray-200 text-center">
      <p className="text-gray-500 text-sm">{name}</p>
      <p className="text-lg font-bold text-red-800 mt-1">{time}</p>
    </div>
  );
}

export default AdhanTime
