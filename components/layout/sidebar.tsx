"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/lib/auth-store"
import {
  TrendingUp,
  BarChart3,
  Users,
  MessageSquare,
  Newspaper,
  Trophy,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Radio,
  Target,
  Shield,
  HelpCircle,
  Menu,
  X,
} from "lucide-react"

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    roles: ["investor", "trader", "admin"],
  },
  {
    id: "top-traders",
    label: "Top Traders",
    icon: Users,
    roles: ["investor", "admin"],
  },
  {
    id: "trader-dashboard",
    label: "Trader Dashboard",
    icon: Target,
    roles: ["trader"],
  },
  {
    id: "live-signals",
    label: "Live Signals",
    icon: Radio,
    roles: ["investor", "trader", "admin"],
  },
  {
    id: "social-feed",
    label: "Social Feed",
    icon: MessageSquare,
    roles: ["investor", "trader", "admin"],
  },
  {
    id: "forum",
    label: "Forum",
    icon: MessageSquare,
    roles: ["investor", "trader", "admin"],
  },
  {
    id: "news",
    label: "News",
    icon: Newspaper,
    roles: ["investor", "trader", "admin"],
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: Trophy,
    roles: ["investor", "trader", "admin"],
  },
  {
    id: "admin-panel",
    label: "Admin Panel",
    icon: Shield,
    roles: ["admin"],
  },
]

export function Sidebar() {
  const { user, currentPage, setCurrentPage, logout } = useAuthStore()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const filteredNavItems = navigationItems.filter((item) => user?.role && item.roles.includes(user.role))

  const handleNavigation = (pageId: string) => {
    setCurrentPage(pageId)
    setIsMobileOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 text-white hover:bg-gray-700"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
          x: isMobileOpen ? 0 : -280,
        }}
        transition={{ duration: 0.3 }}
        className={`
          fixed md:relative left-0 top-0 h-full bg-gray-800/95 backdrop-blur-sm border-r border-gray-700 z-50
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#10B981] to-blue-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">S17</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                {/* Mobile Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileOpen(false)}
                  className="md:hidden text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Desktop Collapse Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="hidden md:flex text-gray-400 hover:text-white"
                >
                  {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* User Profile */}
          {user && (
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-[#10B981]/30">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-[#10B981]/20 text-[#10B981]">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">{user.name}</div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#10B981]/20 text-[#10B981] text-xs capitalize">{user.role}</Badge>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {filteredNavItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                onClick={() => handleNavigation(item.id)}
                className={`
                  w-full justify-start gap-3 h-12
                  ${
                    currentPage === item.id
                      ? "bg-[#10B981] hover:bg-[#059669] text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }
                  ${isCollapsed ? "px-3" : "px-4"}
                `}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Button>
            ))}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-700 space-y-2">
            <Button
              variant="ghost"
              onClick={() => handleNavigation("profile")}
              className={`
                w-full justify-start gap-3 h-12 text-gray-300 hover:text-white hover:bg-gray-700
                ${isCollapsed ? "px-3" : "px-4"}
              `}
            >
              <User className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>Profile</span>}
            </Button>

            <Button
              variant="ghost"
              className={`
                w-full justify-start gap-3 h-12 text-gray-300 hover:text-white hover:bg-gray-700
                ${isCollapsed ? "px-3" : "px-4"}
              `}
            >
              <HelpCircle className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>Help</span>}
            </Button>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className={`
                w-full justify-start gap-3 h-12 text-red-400 hover:text-red-300 hover:bg-red-500/10
                ${isCollapsed ? "px-3" : "px-4"}
              `}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
