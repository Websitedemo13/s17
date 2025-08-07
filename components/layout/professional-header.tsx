"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/lib/auth-store"
import {
  TrendingUp,
  Bell,
  Settings,
  User,
  LogOut,
  DollarSign,
  BarChart3,
  Globe,
  Zap,
  Users,
  MessageCircle
} from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "trade" | "news" | "system" | "signal"
  timestamp: Date
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Trade Executed",
    message: "EUR/USD position opened at 1.0895",
    type: "trade",
    timestamp: new Date(Date.now() - 300000),
    read: false
  },
  {
    id: "2", 
    title: "New Signal",
    message: "Alex Chen shared a BTC/USD signal",
    type: "signal",
    timestamp: new Date(Date.now() - 600000),
    read: false
  },
  {
    id: "3",
    title: "Market Alert",
    message: "Federal Reserve announces rate decision",
    type: "news",
    timestamp: new Date(Date.now() - 900000),
    read: true
  }
]

export function ProfessionalHeader() {
  const { user, logout, setCurrentPage, currentPage } = useAuthStore()
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [showNotifications, setShowNotifications] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'trade': return <DollarSign className="h-4 w-4 text-green-400" />
      case 'signal': return <Zap className="h-4 w-4 text-yellow-400" />
      case 'news': return <Globe className="h-4 w-4 text-blue-400" />
      default: return <Bell className="h-4 w-4 text-gray-400" />
    }
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    
    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`
    return `${Math.floor(minutes / 1440)}d ago`
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'top-traders', label: 'Top Traders', icon: Users },
    { id: 'live-signals', label: 'Live Signals', icon: Zap },
    { id: 'social-feed', label: 'Social Feed', icon: MessageCircle },
    { id: 'news', label: 'News', icon: Globe },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-700/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-[#10B981] to-blue-500 rounded-xl flex items-center justify-center neon-glow">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                S17 Trading
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">Professional Trading Platform</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                onClick={() => setCurrentPage(item.id)}
                className={`relative ${
                  currentPage === item.id 
                    ? "bg-[#10B981] hover:bg-[#059669] text-white shadow-lg" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#10B981] rounded-md -z-10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Live Time */}
            <div className="hidden md:flex flex-col items-end">
              <div className="text-white text-sm font-mono">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-gray-400 text-xs">
                {currentTime.toLocaleDateString()}
              </div>
            </div>

            {/* Market Status */}
            <Badge className="bg-green-500/20 text-green-400 hidden sm:flex">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Markets Open
            </Badge>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {unreadCount}
                  </motion.div>
                )}
              </Button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-12 w-80 glass-effect rounded-lg shadow-xl border border-gray-700/50 max-h-96 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-700/50">
                      <h3 className="text-white font-semibold">Notifications</h3>
                      <p className="text-gray-400 text-sm">{unreadCount} unread</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto custom-scrollbar">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          onClick={() => markAsRead(notification.id)}
                          className={`p-4 border-b border-gray-700/30 hover:bg-gray-800/30 cursor-pointer transition-colors ${
                            !notification.read ? 'bg-gray-800/20' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white text-sm font-medium">
                                {notification.title}
                              </h4>
                              <p className="text-gray-400 text-xs mt-1">
                                {notification.message}
                              </p>
                              <p className="text-gray-500 text-xs mt-2">
                                {formatTime(notification.timestamp)}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-[#10B981] rounded-full mt-2"></div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 border-2 border-[#10B981]/30">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#10B981]/20 text-[#10B981]">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-effect border-gray-700/50" align="end">
                <DropdownMenuLabel className="text-white">
                  <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span className="text-gray-400 text-sm font-normal">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700/50" />
                <DropdownMenuItem 
                  onClick={() => setCurrentPage('profile')}
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800/50">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700/50" />
                <DropdownMenuItem 
                  onClick={logout}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
