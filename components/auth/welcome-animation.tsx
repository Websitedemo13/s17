"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useAuthStore } from "@/lib/auth-store"
import { TrendingUp, Sparkles, CheckCircle } from "lucide-react"

export function WelcomeAnimation() {
  const { user, setShowWelcome } = useAuthStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [setShowWelcome])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="text-center"
      >
        {/* Logo Animation */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-[#10B981] to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-12 w-12 text-white" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to S17, {user?.name}! 🎉</h1>
          <p className="text-xl text-gray-300 mb-6">Your {user?.role} account is ready to go</p>

          <div className="flex items-center justify-center gap-2 text-[#10B981]">
            <CheckCircle className="h-6 w-6" />
            <span className="text-lg font-semibold">Account Setup Complete</span>
          </div>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex items-center justify-center gap-2"
        >
          <div className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-gray-400 mt-4"
        >
          Preparing your dashboard...
        </motion.p>
      </motion.div>
    </div>
  )
}
