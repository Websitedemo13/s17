"use client"

import { useAuthStore } from "@/lib/auth-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockTraders, mockTradeHistory } from "@/lib/mock-data"
import { TrendingUp, DollarSign, Users, Activity, BarChart3, Settings, Plus, Eye } from "lucide-react"

export function TraderDashboardPage() {
  const { user } = useAuthStore()

  if (user?.role !== "trader") {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-white">Access Denied</h2>
        <p className="text-gray-400">This dashboard is only available for traders.</p>
      </div>
    )
  }

  // Find current trader's data
  const traderData = mockTraders.find((t) => t.name === user.name) || mockTraders[0]
  const recentTrades = mockTradeHistory.filter((t) => t.traderId === traderData.id).slice(0, 5)

  // Mock earnings data
  const earningsData = {
    monthlyRevenue: 4250,
    totalRevenue: 18900,
    activeSubscribers: 47,
    conversionRate: 12.5,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Trader Dashboard</h1>
          <p className="text-gray-400 mt-1">Manage your trading strategies and followers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-700 text-gray-300 bg-transparent">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button className="bg-[#10B981] hover:bg-[#059669] text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Strategy
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-[#10B981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${earningsData.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-[#10B981] flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +23% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Subscribers</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{earningsData.activeSubscribers}</div>
            <p className="text-xs text-gray-400 mt-1">+5 new this week</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total ROI</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+{traderData.totalROI}%</div>
            <p className="text-xs text-gray-400 mt-1">All time performance</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Win Rate</CardTitle>
            <Activity className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{traderData.winRate}%</div>
            <p className="text-xs text-gray-400 mt-1">{traderData.totalTrades} total trades</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trades */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#10B981]" />
              Recent Trades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{trade.symbol}</div>
                    <div className="text-sm text-gray-400">{new Date(trade.date).toLocaleDateString()}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant={trade.type === "BUY" ? "default" : "secondary"}>{trade.type}</Badge>
                    <div className={`text-sm font-medium ${trade.pnl >= 0 ? "text-[#10B981]" : "text-red-400"}`}>
                      {trade.pnl >= 0 ? "+" : ""}${trade.pnl}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subscriber Growth */}
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              Subscriber Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Followers</span>
                <span className="text-white font-semibold">{traderData.followers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active Subscribers</span>
                <span className="text-white font-semibold">{earningsData.activeSubscribers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Conversion Rate</span>
                <span className="text-[#10B981] font-semibold">{earningsData.conversionRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Monthly Revenue</span>
                <span className="text-[#10B981] font-semibold">${earningsData.monthlyRevenue}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategy Management */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-400" />
            My Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div>
                <h3 className="font-semibold text-white">{traderData.strategy}</h3>
                <p className="text-sm text-gray-400">Active • ${traderData.subscriptionFee}/month</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#10B981]/20 text-[#10B981]">Active</Badge>
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 bg-transparent">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 bg-transparent">
                  <Settings className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
