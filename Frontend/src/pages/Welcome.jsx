import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useAuth } from "../context/AuthContext";
import {
  FaPrayingHands,
  FaQuran,
  FaTasks,
  FaClock,
  FaStar,
  FaFire,
  FaChartLine,
  FaCalendarAlt,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import background from "../assets/background6.jpg";
import backgrounddark from "../assets/background6-2.jpg";

function Welcome() {
  const { theme, mode } = useTheme();
  const { t } = useTranslation("welcome");
  const { user } = useAuth();
  const isRTL = i18n.language === "ar";

  const [greeting, setGreeting] = useState("");
  const [stats, setStats] = useState({
    quranProgress: 0,
    tasksCompleted: 0,
    tasbeehCount: 0,
    streak: 7,
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(t("greeting.morning"));
    else if (hour < 18) setGreeting(t("greeting.afternoon"));
    else setGreeting(t("greeting.evening"));
  }, [t]);

  useEffect(() => {
    setStats({
      quranProgress: user?.quranProgress?.surah ? Math.min((user.quranProgress.surah / 114) * 100, 100) : 15,
      tasksCompleted: Math.floor(Math.random() * 20) + 5,
      tasbeehCount: Math.floor(Math.random() * 500) + 100,
      streak: Math.floor(Math.random() * 14) + 1,
    });
  }, [user]);

  const quickLinks = [
    {
      to: "/app/prayer-times",
      icon: FaClock,
      label: t("quickActions.prayerTimes"),
      color: "#10B981",
    },
    {
      to: "/app/quran",
      icon: FaQuran,
      label: t("quickActions.quran"),
      color: "#3B82F6",
    },
    
  {
      to: "/app/schedule",
      icon: FaTasks,
      label: t("quickActions.tasks"),
      color: "#8B5CF6",
    },
    {
      to: "/app/tasbih",
      icon: FaPrayingHands,
      label: t("quickActions.tasbeeh"),
      color: "#F59E0B",
    },
  ];

  const statCards = [
    {
      icon: FaQuran,
      label: t("stats.quranProgress"),
      value: `${stats.quranProgress.toFixed(0)}%`,
      subValue: `${Math.floor((stats.quranProgress / 100) * 114)} / 114 ${t("stats.surahs")}`,
      color: "#10B981",
      bgGradient: "from-emerald-500/20 to-emerald-500/5",
    },
    {
      icon: FaTasks,
      label: t("stats.tasksCompleted"),
      value: stats.tasksCompleted.toString(),
      subValue: t("stats.thisWeek"),
      color: "#3B82F6",
      bgGradient: "from-blue-500/20 to-blue-500/5",
    },
    {
      icon: FaFire,
      label: t("stats.currentStreak"),
      value: `${stats.streak} ${t("stats.days")}`,
      subValue: t("stats.keepItUp"),
      color: "#F59E0B",
      bgGradient: "from-amber-500/20 to-amber-500/5",
    },
    {
      icon: FaChartLine,
      label: t("stats.totalTasbeeh"),
      value: stats.tasbeehCount.toLocaleString(),
      subValue: t("stats.repetitions"),
      color: "#8B5CF6",
      bgGradient: "from-violet-500/20 to-violet-500/5",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-[calc(100vh-64px)] bg-no-repeat bg-center bg-cover"
      style={
        mode === "light"
          ? { backgroundImage: `url(${background})` }
          : { backgroundImage: `url(${backgrounddark})` }
      }
    >
      <div className="w-full min-h-full backdrop-blur-sm py-8 px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto space-y-6"
        >
          {/* Welcome Header */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-md"
            style={{ background: theme.card }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-start">
                <motion.p
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm md:text-base opacity-70 mb-1"
                  style={{ color: theme.cardtext }}
                >
                  {greeting}
                </motion.p>
                <h1
                  className="text-2xl md:text-4xl font-bold"
                  style={{ color: theme.navbarlogo }}
                >
                  {user?.username || t("welcome.title")}
                </h1>
                <p
                  className="text-base md:text-lg mt-2 max-w-2xl"
                  style={{ color: theme.cardtext }}
                >
                  {t("welcome.subtitle")}
                </p>
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl"
                style={{ background: theme.quranpage }}
              >
                <FaCalendarAlt className="text-2xl" style={{ color: theme.navbarlogo }} />
                <div className="text-start">
                  <p className="text-xs opacity-70" style={{ color: theme.cardtext }}>
                    {t("date.today")}
                  </p>
                  <p className="font-semibold" style={{ color: theme.cardtext }}>
                    {new Date().toLocaleDateString(i18n.language, {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="rounded-xl p-5 shadow-lg backdrop-blur-md cursor-pointer transition-all"
                  style={{ background: theme.card }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ background: stat.bgGradient }}
                    >
                      <stat.icon className="text-xl" style={{ color: stat.color }} />
                    </div>
                    {index === 0 && (
                      <div className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-600 font-medium">
                        {t("stats.live")}
                      </div>
                    )}
                  </div>
                  <p className="text-sm opacity-70" style={{ color: theme.cardtext }}>
                    {stat.label}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold mt-1" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-xs mt-1 opacity-60" style={{ color: theme.cardtext }}>
                    {stat.subValue}
                  </p>
                  {index === 0 && (
                    <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: theme.quranpage }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.quranProgress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full"
                        style={{ background: stat.color }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <div
              className="rounded-2xl p-6 shadow-xl backdrop-blur-md"
              style={{ background: theme.card }}
            >
              <h2
                className="text-xl font-bold mb-4 flex items-center gap-2"
                style={{ color: theme.navbarlogo }}
              >
                <FaStar />
                {t("quickActions.title")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-xl p-4 text-center shadow-md transition-all"
                      style={{ background: theme.quranpage }}
                    >
                      <div
                        className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                        style={{ background: `${link.color}20` }}
                      >
                        <link.icon className="text-2xl" style={{ color: link.color }} />
                      </div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: theme.cardtext }}
                      >
                        {link.label}
                      </p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Daily Tip / Hadith Card */}
          <motion.div variants={itemVariants}>
            <div
              className="rounded-2xl p-6 shadow-xl backdrop-blur-md"
              style={{
                background: `linear-gradient(135deg, ${theme.card}, ${theme.quranpage})`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: theme.navbarlogo + "20" }}
                >
                  <FaPrayingHands className="text-2xl" style={{ color: theme.navbarlogo }} />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: theme.navbarlogo }}
                  >
                    {t("dailyReminder.title")}
                  </h3>
                  <p
                    className="text-sm md:text-base leading-relaxed"
                    style={{ color: theme.cardtext }}
                  >
                    {t("dailyReminder.text")}
                  </p>
                  <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
                    <Link
                      to="/prayer-times"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                      style={{ background: theme.navbarlogo, color: "#fff" }}
                    >
                      {t("dailyActions.checkPrayers")}
                      {isRTL ? <FaChevronLeft /> : <FaChevronRight />}
                    </Link>
                    <Link
                      to="/tasks"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium border-2 transition-all hover:opacity-90"
                      style={{
                        borderColor: theme.navbarlogo,
                        color: theme.navbarlogo,
                      }}
                    >
                      {t("dailyActions.viewTasks")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer encouragement */}
          <motion.div
            variants={itemVariants}
            className="text-center py-4"
          >
            <p
              className="text-sm opacity-70"
              style={{ color: theme.cardtext }}
            >
              {t("footer.encouragement")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Welcome;