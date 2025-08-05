"use client"

import { useState } from "react"
import { useAuthStore } from "@/lib/auth-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockTraders, mockSocialPosts } from "@/lib/mock-data"
import { Shield, Users, TrendingUp, DollarSign, CheckCircle, XCircle, Eye, Ban } from "lucide-react"

export function AdminPanelPage() {
  const { user } = useAuthStore()
  const [traders, setTraders] = useState(mockTraders)
  const [posts, setPosts] = useState(mockSocialPosts)

  if (user?.role !== "admin") {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-white">Access Denied</h2>
        <p className="text-gray-400">This panel is only available for administrators.</p>
      </div>
    )
  }

  const handleApproveTrader = (traderId: string) => {
    setTraders(traders.map((trader) => (trader.id === traderId ? { ...trader, verified: true } : trader)))
  }

  const handleRejectTrader = (traderId: string) => {
    setTraders(traders.map((trader) => (trader.id === traderId ? { ...trader, verified: false } : trader)))
  }

  const systemStats = {
    totalUsers: 12450,
    totalTraders: 156,
    totalRevenue: 89500,
    activeSubscriptions: 1247,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="h-6 w-6 text-[#10B981]" />
          Admin Panel
        </h1>
        <p className="text-gray-400 mt-1">System administration and management</p>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-[#10B981] flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Traders</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#10B981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemStats.totalTraders}</div>
            <p className="text-xs text-gray-400 mt-1">+8 pending approval</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${systemStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-[#10B981] flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18% this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Subscriptions</CardTitle>
            <CheckCircle className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemStats.activeSubscriptions.toLocaleString()}</div>
            <p className="text-xs text-gray-400 mt-1">85% retention rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="traders" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#111827] border border-gray-800">
          <TabsTrigger value="traders">Trader Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="content">Content Moderation</TabsTrigger>
        </TabsList>

        <TabsContent value="traders" className="mt-6">
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Trader Approval Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {traders.map((trader) => (
                  <div
                    key={trader.id}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-white">{trader.name}</h3>
                        <p className="text-sm text-gray-400">{trader.strategy}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">ROI: +{trader.totalROI}%</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-400">Win Rate: {trader.winRate}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={trader.verified ? "default" : "secondary"}>
                        {trader.verified ? "Verified" : "Pending"}
                      </Badge>

                      <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>

                      {!trader.verified && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApproveTrader(trader.id)}
                            className="bg-[#10B981] hover:bg-[#059669] text-white"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectTrader(trader.id)}
                            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}

                      {trader.verified && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Suspend
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">User management interface would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Content Moderation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-white">{post.authorName}</h3>
                        <span className="text-xs text-gray-400">{new Date(post.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{post.content}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <span>{post.likes} likes</span>
                        <span>{post.comments} comments</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                      >
                        <Ban className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
