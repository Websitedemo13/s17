"use client"

import { memo, useCallback, useMemo } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTradingStore } from "@/lib/trading-store"
import { useAuthStore } from "@/lib/auth-store"
import { TrendingUp, Users, Shield, Copy, CheckCircle, Star } from "lucide-react"

interface Trader {
  id: string
  name: string
  avatar?: string
  totalROI: number
  monthlyROI: number
  followers: number
  winRate: number
  riskLevel: string
  strategy: string
  verified: boolean
  rating: number
  subscriptionFee: number
  totalTrades: number
}

interface OptimizedTraderCardProps {
  trader: Trader
}

export const OptimizedTraderCard = memo<OptimizedTraderCardProps>(({ trader }) => {
  const { user } = useAuthStore()
  const { copiedTraders, copyTrader } = useTradingStore()

  const isCopied = useMemo(() => copiedTraders.some((ct) => ct.traderId === trader.id), [copiedTraders, trader.id])

  const handleCopy = useCallback(async () => {
    if (user?.role !== "investor" || isCopied) return

    copyTrader({
      traderId: trader.id,
      traderName: trader.name,
      allocation: 1000,
      startDate: new Date().toISOString(),
      currentROI: 0,
      status: "active",
      subscriptionFee: trader.subscriptionFee,
    })
  }, [user?.role, isCopied, copyTrader, trader])

  const getRiskColor = useCallback((risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }, [])

  const riskColorClass = useMemo(() => getRiskColor(trader.riskLevel), [trader.riskLevel, getRiskColor])

  return (
    <Card className="bg-[#111827] border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-[#10B981]/30">
              <AvatarImage src={trader.avatar || "/placeholder.svg"} alt={trader.name} />
              <AvatarFallback className="bg-[#10B981]/20 text-[#10B981]">
                {trader.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white group-hover:text-[#10B981] transition-colors">{trader.name}</h3>
                {trader.verified && <CheckCircle className="h-4 w-4 text-blue-400" />}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < trader.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">({trader.rating})</span>
              </div>
            </div>
          </div>
          <Badge className={riskColorClass}>
            <Shield className="h-3 w-3 mr-1" />
            {trader.riskLevel}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Total ROI</span>
            <span className="text-[#10B981] font-semibold">+{trader.totalROI}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Monthly ROI</span>
            <span className="text-white font-semibold">+{trader.monthlyROI}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Win Rate</span>
            <span className="text-white font-semibold">{trader.winRate}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Followers</span>
            <div className="flex items-center gap-1 text-gray-400">
              <Users className="h-3 w-3" />
              <span className="text-white font-semibold">{trader.followers}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-400 text-sm mb-1">Strategy</p>
          <p className="text-white text-sm">{trader.strategy}</p>
        </div>

        <div className="flex gap-2">
          <Link to={`/trader/${trader.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              View Profile
            </Button>
          </Link>

          {user?.role === "investor" && (
            <Button
              onClick={handleCopy}
              disabled={isCopied}
              size="sm"
              className={`flex-1 transition-all duration-300 ${
                isCopied
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-[#10B981] hover:bg-[#059669] text-white hover:scale-105"
              }`}
            >
              <Copy className="h-4 w-4 mr-2" />
              {isCopied ? "Copied" : "Copy"}
            </Button>
          )}
        </div>

        {trader.subscriptionFee > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-800">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Subscription Fee</span>
              <span className="text-[#10B981] font-semibold">${trader.subscriptionFee}/month</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
})

OptimizedTraderCard.displayName = "OptimizedTraderCard"
