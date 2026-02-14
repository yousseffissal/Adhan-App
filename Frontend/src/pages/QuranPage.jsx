import { useState } from "react";
import SurahList from "../components/SurahList";
import SurahView from "../components/SurahView";
import background from "../assets/background5.jpg";
import { QuranHook } from '../hooks/QuranHook.js'
import { scrollToTop } from '../tools/ScrollTop'
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

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

        <div className="flex justify-between mt-4 gap-2">
          {selectedSurah && (
            <button
              onClick={() => {
                if (selectedSurah > 1) {
                  handleSelect(selectedSurah - 1);
                }
              }}
              className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl bg-green-500 text-white hover:bg-green-600 transition ${selectedSurah === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={selectedSurah === 1}
            >
              <AiOutlineLeft />
            </button>
          )}

          <button
            onClick={() => {
              setResult(null);
              setShowList(!showList);
              setSelectedSurah(null);
            }}
            className="px-3 py-2 sm:px-6 sm:py-3 bg-white rounded-xl text-green-900 text-lg hover:bg-green-200 transition flex-1"
          >
            {selectedSurah ? `Surah Number ${selectedSurah}` : "Select a Surah"}
          </button>

          {selectedSurah && (
            <button
              onClick={() => {
                if (selectedSurah < 114) {
                  handleSelect(selectedSurah + 1);
                }
              }}
              className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl bg-green-500 text-white hover:bg-green-600 transition ${selectedSurah === 114 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={selectedSurah === 114}
            >
              <AiOutlineRight />
            </button>
          )}
        </div>

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
              Welcome to the Holy Quran Section
            </h2>

            <p className="text-xl md:text-2xl lg:text-3xl text-green-800 leading-loose">
              Select a Surah from the list to view its verses and reflect on their meanings.
            </p>

          </div>

        </div>
      )}

      {selectedSurah && (
        <div className="w-full mx-auto bg-white p-6 rounded-[36px] shadow">
          {loading && <p className="text-center text-green-900">Loading...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}
          {result && (<SurahView surahView={result} />)}
        </div>
      )}

      {selectedSurah &&
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition flex items-center justify-center"
          title="Back to Top"
        >
          Top
        </button>
      }
    </div>
  );
}

export default QuranPage;
