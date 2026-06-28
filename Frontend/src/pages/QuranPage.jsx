import { useState, useEffect } from "react";
import SurahList from "../components/SurahList";
import SurahView from "../components/SurahView";
import background from "../assets/background5.jpg";
import { QuranHook } from '../hooks/QuranHook.js'
import { scrollToTop } from '../tools/ScrollTop'
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { FaQuestion } from "react-icons/fa6";
import { getProgress } from "../services/QuranService";
import { useTheme } from "../context/ThemeContext";
import { useReader } from "../context/ReaderContext";
import TutorialModal from "../components/TutorialModal.jsx"
import { useTranslation } from "react-i18next";
import { dir } from "i18next";

function QuranPage() {

  const {
    loading,
    result,
    error,
    setResult,
    fetchQuranSurah
  } = QuranHook();

  const { t, i18n } = useTranslation('surah');

  useEffect(() => {
    const seen = localStorage.getItem("tutorial_seen");
    if (!seen || seen === "false") {
      setShowTutorial(true);
      localStorage.setItem("tutorial_seen", "true");
    }
  }, []);

  const { selectedReader } = useReader();
  const [showTutorial, setShowTutorial] = useState(false);

  const [selectedSurah, setSelectedSurah] = useState(null);
  const [showList, setShowList] = useState(false);
  const [savedProgress, setSavedProgress] = useState(null);
  const { theme, mode } = useTheme();

  const loadProgress = async () => {
    try {
      const progress = await getProgress();
      setSavedProgress(progress)
    } catch (err) {
      console.error("Failed to load progress", err);
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const handleSelect = (number) => {
    setSelectedSurah(number);
    setShowList(false);
    fetchQuranSurah(number, selectedReader?.identifier || "ar.alafasy").then(() => scrollToTop());
  };

  useEffect(() => {
    if (selectedSurah && selectedReader) {
      fetchQuranSurah(selectedSurah, selectedReader?.identifier || "ar.alafasy")
    }
  }, [selectedReader]);

  return (
    <div
      className="relative w-full md:p-4 p-2 bg-no-repeat bg-center bg-cover overflow-hidden"
      style={{
        backgroundImage: result ? "none" : `url(${background})`,
        backgroundColor: result ? `${theme.quranpage}` : "transparent",
        minHeight: "100vh"
      }}
    >

      {/* طبقة مظلمة Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{
          background: !selectedSurah ? mode !== "light" ? '#00000060' : "transparent" : "transparent", // تغطية تدريجية
        }}
      />

      <div className="relative flex flex-col justify-center items-center h-full w-full z-30">
        {showTutorial && (
          <TutorialModal onClose={() => setShowTutorial(false)} />
        )}

        <div className="w-full mx-auto mb-2">

          <div className="flex justify-between gap-2">
            {selectedSurah && (
              <button
                onClick={() => {
                  if (selectedSurah > 1) {
                    handleSelect(selectedSurah - 1);
                  }
                }}
                className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl text-white transition ${selectedSurah === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={selectedSurah === 1}
                style={{ background: theme.navbarlogo }}
              >
                <AiOutlineLeft />
              </button>
            )}

            <button
              onClick={() => {
                loadProgress();
                setResult(null);
                setShowList(!showList);
                setSelectedSurah(null);
              }}
              className="px-3 py-2 sm:px-6 rounded-xl sm:py-3 text-lg transition flex-1"
              style={{ background: theme.card, color: theme.cardtext }}
            >
              {selectedSurah ? t('quranPage.surahNumber', { number: selectedSurah }) : t('quranPage.selectSurah')}
            </button>

            {selectedSurah && (
              <button
                onClick={() => {
                  if (selectedSurah < 114) {
                    handleSelect(selectedSurah + 1);
                  }
                }}
                className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl  text-white transition ${selectedSurah === 114 ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={selectedSurah === 114}
                style={{ background: theme.navbarlogo }}
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
          <div className="w-full mt-8 px-4">
            {/* Main Welcome Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

              {/* Welcome Card - Spans 2 columns on large screens */}
              <div
                className="lg:col-span-2 rounded-3xl p-6 md:p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] backdrop-blur-sm"
                style={{ background: theme.card }}
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Header with Icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-16 h-16 flex items-center justify-center rounded-2xl text-3xl shadow-lg"
                        style={{ background: theme.navbarlogo }}
                      >
                        📖
                      </div>
                      <h2
                        className="text-xl md:text-2xl font-bold"
                        style={{ color: theme.navbarlogo }}
                      >
                        {t('quranPage.welcome.title')}
                      </h2>
                    </div>

                    {/* Description */}
                    <p
                      className="text-base md:text-lg leading-relaxed mb-4"
                      style={{ color: theme.cardtext }}
                    >
                      {t('quranPage.welcome.description')}
                    </p>
                  </div>

                  {/* API Note */}
                  <p
                    className="text-sm opacity-70 mt-4 pt-4 border-t"
                    style={{ color: theme.cardtext, borderColor: theme.cardtext }}
                    dangerouslySetInnerHTML={{
                      __html: t('quranPage.welcome.apiNote', {
                        themeColor: theme.navbarlogo,
                        direction: dir(i18n.language)
                      })
                    }}
                  />
                </div>
              </div>

              {/* Quick Stats / Features Card */}
              <div className="grid grid-rows-2 gap-4">
                {/* Continue Reading Card */}
                {savedProgress && (
                  <div
                    className="rounded-3xl p-2 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer backdrop-blur-sm flex flex-col justify-center items-center text-center"
                    style={{ background: theme.navbaractivelink }}
                    onClick={() => {
                      handleSelect(savedProgress.surah);
                      setTimeout(() => {
                        const el = document.getElementById(`ayah-${savedProgress.ayah - 1}`);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }, 500);
                    }}
                  >
                    <h3 className="text-white font-bold text-lg mb-2">Continue Reading</h3>
                    <p className="text-white/90 text-sm">
                      Surah {savedProgress.surah}, Ayah {savedProgress.ayah}
                    </p>
                  </div>
                )}

                {/* Browse All Card */}
                <div
                  className={`rounded-3xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer backdrop-blur-sm flex flex-col justify-center items-center text-center ${!savedProgress ? 'row-span-2' : ''}`}
                  style={{ background: theme.card }}
                  onClick={() => setShowList(true)}
                >
                  <div
                    className="text-4xl mb-3"
                    style={{ color: theme.navbarlogo }}
                  >
                    📜
                  </div>
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: theme.navbarlogo }}
                  >
                    Browse All Surahs
                  </h3>
                  <p
                    className="text-sm opacity-80"
                    style={{ color: theme.cardtext }}
                  >
                    Explore all 114 Surahs
                  </p>
                </div>
              </div>

              {/* Decorative Info Cards Row */}
              <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                {/* Card 1 */}
                <div
                  className="rounded-2xl p-4 md:p-5 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.03] text-center backdrop-blur-sm"
                  style={{ background: theme.card }}
                >
                  <div className="text-2xl md:text-3xl mb-2">✨</div>
                  <h4
                    className="font-bold text-sm md:text-base"
                    style={{ color: theme.navbarlogo }}
                  >
                    114 Surahs
                  </h4>
                  <p
                    className="text-xs opacity-70 mt-1"
                    style={{ color: theme.cardtext }}
                  >
                    Complete Quran
                  </p>
                </div>

                {/* Card 2 */}
                <div
                  className="rounded-2xl p-4 md:p-5 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.03] text-center backdrop-blur-sm"
                  style={{ background: theme.card }}
                >
                  <div className="text-2xl md:text-3xl mb-2">🎧</div>
                  <h4
                    className="font-bold text-sm md:text-base"
                    style={{ color: theme.navbarlogo }}
                  >
                    Audio Recitation
                  </h4>
                  <p
                    className="text-xs opacity-70 mt-1"
                    style={{ color: theme.cardtext }}
                  >
                    Multiple Reciters
                  </p>
                </div>

                {/* Card 3 */}
                <div
                  className="rounded-2xl p-4 md:p-5 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.03] text-center backdrop-blur-sm"
                  style={{ background: theme.card }}
                >
                  <div className="text-2xl md:text-3xl mb-2">💾</div>
                  <h4
                    className="font-bold text-sm md:text-base"
                    style={{ color: theme.navbarlogo }}
                  >
                    Auto-Save
                  </h4>
                  <p
                    className="text-xs opacity-70 mt-1"
                    style={{ color: theme.cardtext }}
                  >
                    Track Your Progress
                  </p>
                </div>

                {/* Card 4 */}
                <div
                  className="rounded-2xl p-4 md:p-5 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.03] text-center backdrop-blur-sm"
                  style={{ background: theme.card }}
                >
                  <div className="text-2xl md:text-3xl mb-2">🌙</div>
                  <h4
                    className="font-bold text-sm md:text-base"
                    style={{ color: theme.navbarlogo }}
                  >
                    Dark Mode
                  </h4>
                  <p
                    className="text-xs opacity-70 mt-1"
                    style={{ color: theme.cardtext }}
                  >
                    Comfortable Reading
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {selectedSurah && (
          <div className="w-full mx-auto md:p-6 p-4 md:rounded-[36px] rounded-[28px] shadow"
            style={{ background: theme.card }}>
            {loading && <p className="text-center" style={{ color: theme.cardtext }}>{t('quranPage.loading')}</p>}
            {error && <p className="text-center text-red-600">{error}</p>}
            {result && (
              <SurahView
                surahView={result}
                savedAyah={savedProgress ? savedProgress.ayah : null}
              />
            )}
          </div>
        )}

        {selectedSurah && (
          <div className="fixed bottom-6 right-6 z-20">
            <button
              onClick={scrollToTop}
              className="mb-2 md:w-12 md:h-12 w-10 h-10 text-white rounded-full shadow-lg md:text-base text-sm  transition flex items-center justify-center"
              style={{ background: theme.navbarlogo }}
              title="Back to Top"
            >
              Top
            </button>
            <button
              onClick={() => setShowTutorial(true)}
              className="md:w-12 md:h-12 w-10 h-10 text-white rounded-full shadow-lg md:text-base text-sm  transition flex items-center justify-center"
              style={{ background: theme.AdhanRed }}
              title="Help"
            >
              <FaQuestion />
            </button>
          </div>)
        }
      </div>


    </div>
  );
}

export default QuranPage;
