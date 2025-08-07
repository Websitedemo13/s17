"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  Globe,
  Zap,
  MessageCircle,
  PieChart,
  Settings,
  DollarSign
} from "lucide-react"

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    roles: ["investor", "trader", "admin"],
    color: "text-blue-400"
  },
  {
    id: "top-traders",
    label: "Top Traders",
    icon: Users,
    roles: ["investor", "admin"],
    color: "text-purple-400"
  },
  {
    id: "trader-dashboard",
    label: "Trader Dashboard",
    icon: Target,
    roles: ["trader"],
    color: "text-orange-400"
  },
  {
    id: "live-signals",
    label: "Live Signals",
    icon: Radio,
    roles: ["investor", "trader", "admin"],
    color: "text-red-400"
  },
  {
    id: "social-feed",
    label: "Social Feed",
    icon: MessageCircle,
    roles: ["investor", "trader", "admin"],
    color: "text-green-400"
  },
  {
    id: "forum",
    label: "Community",
    icon: MessageSquare,
    roles: ["investor", "trader", "admin"],
    color: "text-yellow-400"
  },
  {
    id: "news",
    label: "Market News",
    icon: Newspaper,
    roles: ["investor", "trader", "admin"],
    color: "text-cyan-400"
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: Trophy,
    roles: ["investor", "trader"],
    color: "text-amber-400"
  },
  {
    id: "admin-panel",
    label: "Admin Panel",
    icon: Shield,
    roles: ["admin"],
    color: "text-red-500"
  },
]

const portfolioStats = [
  { label: "Portfolio", value: "$125,430", change: "+12.5%", positive: true },
  { label: "Monthly ROI", value: "8.9%", change: "+2.1%", positive: true },
  { label: "Active Trades", value: "7", change: "+2", positive: true },
]

export function ProfessionalSidebar() {
  const { user, currentPage, setCurrentPage, logout } = useAuthStore()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const filteredNavItems = navigationItems.filter((item) => 
    user?.role && item.roles.includes(user.role)
  )

  const handleNavigation = (pageId: string) => {
    setCurrentPage(pageId)
    setIsMobileOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsMobileOpen(false)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <Avatar className="h-10 w-10 border-2 border-[#10B981]/30">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-[#10B981]/20 text-[#10B981]">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-white font-semibold text-sm">{user?.name}</h3>
              <p className="text-gray-400 text-xs capitalize">{user?.role} Account</p>
            </div>
          </motion.div>
        )}
        {isCollapsed && (
          <div className="flex justify-center">
            <Avatar className="h-8 w-8 border-2 border-[#10B981]/30">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-[#10B981]/20 text-[#10B981] text-xs">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {!isCollapsed && user?.role === "investor" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-b border-gray-700/50"
        >
          <h4 className="text-gray-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            Portfolio Overview
          </h4>
          <div className="space-y-3">
            {portfolioStats.map((stat, index) => (
              <div key={stat.label} className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{stat.value}</p>
                  <p className="text-gray-400 text-xs">{stat.label}</p>
                </div>
                <div className={`text-xs font-semibold ${
                  stat.positive ? 'text-[#10B981]' : 'text-red-400'
                }`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {!isCollapsed && (
          <h4 className="text-gray-400 text-xs font-semibold mb-4 uppercase tracking-wider">
            Navigation
          </h4>
        )}
        {filteredNavItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Button
              variant={currentPage === item.id ? "default" : "ghost"}
              onClick={() => handleNavigation(item.id)}
              className={`w-full justify-start relative group transition-all duration-200 ${
                currentPage === item.id
                  ? "bg-[#10B981] hover:bg-[#059669] text-white shadow-lg neon-glow"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/50"
              } ${isCollapsed ? "px-2" : "px-4"}`}
            >
              <item.icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"} ${
                currentPage === item.id ? "text-white" : item.color
              }`} />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
              {currentPage === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Button>
          </motion.div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-700/50 space-y-2">
        <Button
          variant="ghost"
          onClick={() => setCurrentPage('profile')}
          className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50 ${
            isCollapsed ? "px-2" : "px-4"
          }`}
        >
          <User className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
          {!isCollapsed && "Profile"}
        </Button>
        
        <Button
          variant="ghost"
          className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50 ${
            isCollapsed ? "px-2" : "px-4"
          }`}
        >
          <Settings className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
          {!isCollapsed && "Settings"}
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50 ${
            isCollapsed ? "px-2" : "px-4"
          }`}
        >
          <HelpCircle className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
          {!isCollapsed && "Support"}
        </Button>

        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 ${
            isCollapsed ? "px-2" : "px-4"
          }`}
        >
          <LogOut className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
          {!isCollapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-20 left-4 z-40 lg:hidden glass-effect text-white hover:bg-gray-800"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-72 glass-effect border-r border-gray-700/50 z-50 lg:hidden"
          >
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 288 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col h-full glass-effect border-r border-gray-700/50 relative"
      >
        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 z-10 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white rounded-full p-1 w-6 h-6"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>

        <SidebarContent />
      </motion.aside>
    </>
  )
}
