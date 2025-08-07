"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuthStore } from "@/lib/auth-store"
import { Layout } from "@/components/layout/layout"
import { LoginPage } from "@/components/auth/login-page"
import { RegisterPage } from "@/components/auth/register-page"
import { WelcomeAnimation } from "@/components/auth/welcome-animation"
import { LandingPage } from "@/components/pages/landing-page"
import { DashboardPage } from "@/components/pages/dashboard-page"
import { TopTradersPage } from "@/components/pages/top-traders-page"
import { LiveSignalRoomImproved } from "@/components/community/live-signal-room-improved"
import { SocialFeedPage } from "@/components/pages/social-feed-page"
import { Forum } from "@/components/community/forum"
import { AINewsFeed } from "@/components/news/ai-news-feed"
import { AchievementSystem } from "@/components/gamification/achievement-system"
import { ProfilePage } from "@/components/pages/profile-page"
import { TraderDashboardPage } from "@/components/pages/trader-dashboard-page"
import { AdminPanelPage } from "@/components/pages/admin-panel-page"

export default function Home() {
  const { user, isAuthenticated, currentPage, showWelcome } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-16 h-16 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">S17 Trading</h2>
          <p className="text-gray-400">Loading your trading platform...</p>
        </motion.div>
      </div>
    )
  }

  if (showWelcome && isAuthenticated) {
    return <WelcomeAnimation />
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <AnimatePresence mode="wait">
          {currentPage === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <LoginPage />
            </motion.div>
          )}
          {currentPage === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <RegisterPage />
            </motion.div>
          )}
          {(currentPage === "landing" || !currentPage) && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LandingPage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />
      case "top-traders":
        return <TopTradersPage />
      case "live-signals":
        return <LiveSignalRoomImproved />
      case "social-feed":
        return <SocialFeedPage />
      case "forum":
        return <Forum />
      case "news":
        return <AINewsFeed />
      case "achievements":
        return <AchievementSystem />
      case "profile":
        return <ProfilePage />
      case "trader-dashboard":
        return <TraderDashboardPage />
      case "admin-panel":
        return <AdminPanelPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  )
}
