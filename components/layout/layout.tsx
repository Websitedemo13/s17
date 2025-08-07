"use client"

import type React from "react"

import { Sidebar } from "@/components/layout/sidebar"
import { ProfessionalHeader } from "@/components/layout/professional-header"
import { Footer } from "@/components/layout/footer"
import { AIAssistant } from "@/components/ai/ai-assistant"
import { NotificationCenter } from "@/components/notifications/notification-center"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-full">{children}</div>
        </main>
        <Footer />
      </div>
      <AIAssistant />
      <NotificationCenter />
    </div>
  )
}
