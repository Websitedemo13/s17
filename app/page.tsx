"use client"

import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"

// Loading component
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-white mb-2">S17 Trading</h2>
        <p className="text-gray-400">Loading your trading platform...</p>
      </div>
    </div>
  )
}

// Error boundary component
function ErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
        <p className="text-gray-400 mb-6">We're having trouble loading the platform</p>
        <button
          onClick={resetError}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg mr-4"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
        >
          Reload Page
        </button>
        <details className="mt-6 text-left">
          <summary className="text-gray-400 cursor-pointer">Error Details</summary>
          <pre className="text-red-400 text-sm mt-2 bg-gray-800 p-4 rounded overflow-auto">
            {error.message}
          </pre>
        </details>
      </div>
    </div>
  )
}

// Main landing page component
function LandingPageContent() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S17</span>
              </div>
              <span className="text-2xl font-bold text-white">S17 Trading</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-gray-400 text-sm">{currentTime.toLocaleTimeString()}</div>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-full">
              🚀 #1 Social Trading Platform
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Trade Smarter with
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                {" "}Social Trading
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Join thousands of traders who are already profiting by copying top performers. 
              Start your trading journey with zero experience required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-lg">
                Start Trading Now →
              </button>
              <button className="border border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg rounded-lg">
                ▶ Watch Demo
              </button>
            </div>

            <div className="flex items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>No minimum deposit</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Free to start</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Active Traders", value: "50K+", icon: "👥" },
              { label: "Total Volume", value: "$2.5B+", icon: "💰" },
              { label: "Success Rate", value: "78%", icon: "🎯" },
              { label: "Countries", value: "120+", icon: "🌍" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose S17 Trading?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with social trading to give you the best trading experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Copy Top Traders",
                description: "Follow and automatically copy trades from verified professional traders.",
                icon: "👥",
                color: "text-blue-400"
              },
              {
                title: "Real-time Signals",
                description: "Receive instant trading signals and market alerts from experts.",
                icon: "⚡",
                color: "text-yellow-400"
              },
              {
                title: "Advanced Analytics",
                description: "Get detailed performance metrics and portfolio insights powered by AI.",
                icon: "📊",
                color: "text-green-400"
              },
              {
                title: "Secure Trading",
                description: "Your funds are protected with bank-level security and encryption.",
                icon: "🛡️",
                color: "text-purple-400"
              },
              {
                title: "Global Markets",
                description: "Trade forex, stocks, crypto, and commodities from one platform.",
                icon: "🌍",
                color: "text-orange-400"
              },
              {
                title: "Mobile Trading",
                description: "Trade on the go with our responsive web app.",
                icon: "📱",
                color: "text-cyan-400"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-all duration-300 rounded-lg p-6"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Trading Journey?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join S17 today and start copying successful traders. No experience required.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-lg">
            Create Free Account →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S17</span>
            </div>
            <span className="text-2xl font-bold text-white">S17 Trading</span>
          </div>
          <p className="text-gray-400 mb-4">
            The world's leading social trading platform. Trade smarter, not harder.
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 S17 Trading. All rights reserved. Trading involves risk.
          </p>
        </div>
      </footer>
    </div>
  )
}

// Main component with error boundary
export default function Home() {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Global error:', error)
      setHasError(true)
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  if (hasError) {
    return (
      <ErrorFallback
        error={new Error('Application error')}
        resetError={() => setHasError(false)}
      />
    )
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LandingPageContent />
    </Suspense>
  )
}
