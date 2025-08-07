"use client"

export default function SimpleHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">S17 Trading Platform</h1>
        <p className="text-gray-400 text-lg mb-8">Professional Social Trading Platform</p>
        <div className="space-y-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
            Get Started
          </button>
          <p className="text-gray-500 text-sm">Platform is working correctly!</p>
        </div>
      </div>
    </div>
  )
}
