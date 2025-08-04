"use client"

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-white flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">📱</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">You're Offline</h1>
        <p className="text-gray-600 mb-6">
          Don't worry! Care Connect works offline too. Your emergency SOS button is still active, and you can access
          cached content.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-lg font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
