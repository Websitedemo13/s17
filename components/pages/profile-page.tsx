"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useAuthStore } from "@/lib/auth-store"
import { useTradingStore } from "@/lib/trading-store"
import {
  User,
  Shield,
  Bell,
  Activity,
  Trophy,
  Camera,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  MapPin,
  Calendar,
  Globe,
  Twitter,
  Linkedin,
  Edit,
  X,
  TrendingUp,
  Users,
  MessageSquare,
} from "lucide-react"

export function ProfilePage() {
  const { user } = useAuthStore()
  const { copiedTraders } = useTradingStore()
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Passionate trader focused on long-term growth and risk management. Always learning and sharing knowledge with the community.",
    website: "https://mytrading.blog",
    twitter: "@trader_pro",
    linkedin: "linkedin.com/in/trader",
    joinDate: "January 2024",
    timezone: "EST (UTC-5)",
    language: "English",
    currency: "USD",
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    tradingAlerts: true,
    marketNews: true,
    socialUpdates: false,
    loginAlerts: true,
    portfolioUpdates: true,
  })

  const stats = {
    totalTrades: 234,
    winRate: 78,
    totalProfit: 15670,
    followersCount: 456,
    followingCount: copiedTraders.length,
    postsCount: 45,
    achievementsCount: 18,
    level: 15,
    xp: 3450,
    streak: 12,
    rank: "Gold Trader",
  }

  const achievements = [
    { name: "First Trade", icon: "🎯", date: "Jan 2024", rarity: "common" },
    { name: "Portfolio Master", icon: "📊", date: "Feb 2024", rarity: "rare" },
    { name: "Social Butterfly", icon: "🦋", date: "Mar 2024", rarity: "rare" },
    { name: "Profit Maker", icon: "💰", date: "Mar 2024", rarity: "epic" },
    { name: "Community Champion", icon: "👑", date: "Apr 2024", rarity: "legendary" },
  ]

  const recentActivity = [
    { type: "trade", description: "Copied Alex Chen's EUR/USD signal", time: "2 hours ago", profit: "+$245" },
    { type: "social", description: "Posted market analysis", time: "5 hours ago", likes: 23 },
    { type: "achievement", description: "Unlocked 'Profit Maker' achievement", time: "1 day ago", xp: "+500 XP" },
    { type: "follow", description: "Started following Sarah Johnson", time: "2 days ago" },
  ]

  const handleSave = () => {
    // Save profile data
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset form data
    setIsEditing(false)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-400"
      case "rare":
        return "text-blue-400"
      case "epic":
        return "text-purple-400"
      case "legendary":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-[#10B981]/20 rounded-xl">
              <User className="h-8 w-8 text-[#10B981]" />
            </div>
            My Profile
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-[#10B981] hover:bg-[#059669] text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-gray-700 hover:bg-gray-600 text-white">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </motion.div>

      {/* Profile Header Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-gradient-to-r from-[#111827] to-[#1D2939] border-gray-800 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Avatar Section */}
              <div className="relative text-center">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-[#10B981]/30 mx-auto">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback className="bg-[#10B981]/20 text-[#10B981] text-4xl">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-[#10B981] hover:bg-[#059669] p-0"
                    >
                      <Camera className="h-5 w-5" />
                    </Button>
                  )}
                </div>
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Badge className="bg-[#10B981]/20 text-[#10B981] capitalize">{user?.role}</Badge>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black">{stats.rank}</Badge>
                    <Badge className="bg-purple-500/20 text-purple-400">Level {stats.level}</Badge>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="flex-1 w-full">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#10B981] mb-1">{stats.totalTrades}</div>
                    <div className="text-sm text-gray-400">Total Trades</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">{stats.winRate}%</div>
                    <div className="text-sm text-gray-400">Win Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">${stats.totalProfit.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Total Profit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-1">{stats.followersCount}</div>
                    <div className="text-sm text-gray-400">Followers</div>
                  </div>
                </div>

                {/* Bio */}
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <p className="text-gray-300 text-center">{profileData.bio}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Profile Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-[#111827] border border-gray-800">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#111827] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400 mb-2 block">Full Name</label>
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400 mb-2 block">Email</label>
                      <Input
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400 mb-2 block">Phone</label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400 mb-2 block">Location</label>
                      <Input
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Bio</label>
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#111827] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Social Links & Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Twitter</label>
                    <div className="relative">
                      <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={profileData.twitter}
                        onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">LinkedIn</label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={profileData.linkedin}
                        onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <h4 className="text-sm font-medium text-gray-400 mb-3">Account Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 text-gray-300">
                        <Calendar className="h-4 w-4 text-[#10B981]" />
                        <span>Joined {profileData.joinDate}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <MapPin className="h-4 w-4 text-blue-400" />
                        <span>{profileData.timezone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Activity className="h-4 w-4 text-purple-400" />
                        <span>{stats.xp.toLocaleString()} XP Points</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                        <span>{stats.achievementsCount} Achievements Unlocked</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#111827] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorEnabled}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, twoFactorEnabled: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Login Alerts</h4>
                      <p className="text-sm text-gray-400">Get notified of new login attempts</p>
                    </div>
                    <Switch
                      checked={securitySettings.loginAlerts}
                      onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, loginAlerts: checked })}
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-white">Change Password</h4>
                    <div>
                      <label className="text-sm font-medium text-gray-400 mb-2 block">Current Password</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          className="bg-gray-800 border-gray-700 text-white pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400 mb-2 block">New Password</label>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400 mb-2 block">Confirm Password</label>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <Button className="w-full bg-[#10B981] hover:bg-[#059669]">Update Password</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#111827] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Recent Login Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { device: "MacBook Pro", location: "New York, USA", time: "2 hours ago", current: true },
                      { device: "iPhone 14", location: "New York, USA", time: "1 day ago", current: false },
                      { device: "Chrome Browser", location: "New York, USA", time: "3 days ago", current: false },
                      { device: "iPad", location: "Boston, USA", time: "1 week ago", current: false },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-4 w-4 text-gray-400" />
                          <div>
                            <div className="font-medium text-white flex items-center gap-2">
                              {session.device}
                              {session.current && (
                                <Badge className="bg-[#10B981]/20 text-[#10B981] text-xs">Current</Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-400">
                              {session.location} • {session.time}
                            </div>
                          </div>
                        </div>
                        {!session.current && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                          >
                            Revoke
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card className="bg-[#111827] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-white">Email Notifications</h4>
                    {[
                      {
                        key: "emailNotifications",
                        label: "General Email Notifications",
                        description: "Receive important updates via email",
                      },
                      {
                        key: "tradingAlerts",
                        label: "Trading Alerts",
                        description: "Get notified about your trading activities",
                      },
                      { key: "marketNews", label: "Market News", description: "Stay updated with market developments" },
                      {
                        key: "portfolioUpdates",
                        label: "Portfolio Updates",
                        description: "Receive updates about your portfolio performance",
                      },
                    ].map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                      >
                        <div>
                          <h5 className="font-medium text-white">{setting.label}</h5>
                          <p className="text-sm text-gray-400">{setting.description}</p>
                        </div>
                        <Switch
                          checked={securitySettings[setting.key as keyof typeof securitySettings] as boolean}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({ ...securitySettings, [setting.key]: checked })
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-white">Push Notifications</h4>
                    {[
                      {
                        key: "smsNotifications",
                        label: "SMS Notifications",
                        description: "Receive critical alerts via SMS",
                      },
                      {
                        key: "socialUpdates",
                        label: "Social Updates",
                        description: "Get notified about social interactions",
                      },
                    ].map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                      >
                        <div>
                          <h5 className="font-medium text-white">{setting.label}</h5>
                          <p className="text-sm text-gray-400">{setting.description}</p>
                        </div>
                        <Switch
                          checked={securitySettings[setting.key as keyof typeof securitySettings] as boolean}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({ ...securitySettings, [setting.key]: checked })
                          }
                        />
                      </div>
                    ))}

                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <h5 className="font-medium text-blue-400 mb-2">Notification Schedule</h5>
                      <p className="text-sm text-gray-400 mb-3">Choose when you want to receive notifications</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="schedule" id="always" className="text-[#10B981]" defaultChecked />
                          <label htmlFor="always" className="text-sm text-white">
                            All day
                          </label>
                        </div>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="schedule" id="business" className="text-[#10B981]" />
                          <label htmlFor="business" className="text-sm text-white">
                            Business hours only (9 AM - 6 PM)
                          </label>
                        </div>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="schedule" id="custom" className="text-[#10B981]" />
                          <label htmlFor="custom" className="text-sm text-white">
                            Custom schedule
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-[#111827] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-400" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={achievement.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div>
                              <h4 className="font-medium text-white">{achievement.name}</h4>
                              <p className="text-xs text-gray-400">{achievement.date}</p>
                            </div>
                          </div>
                          <Badge className={`${getRarityColor(achievement.rarity)} text-xs`}>
                            {achievement.rarity.toUpperCase()}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-[#111827] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Achievement Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#10B981] mb-1">{stats.achievementsCount}</div>
                      <div className="text-sm text-gray-400">Total Unlocked</div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { rarity: "legendary", count: 1, color: "text-yellow-400" },
                        { rarity: "epic", count: 2, color: "text-purple-400" },
                        { rarity: "rare", count: 5, color: "text-blue-400" },
                        { rarity: "common", count: 10, color: "text-gray-400" },
                      ].map((stat) => (
                        <div key={stat.rarity} className="flex items-center justify-between">
                          <span className={`text-sm capitalize ${stat.color}`}>{stat.rarity}</span>
                          <span className="text-white font-semibold">{stat.count}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-400 mb-1">{stats.streak}</div>
                        <div className="text-sm text-gray-400">Day Streak</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card className="bg-[#111827] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg"
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          activity.type === "trade"
                            ? "bg-[#10B981]/20 text-[#10B981]"
                            : activity.type === "social"
                              ? "bg-blue-500/20 text-blue-400"
                              : activity.type === "achievement"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-purple-500/20 text-purple-400"
                        }`}
                      >
                        {activity.type === "trade" && <TrendingUp className="h-4 w-4" />}
                        {activity.type === "social" && <MessageSquare className="h-4 w-4" />}
                        {activity.type === "achievement" && <Trophy className="h-4 w-4" />}
                        {activity.type === "follow" && <Users className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-white">{activity.description}</p>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                      </div>
                      {activity.profit && <Badge className="bg-[#10B981]/20 text-[#10B981]">{activity.profit}</Badge>}
                      {activity.likes && <Badge className="bg-blue-500/20 text-blue-400">{activity.likes} likes</Badge>}
                      {activity.xp && <Badge className="bg-yellow-500/20 text-yellow-400">{activity.xp}</Badge>}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
