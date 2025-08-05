"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/auth-store"
import { useTradingStore } from "@/lib/trading-store"
import { Trophy, Star, Target, Award, Calendar, TrendingUp, Users, MessageSquare, Crown, Flame } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: "trading" | "social" | "learning" | "milestone" | "special"
  progress: number
  maxProgress: number
  isCompleted: boolean
  reward: {
    xp: number
    badge?: string
    title?: string
    coins?: number
  }
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt?: Date
}

interface UserStats {
  level: number
  xp: number
  xpToNext: number
  totalTrades: number
  daysActive: number
  postsCreated: number
  tradersFollowed: number
  streak: number
  totalEarnings: number
  winRate: number
  coins: number
  rank: string
}

const achievementCategories = [
  { id: "all", name: "All Achievements", icon: Trophy, color: "text-yellow-400" },
  { id: "trading", name: "Trading", icon: TrendingUp, color: "text-[#10B981]" },
  { id: "social", name: "Social", icon: Users, color: "text-blue-400" },
  { id: "learning", name: "Learning", icon: Star, color: "text-purple-400" },
  { id: "milestone", name: "Milestones", icon: Award, color: "text-orange-400" },
  { id: "special", name: "Special", icon: Crown, color: "text-pink-400" },
]

export function AchievementSystem() {
  const { user } = useAuthStore()
  const { copiedTraders } = useTradingStore()
  const [selectedCategory, setSelectedCategory] = useState("all")

  const [userStats, setUserStats] = useState<UserStats>({
    level: 15,
    xp: 3450,
    xpToNext: 1550,
    totalTrades: 234,
    daysActive: 67,
    postsCreated: 45,
    tradersFollowed: copiedTraders.length,
    streak: 12,
    totalEarnings: 15670,
    winRate: 78,
    coins: 2340,
    rank: "Gold Trader",
  })

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first-copy",
      title: "First Steps",
      description: "Copy your first trader and begin your journey",
      icon: <Target className="h-6 w-6" />,
      category: "trading",
      progress: copiedTraders.length > 0 ? 1 : 0,
      maxProgress: 1,
      isCompleted: copiedTraders.length > 0,
      reward: { xp: 100, badge: "Beginner Trader", coins: 50 },
      rarity: "common",
      unlockedAt: copiedTraders.length > 0 ? new Date(Date.now() - 86400000) : undefined,
    },
    {
      id: "diversified",
      title: "Portfolio Master",
      description: "Follow 10 different traders to diversify your portfolio",
      icon: <TrendingUp className="h-6 w-6" />,
      category: "trading",
      progress: Math.min(copiedTraders.length, 10),
      maxProgress: 10,
      isCompleted: copiedTraders.length >= 10,
      reward: { xp: 500, badge: "Portfolio Master", coins: 200 },
      rarity: "rare",
      unlockedAt: copiedTraders.length >= 10 ? new Date(Date.now() - 172800000) : undefined,
    },
    {
      id: "social-butterfly",
      title: "Community Champion",
      description: "Create 25 forum posts and engage with the community",
      icon: <MessageSquare className="h-6 w-6" />,
      category: "social",
      progress: userStats.postsCreated,
      maxProgress: 25,
      isCompleted: userStats.postsCreated >= 25,
      reward: { xp: 300, title: "Community Champion", coins: 150 },
      rarity: "rare",
      unlockedAt: userStats.postsCreated >= 25 ? new Date(Date.now() - 259200000) : undefined,
    },
    {
      id: "streak-master",
      title: "Dedication Warrior",
      description: "Maintain a 30-day login streak",
      icon: <Flame className="h-6 w-6" />,
      category: "milestone",
      progress: userStats.streak,
      maxProgress: 30,
      isCompleted: userStats.streak >= 30,
      reward: { xp: 750, badge: "Dedicated Trader", coins: 300 },
      rarity: "epic",
    },
    {
      id: "century-club",
      title: "Century Club",
      description: "Complete 100 successful trades",
      icon: <Trophy className="h-6 w-6" />,
      category: "trading",
      progress: userStats.totalTrades,
      maxProgress: 100,
      isCompleted: userStats.totalTrades >= 100,
      reward: { xp: 1000, title: "Trading Veteran", coins: 500 },
      rarity: "epic",
      unlockedAt: userStats.totalTrades >= 100 ? new Date(Date.now() - 345600000) : undefined,
    },
    {
      id: "profit-king",
      title: "Profit King",
      description: "Earn $10,000 in total profits",
      icon: <Crown className="h-6 w-6" />,
      category: "trading",
      progress: Math.min(userStats.totalEarnings, 10000),
      maxProgress: 10000,
      isCompleted: userStats.totalEarnings >= 10000,
      reward: { xp: 2000, badge: "Profit King", title: "Elite Trader", coins: 1000 },
      rarity: "legendary",
      unlockedAt: userStats.totalEarnings >= 10000 ? new Date(Date.now() - 432000000) : undefined,
    },
    {
      id: "win-rate-master",
      title: "Precision Trader",
      description: "Achieve 80% win rate with at least 50 trades",
      icon: <Target className="h-4 w-4" />,
      category: "trading",
      progress: userStats.winRate >= 80 && userStats.totalTrades >= 50 ? 1 : 0,
      maxProgress: 1,
      isCompleted: userStats.winRate >= 80 && userStats.totalTrades >= 50,
      reward: { xp: 1500, badge: "Precision Trader", coins: 750 },
      rarity: "epic",
      unlockedAt: userStats.winRate >= 80 && userStats.totalTrades >= 50 ? new Date(Date.now() - 518400000) : undefined,
    },
    {
      id: "early-adopter",
      title: "Pioneer",
      description: "Join S17 in the first month of launch",
      icon: <Star className="h-4 w-4" />,
      category: "special",
      progress: 1,
      maxProgress: 1,
      isCompleted: true,
      reward: { xp: 500, badge: "Pioneer", title: "Early Adopter", coins: 250 },
      rarity: "legendary",
      unlockedAt: new Date(Date.now() - 2592000000),
    },
  ])

  const [dailyQuests, setDailyQuests] = useState([
    {
      id: "daily-login",
      title: "Daily Check-in",
      description: "Log in to your account",
      progress: 1,
      maxProgress: 1,
      isCompleted: true,
      reward: 50,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "check-portfolio",
      title: "Portfolio Review",
      description: "Review your copied traders performance",
      progress: 1,
      maxProgress: 1,
      isCompleted: true,
      reward: 75,
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      id: "social-interaction",
      title: "Community Engagement",
      description: "Like or comment on 3 posts",
      progress: 2,
      maxProgress: 3,
      isCompleted: false,
      reward: 100,
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: "learn-something",
      title: "Knowledge Seeker",
      description: "Read 2 educational articles",
      progress: 0,
      maxProgress: 2,
      isCompleted: false,
      reward: 125,
      icon: <Star className="h-4 w-4" />,
    },
  ])

  const filteredAchievements = achievements.filter(
    (achievement) => selectedCategory === "all" || achievement.category === selectedCategory,
  )

  const completedAchievements = achievements.filter((a) => a.isCompleted)
  const totalAchievements = achievements.length

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-500 bg-gray-500/10"
      case "rare":
        return "border-blue-500 bg-blue-500/10"
      case "epic":
        return "border-purple-500 bg-purple-500/10"
      case "legendary":
        return "border-yellow-500 bg-yellow-500/10"
      default:
        return "border-gray-500 bg-gray-500/10"
    }
  }

  const getRarityTextColor = (rarity: string) => {
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

  const levelProgress = (userStats.xp / (userStats.xp + userStats.xpToNext)) * 100

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-yellow-500/20 rounded-xl">
            <Trophy className="h-10 w-10 text-yellow-400" />
          </div>
          Achievements & Progress
        </h1>
        <p className="text-gray-400 text-xl">Track your trading journey and unlock exclusive rewards</p>
      </motion.div>

      {/* User Level & Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-gradient-to-r from-[#111827] to-[#1D2939] border-gray-800 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Avatar & Level */}
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#10B981] via-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-white font-bold text-2xl">{userStats.level}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center">
                    <Crown className="h-4 w-4" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>
                <Badge className="bg-gradient-to-r from-[#10B981] to-blue-500 text-white mb-2">{userStats.rank}</Badge>
                <p className="text-gray-400">Level {userStats.level} Trader</p>
              </div>

              {/* Progress & Stats */}
              <div className="flex-1 w-full">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#10B981] mb-1">{userStats.xp.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Total XP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">{completedAchievements.length}</div>
                    <div className="text-sm text-gray-400">Achievements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">{userStats.coins.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">S17 Coins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-1">{userStats.streak}</div>
                    <div className="text-sm text-gray-400">Day Streak</div>
                  </div>
                </div>

                {/* Level Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Progress to Level {userStats.level + 1}</span>
                    <span className="text-white font-semibold">{Math.round(levelProgress)}%</span>
                  </div>
                  <Progress value={levelProgress} className="h-4" />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{userStats.xp.toLocaleString()} XP</span>
                    <span>{(userStats.xp + userStats.xpToNext).toLocaleString()} XP</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Daily Quests */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-6 w-6 text-blue-400" />
              Daily Quests
              <Badge className="bg-blue-500/20 text-blue-400 ml-auto">Resets in 8h 23m</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dailyQuests.map((quest, index) => (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    quest.isCompleted
                      ? "bg-[#10B981]/10 border-[#10B981]/30"
                      : "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`p-2 rounded-lg ${quest.isCompleted ? "bg-[#10B981]/20 text-[#10B981]" : "bg-gray-700 text-gray-400"}`}
                    >
                      {quest.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-sm">{quest.title}</h3>
                      <p className="text-xs text-gray-400">{quest.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">
                        {quest.progress}/{quest.maxProgress}
                      </span>
                    </div>
                    <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2" />
                    <div className="flex items-center justify-between">
                      <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">+{quest.reward} XP</Badge>
                      {quest.isCompleted && (
                        <Badge className="bg-[#10B981]/20 text-[#10B981] text-xs">✓ Complete</Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievement Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-3"
      >
        {achievementCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 transition-all duration-300 ${
              selectedCategory === category.id
                ? "bg-[#10B981] hover:bg-[#059669] text-white"
                : "border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            }`}
          >
            {category.icon({ className: `h-4 w-4 ${category.color}` })}
            {category.name}
          </Button>
        ))}
      </motion.div>

      {/* Achievements Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <Card
              className={`h-full transition-all duration-300 ${
                achievement.isCompleted
                  ? `${getRarityColor(achievement.rarity)} border-2`
                  : "bg-[#111827] border-gray-800 hover:border-gray-700"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`p-3 rounded-xl ${
                      achievement.isCompleted
                        ? `${getRarityColor(achievement.rarity)} ${getRarityTextColor(achievement.rarity)}`
                        : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white">{achievement.title}</h3>
                      {achievement.isCompleted && <Badge className="bg-[#10B981]/20 text-[#10B981] text-xs">✓</Badge>}
                    </div>
                    <Badge className={`${getRarityTextColor(achievement.rarity)} text-xs mb-2`}>
                      {achievement.rarity.toUpperCase()}
                    </Badge>
                    <p className="text-gray-400 text-sm">{achievement.description}</p>
                  </div>
                </div>

                {!achievement.isCompleted && (
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-3" />
                  </div>
                )}

                {achievement.unlockedAt && (
                  <div className="text-xs text-gray-500 mb-4">
                    Unlocked {achievement.unlockedAt.toLocaleDateString()}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Rewards:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">+{achievement.reward.xp} XP</Badge>
                    {achievement.reward.coins && (
                      <Badge className="bg-purple-500/20 text-purple-400 text-xs">
                        +{achievement.reward.coins} Coins
                      </Badge>
                    )}
                    {achievement.reward.badge && (
                      <Badge className="bg-blue-500/20 text-blue-400 text-xs">{achievement.reward.badge}</Badge>
                    )}
                    {achievement.reward.title && (
                      <Badge className="bg-orange-500/20 text-orange-400 text-xs">{achievement.reward.title}</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Achievement Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="h-6 w-6 text-orange-400" />
              Achievement Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#10B981] mb-2">
                  {completedAchievements.length}/{totalAchievements}
                </div>
                <div className="text-sm text-gray-400">Completed</div>
                <Progress value={(completedAchievements.length / totalAchievements) * 100} className="mt-2 h-2" />
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {achievements.filter((a) => a.rarity === "legendary" && a.isCompleted).length}
                </div>
                <div className="text-sm text-gray-400">Legendary</div>
                <div className="text-xs text-yellow-400 mt-1">Ultra Rare</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {achievements.filter((a) => a.rarity === "epic" && a.isCompleted).length}
                </div>
                <div className="text-sm text-gray-400">Epic</div>
                <div className="text-xs text-purple-400 mt-1">Very Rare</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{userStats.streak}</div>
                <div className="text-sm text-gray-400">Current Streak</div>
                <div className="text-xs text-orange-400 mt-1">Keep it up!</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
