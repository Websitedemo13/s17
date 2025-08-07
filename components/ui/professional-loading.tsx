"use client"

import { motion } from "framer-motion"
import { TrendingUp, BarChart3, DollarSign, Zap } from "lucide-react"

interface ProfessionalLoadingProps {
  message?: string
  size?: "sm" | "md" | "lg"
  variant?: "spinner" | "pulse" | "dots" | "skeleton"
}

export function ProfessionalLoading({ 
  message = "Loading trading data...", 
  size = "md",
  variant = "spinner" 
}: ProfessionalLoadingProps) {
  
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  }

  const containerSizes = {
    sm: "p-4",
    md: "p-8",
    lg: "p-12"
  }

  if (variant === "skeleton") {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-800 rounded-xl w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-800 rounded-xl"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-800 rounded-xl"></div>
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div className={`flex flex-col items-center justify-center ${containerSizes[size]}`}>
        <div className="flex space-x-2 mb-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`bg-[#10B981] rounded-full ${sizeClasses.sm}`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        <p className="text-gray-400 text-sm">{message}</p>
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <div className={`flex flex-col items-center justify-center ${containerSizes[size]}`}>
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-[#10B981] to-blue-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#10B981] to-blue-500 rounded-xl opacity-20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        <p className="text-gray-400 text-sm mt-4">{message}</p>
      </div>
    )
  }

  // Default spinner variant
  return (
    <div className={`flex flex-col items-center justify-center ${containerSizes[size]}`}>
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className={`border-4 border-gray-700 rounded-full ${sizeClasses[size]}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-transparent border-t-[#10B981] rounded-full"></div>
        </motion.div>
        
        {/* Inner icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <BarChart3 className={`${size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6'} text-[#10B981]`} />
          </motion.div>
        </div>
      </div>
      
      <motion.p 
        className="text-gray-400 text-sm mt-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </div>
  )
}

// Component for loading cards in grids
export function LoadingCards({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="h-32 bg-gray-800/50 rounded-xl border border-gray-700"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            delay: i * 0.2,
            ease: "easeInOut" 
          }}
        />
      ))}
    </div>
  )
}

// Full page loading screen
export function FullPageLoading() {
  const icons = [TrendingUp, BarChart3, DollarSign, Zap]
  
  return (
    <div className="min-h-screen trading-gradient flex items-center justify-center">
      <div className="text-center">
        {/* Animated logo */}
        <motion.div
          className="relative mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-[#10B981] to-blue-500 rounded-2xl flex items-center justify-center neon-glow">
            <TrendingUp className="h-10 w-10 text-white" />
          </div>
          
          {/* Orbiting icons */}
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700"
              style={{
                top: "50%",
                left: "50%",
                marginTop: -16,
                marginLeft: -16,
              }}
              animate={{
                x: [0, 60 * Math.cos((index * Math.PI) / 2), 0],
                y: [0, 60 * Math.sin((index * Math.PI) / 2), 0],
                rotate: 360
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
            >
              <Icon className="h-4 w-4 text-[#10B981]" />
            </motion.div>
          ))}
        </motion.div>

        {/* Brand */}
        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          S17 Trading
        </motion.h1>
        
        <motion.p 
          className="text-gray-400 text-lg mb-8"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          Professional Trading Platform
        </motion.p>

        {/* Loading progress */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#10B981] to-blue-500"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="text-gray-500 text-sm mt-4">Loading your trading platform...</p>
        </div>
      </div>
    </div>
  )
}
