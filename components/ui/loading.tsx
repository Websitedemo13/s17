"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-[#10B981]",
        sizeClasses[size],
        className,
      )}
    />
  )
}

export function LoadingPage() {
  return (
    <div className="min-h-screen bg-[#1D2939] flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#10B981] to-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <div className="relative bg-[#111827] p-8 rounded-full border border-gray-800">
            <LoadingSpinner size="xl" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Loading S17 Platform</h2>
        <p className="text-gray-400 animate-pulse">Preparing your trading experience...</p>
        <div className="mt-6 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-lg p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-700 rounded"></div>
        <div className="h-3 bg-gray-700 rounded w-5/6"></div>
        <div className="h-8 bg-gray-700 rounded w-1/3"></div>
      </div>
    </div>
  )
}
