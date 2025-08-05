"use client"

import { useTradingStore } from "@/lib/trading-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, Users, Activity, AlertTriangle, PieChart, BarChart3 } from "lucide-react"

export function UserDashboard() {
  const { copiedTraders, uncopyTrader } = useTradingStore()

  // Mock portfolio data
  const portfolioStats = {
    totalValue: 125430,
    totalInvested: 98500,
    totalROI: 27.3,
    monthlyReturn: 8.9,
    activePositions: copiedTraders.length,
    totalTrades: 156,
  }

  const mockPositions = copiedTraders.map((ct) => ({
    ...ct,
    currentROI: Math.random() * 40 - 10, // Random ROI between -10% and 30%
    unrealizedPL: Math.random() * 2000 - 500, // Random P&L
    lastUpdate: new Date(Date.now() - Math.random() * 86400000).toISOString(),
  }))

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Portfolio</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${portfolioStats.totalValue.toLocaleString()}</div>
            <p className="text-xs text-emerald-400 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />+{portfolioStats.totalROI}% all time
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Monthly Return</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+{portfolioStats.monthlyReturn}%</div>
            <p className="text-xs text-gray-400 mt-1">vs {portfolioStats.monthlyReturn - 2.1}% last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Copies</CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{portfolioStats.activePositions}</div>
            <p className="text-xs text-gray-400 mt-1">{portfolioStats.totalTrades} total trades</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Risk Level</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Medium</div>
            <Progress value={65} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Active Positions */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-400" />
            Active Copy Positions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mockPositions.length === 0 ? (
            <div className="text-center py-8">
              <PieChart className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No active copy positions</p>
              <p className="text-gray-500 text-sm mt-2">Start copying traders to see your positions here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockPositions.map((position) => (
                <div
                  key={position.traderId}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold text-white">{position.traderName}</h3>
                      <p className="text-sm text-gray-400">Allocated: ${position.allocation.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div
                        className={`font-semibold ${position.currentROI >= 0 ? "text-emerald-400" : "text-red-400"}`}
                      >
                        {position.currentROI >= 0 ? "+" : ""}
                        {position.currentROI.toFixed(2)}%
                      </div>
                      <div className={`text-sm ${position.unrealizedPL >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {position.unrealizedPL >= 0 ? "+" : ""}${position.unrealizedPL.toFixed(2)}
                      </div>
                    </div>

                    <Badge
                      variant={position.status === "active" ? "default" : "secondary"}
                      className={position.status === "active" ? "bg-emerald-500/20 text-emerald-400" : ""}
                    >
                      {position.status}
                    </Badge>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => uncopyTrader(position.traderId)}
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      Stop Copy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-400" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: "Started copying", trader: "Alex Chen", time: "2 hours ago", type: "copy" },
              { action: "Trade executed", trader: "Sarah Johnson", time: "4 hours ago", type: "trade" },
              { action: "Profit realized", trader: "Mike Rodriguez", time: "1 day ago", type: "profit" },
              { action: "Stopped copying", trader: "Emma Wilson", time: "2 days ago", type: "stop" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-800 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "copy"
                        ? "bg-emerald-400"
                        : activity.type === "trade"
                          ? "bg-blue-400"
                          : activity.type === "profit"
                            ? "bg-green-400"
                            : "bg-red-400"
                    }`}
                  />
                  <div>
                    <p className="text-white text-sm">
                      {activity.action} <span className="text-emerald-400">{activity.trader}</span>
                    </p>
                  </div>
                </div>
                <span className="text-gray-400 text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
