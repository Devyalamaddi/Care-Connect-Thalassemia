"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Phone, MapPin } from "lucide-react"
import { gsap } from "gsap"
import { useRouter } from "next/navigation"

export function FloatingSOSButton() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const sosButtonRef = useRef<HTMLButtonElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!prefersReducedMotion && sosButtonRef.current && pulseRef.current) {
      // Continuous pulse animation for SOS button
      gsap.to(sosButtonRef.current, {
        scale: 1.1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })

      // Pulse ring animation
      gsap.to(pulseRef.current, {
        scale: 1.8,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power2.out",
      })
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isEmergencyActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            activateFullEmergency()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isEmergencyActive, countdown])

  const handleSOSClick = () => {
    setShowConfirmation(true)
  }

  const confirmEmergency = () => {
    setShowConfirmation(false)
    setIsEmergencyActive(true)
    setCountdown(4) // 4 second countdown as requested

    // TODO: Start emergency cascade
    // fetch('/api/emergency/initiate', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     patientId: 'user123',
    //     location: getCurrentLocation(),
    //     timestamp: new Date().toISOString()
    //   })
    // })
  }

  const activateFullEmergency = () => {
    // TODO: Full emergency activation
    // This would trigger all emergency protocols
    console.log("EMERGENCY ACTIVATED - Full cascade initiated")

    // Navigate to emergency page
    router.push("/emergency")
  }

  const cancelEmergency = () => {
    setIsEmergencyActive(false)
    setShowConfirmation(false)
    setCountdown(0)

    // TODO: Cancel emergency cascade
    // fetch('/api/emergency/cancel', { method: 'POST' })
  }

  return (
    <>
      {/* Floating SOS Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="relative">
          <div ref={pulseRef} className="absolute inset-0 bg-red-500 rounded-full opacity-20" />
          <Button
            ref={sosButtonRef}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg font-bold text-sm sm:text-lg"
            onClick={handleSOSClick}
            aria-label="Emergency SOS button"
          >
            SOS
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-md border-0 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                <span>Emergency Activation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                Are you experiencing a medical emergency? This will immediately alert your emergency contacts, nearby
                hospitals, and your Samarthan Circle.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-red-500" />
                  <span>3 emergency contacts will be called</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>Your location will be shared</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span>Nearby hospitals will be notified</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={confirmEmergency}>
                  Yes, Emergency!
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Emergency Countdown */}
      {isEmergencyActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-red-50/95 backdrop-blur-md border-red-200 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-red-600 text-center">Emergency Activating</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl sm:text-6xl font-bold text-red-600 mb-4">{countdown}</div>
              <p className="text-red-700 mb-6">Emergency cascade starting in {countdown} seconds...</p>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">GPS Location</span>
                  <span className="text-green-600 font-medium">✓ Shared</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Emergency Contacts</span>
                  <span className="text-orange-600 font-medium">⏳ Alerting</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Samarthan Circle</span>
                  <span className="text-orange-600 font-medium">⏳ Notifying</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                onClick={cancelEmergency}
              >
                Cancel Emergency
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Overlay */}
      {(showConfirmation || isEmergencyActive) && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={cancelEmergency} />
      )}
    </>
  )
}
