import { useState } from "react";
import SurahList from "../components/SurahList";
import SurahView from "../components/SurahView";
import background from "../assets/background5.jpg";
import { QuranHook } from '../hooks/QuranHook.js'
import { scrollToTop } from '../tools/ScrollTop'

function QuranPage() {

  const {
    loading,
    result,
    error,
    setResult,
    fetchQuranSurah
  } = QuranHook();

  const [selectedSurah, setSelectedSurah] = useState(null);
  const [showList, setShowList] = useState(false);

  const handleSelect = (number) => {
    setSelectedSurah(number);
    setShowList(false);
    fetchQuranSurah(number).then(() => scrollToTop());
  };

  return (
    <div
      className="w-full md:p-4 p-2 bg-no-repeat bg-center bg-cover min-h-screen"
      style={{
        backgroundImage: result ? "none" : `url(${background})`,
        backgroundColor: result ? "#e6f9e6" : "transparent",
      }}
    >
      <div className="w-full mx-auto mb-2">
        <button
          onClick={() => {
            setResult(null)
            setShowList(!showList);
            setSelectedSurah(null);
          }}
          className="w-full p-4 bg-white rounded-xl text-green-900 text-lg hover:bg-green-200 transition"
        >
          {selectedSurah ? `سورة رقم ${selectedSurah}` : "اختر سورة"}
        </button>

        <div
          className={`transition-all duration-300 ease-out overflow-y-auto ${showList
            ? "opacity-100 scale-100 max-h-screen mt-2"
            : "opacity-0 scale-95 max-h-0"
            }`}
        >
          <div>
            <SurahList onSelect={handleSelect} />
          </div>
        </div>

      </div>

      {!showList && !selectedSurah && (
        <div className="w-full flex items-start justify-center bg-transparent md:p-6 p-4">

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-12 md:p-20 text-center max-w-3xl w-full">

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-green-900 mb-8">
              مرحباً بك في قسم القرآن الكريم
            </h2>

            <p className="text-xl md:text-2xl lg:text-3xl text-green-800 leading-loose">
              اختر سورة من القائمة لعرض الآيات والتدبر في معانيها
            </p>

          </div>

        </div>
      )}

      {selectedSurah && (
        <div className="w-full mx-auto bg-white p-6 rounded-[36px] shadow">
          {loading && <p className="text-center text-green-900">جاري التحميل...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}
          {result && <SurahView surahView={result} />}
        </div>
      )}

      {selectedSurah &&
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition flex items-center justify-center"
          title="الرجوع للأعلى"
        >
          Top
        </button>
      }
    </div>
  );
}

export default QuranPage;
