"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PageLoadingScreen() {
  return (
    <div className="min-h-screen bg-[#1D2939] flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#10B981]/20 border-t-[#10B981] rounded-full animate-spin mx-auto mb-4"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400/50 rounded-full animate-spin mx-auto"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Loading S17 Trading</h2>
        <p className="text-gray-400">Preparing your trading experience...</p>
      </div>
    </div>
  )
}

export function TraderCardSkeleton() {
  return (
    <Card className="bg-[#111827]/50 border-gray-800">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-700" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-gray-700" />
            <Skeleton className="h-3 w-16 bg-gray-700" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-16 bg-gray-700" />
            <Skeleton className="h-3 w-12 bg-gray-700" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-20 bg-gray-700" />
            <Skeleton className="h-3 w-16 bg-gray-700" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-14 bg-gray-700" />
            <Skeleton className="h-3 w-10 bg-gray-700" />
          </div>
        </div>

        <Skeleton className="h-9 w-full mt-4 bg-gray-700" />
      </CardContent>
    </Card>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 bg-gray-700" />
          <Skeleton className="h-4 w-32 bg-gray-700" />
        </div>
        <Skeleton className="h-10 w-32 bg-gray-700" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-[#111827]/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-4 w-20 bg-gray-700" />
                <Skeleton className="h-5 w-5 bg-gray-700" />
              </div>
              <Skeleton className="h-8 w-16 bg-gray-700 mb-1" />
              <Skeleton className="h-3 w-24 bg-gray-700" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Skeleton */}
      <Card className="bg-[#111827]/50 border-gray-800">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-32 bg-gray-700 mb-4" />
          <Skeleton className="h-64 w-full bg-gray-700" />
        </CardContent>
      </Card>

      {/* Table Skeleton */}
      <Card className="bg-[#111827]/50 border-gray-800">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-40 bg-gray-700 mb-4" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-8 w-8 rounded-full bg-gray-700" />
                <Skeleton className="h-4 w-24 bg-gray-700" />
                <Skeleton className="h-4 w-16 bg-gray-700" />
                <Skeleton className="h-4 w-20 bg-gray-700" />
                <Skeleton className="h-4 w-12 bg-gray-700" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div
      className={`${sizeClasses[size]} border-2 border-[#10B981]/20 border-t-[#10B981] rounded-full animate-spin`}
    ></div>
  )
}

export function InlineLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <LoadingSpinner size="sm" />
      <span className="text-gray-400">{text}</span>
    </div>
  )
}
