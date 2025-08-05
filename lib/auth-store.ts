"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  name: string
  role: "investor" | "trader" | "admin"
  avatar: string
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  showWelcome: boolean
  showGoodbye: boolean
  isAuthenticated: boolean
  currentPage: string
  login: (user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  setShowWelcome: (show: boolean) => void
  setShowGoodbye: (show: boolean) => void
  setCurrentPage: (page: string) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      showWelcome: false,
      showGoodbye: false,
      isAuthenticated: false,
      currentPage: "landing",
      login: (user) => {
        set({
          user,
          isAuthenticated: true,
          showWelcome: true,
          isLoading: false,
          currentPage:
            user.role === "trader" ? "trader-dashboard" : user.role === "admin" ? "admin-panel" : "dashboard",
        })
        // Hide welcome message after 3 seconds
        setTimeout(() => {
          set({ showWelcome: false })
        }, 3000)
      },
      logout: () => {
        set({ showGoodbye: true })
        setTimeout(() => {
          set({
            user: null,
            isAuthenticated: false,
            showGoodbye: false,
            currentPage: "landing",
          })
        }, 2000)
      },
      setLoading: (isLoading) => set({ isLoading }),
      setShowWelcome: (showWelcome) => set({ showWelcome }),
      setShowGoodbye: (showGoodbye) => set({ showGoodbye }),
      setCurrentPage: (currentPage) => set({ currentPage }),
    }),
    {
      name: "s17-auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        currentPage: state.currentPage,
      }),
    },
  ),
)
