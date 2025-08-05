"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, X, TrendingUp, Users, Award, DollarSign } from "lucide-react"

interface Notification {
  id: string
  type: "trade" | "social" | "system" | "achievement"
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  icon: React.ReactNode
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "trade",
      title: "Trade Executed",
      message: "Your EUR/USD copy trade from Alex Chen was executed at 1.0945",
      timestamp: new Date(Date.now() - 300000),
      isRead: false,
      icon: <TrendingUp className="h-4 w-4 text-[#10B981]" />,
    },
    {
      id: "2",
      type: "social",
      title: "New Follower",
      message: "Sarah Johnson started following you",
      timestamp: new Date(Date.now() - 1800000),
      isRead: false,
      icon: <Users className="h-4 w-4 text-blue-400" />,
    },
    {
      id: "3",
      type: "achievement",
      title: "Achievement Unlocked",
      message: "You've earned the 'Profit Maker' badge!",
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
      icon: <Award className="h-4 w-4 text-yellow-400" />,
    },
    {
      id: "4",
      type: "system",
      title: "Market Alert",
      message: "Bitcoin has reached your target price of $45,000",
      timestamp: new Date(Date.now() - 7200000),
      isRead: true,
      icon: <DollarSign className="h-4 w-4 text-orange-400" />,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <>
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 text-gray-400 hover:text-white z-30 relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center p-0">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed top-0 right-0 h-full w-80 bg-gray-800 border-l border-gray-700 z-50 overflow-hidden"
            >
              <Card className="h-full bg-transparent border-none rounded-none">
                <CardHeader className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Notifications</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-[#10B981] hover:text-[#059669] text-xs p-0 h-auto justify-start"
                    >
                      Mark all as read
                    </Button>
                  )}
                </CardHeader>

                <CardContent className="p-0 overflow-y-auto h-full">
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors ${
                          !notification.isRead ? "bg-gray-700/30" : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">{notification.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-semibold text-white truncate">{notification.title}</h4>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-[#10B981] rounded-full flex-shrink-0"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{formatTime(notification.timestamp)}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {notifications.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                      <Bell className="h-12 w-12 mb-4 opacity-50" />
                      <p className="text-lg font-medium">No notifications</p>
                      <p className="text-sm">You're all caught up!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
