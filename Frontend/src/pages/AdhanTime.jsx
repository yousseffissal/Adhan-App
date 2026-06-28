import { useEffect } from 'react';
import { AdhanHook } from '../hooks/AdhanHook.js';
import background from '../assets/background3.jpg';
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

function AdhanTime() {
  const { t } = useTranslation("adhan"); // استخدام namespace adhan

  const {
    loading,
    city,
    setCity,
    result,
    date,
    setDate,
    error,
    successMsg,
    setError,
    setSuccessMsg,
    fetchAdhan
  } = AdhanHook();

  const { theme, mode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => setSuccessMsg(""), 3000);
    return () => clearTimeout(timer);
  }, [successMsg]);

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="relative min-h-[calc(100vh-64px)] overflow-y-auto p-4 bg-no-repeat bg-center bg-cover overflow-hidden"
      style={{ backgroundImage: `url(${background})` }}>

      {/* Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{
          background: mode !== "light" ? '#00000060' : "transparent",
        }}
      />

      <div className="relative z-30 max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <h1
              className="text-3xl md:text-4xl font-bold"
              style={{ color: theme.AdhanRed }}
            >
              {t("adhan.title")}
            </h1>
          </div>
          <p className="text-base md:text-lg opacity-80" style={{ color: theme.cardtext }}>
            {t("adhan.subtitle")}
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Search Panel - Spans 1 column */}
          <div
            className="lg:col-span-1 rounded-3xl p-6 shadow-xl backdrop-blur-sm"
            style={{ background: theme.card }}
          >
            <h2
              className="text-xl font-bold mb-4 text-center"
              style={{ color: theme.AdhanRed }}
            >
              🔍 Search City
            </h2>

            {/* City Input */}
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t("adhan.cityPlaceholder")}
              className="w-full mb-3 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              style={{
                background: mode !== "light" ? "transparent" : "#eeeeee",
                color: mode !== "light" ? "#ffffff" : "#000000",
                border: `1px solid ${theme.AdhanRed}`,
              }}
              disabled={loading}
            />

            {/* Date Input */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              style={{
                background: mode !== "light" ? "transparent" : "#eeeeee",
                color: mode !== "light" ? "#ffffff" : "#000000",
                border: `1px solid ${theme.AdhanRed}`
              }}
              disabled={loading}
            />

            {/* Button */}
            <button
              onClick={fetchAdhan}
              disabled={loading}
              className={`w-full rounded-xl py-3 font-semibold text-white transition-all duration-200
                ${loading ? 'cursor-not-allowed' : 'active:scale-95 hover:scale-[1.02]'}`}
              style={{ background: loading ? "#9ca3af" : theme.AdhanRed }}
            >
              {loading ? t("adhan.loading") : t("adhan.getButton")}
            </button>

            {/* Info Note */}
            <div className="mt-4 p-3 rounded-xl text-xs"
              style={{
                background: mode !== "light" ? "rgba(255,255,255,0.05)" : "#f9fafb",
                color: theme.cardtext
              }}
              dangerouslySetInnerHTML={{
                __html: t("adhan.note", {
                  themeColor: theme.AdhanRed
                })
              }}
            />
          </div>

          {/* Prayer Times Panel - Spans 2 columns */}
          <div className="lg:col-span-2">
            {loading && (
              <div
                className="h-full min-h-[300px] rounded-3xl flex flex-col items-center justify-center shadow-xl backdrop-blur-sm"
                style={{ background: theme.card }}
              >
                <div className="h-16 w-16 animate-spin rounded-full mb-4"
                  style={{ border: `6px solid ${theme.AdhanRed}`, borderTopColor: "transparent" }}>
                </div>
                <p style={{ color: theme.cardtext }}>{t("adhan.loading")}</p>
              </div>
            )}

            {!loading && !result?.data && (
              <div
                className="h-full min-h-[300px] rounded-3xl flex flex-col items-center justify-center shadow-xl backdrop-blur-sm p-8 text-center"
                style={{ background: theme.card }}
              >
                <div className="text-6xl mb-4">🌅</div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: theme.AdhanRed }}
                >
                  Search for a City
                </h3>
                <p style={{ color: theme.cardtext }}>
                  Enter a city name and date to get prayer times
                </p>
              </div>
            )}

            {!loading && error && (
              <div
                className="rounded-3xl p-6 shadow-xl backdrop-blur-sm text-center"
                style={{
                  background: mode !== "light" ? "transparent" : "#fef2f2",
                  color: theme.AdhanRed,
                  border: `2px solid ${theme.AdhanRed}`
                }}
              >
                <div className="text-4xl mb-3">❌</div>
                <p className="font-semibold">{error}</p>
              </div>
            )}

            { result?.data && (
              <>
                <div
                  className="rounded-2xl p-4 mb-4 text-center shadow-lg backdrop-blur-sm"
                  style={{
                    background: mode !== "light" ? "transparent" : "#f0fdf4",
                    color: theme.navbarlogo,
                    border: `2px solid ${theme.navbarlogo}`
                  }}
                >fix
                  {successMsg}
                </div>

                {/* Prayer Times Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <PrayerCard
                    name={t("adhan.prayers.fajr")}
                    time={result.data.Fajr}
                    icon="🌅"
                    theme={theme}
                    mode={mode}
                  />
                  <PrayerCard
                    name={t("adhan.prayers.dhuhr")}
                    time={result.data.Dhuhr}
                    icon="☀️"
                    theme={theme}
                    mode={mode}
                  />
                  <PrayerCard
                    name={t("adhan.prayers.asr")}
                    time={result.data.Asr}
                    icon="🌤️"
                    theme={theme}
                    mode={mode}
                  />
                  <PrayerCard
                    name={t("adhan.prayers.maghrib")}
                    time={result.data.Maghrib}
                    icon="🌅"
                    theme={theme}
                    mode={mode}
                  />
                  <PrayerCard
                    name={t("adhan.prayers.isha")}
                    time={result.data.Isha}
                    icon="🌙"
                    theme={theme}
                    mode={mode}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PrayerCard({ name, time, icon, theme, mode }) {
  return (
    <div
      className="rounded-2xl p-5 shadow-lg text-center transition-all duration-300 hover:scale-[1.05] hover:shadow-xl cursor-default backdrop-blur-sm"
      style={{
        background: mode !== "light" ? "rgba(255,255,255,0.05)" : "#f9fafb",
        border: `2px solid ${theme.AdhanRed}`
      }}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-sm font-medium mb-1" style={{ color: theme.cardtext }}>{name}</p>
      <p className="text-xl font-bold" style={{ color: theme.AdhanRed }}>{time}</p>
    </div>
  );
}

export default AdhanTime;