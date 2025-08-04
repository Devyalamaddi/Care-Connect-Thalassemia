"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, MapPin, Users, Zap } from "lucide-react"
import { gsap } from "gsap"

export function EmergencyBeacon() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const sosButtonRef = useRef<HTMLButtonElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!prefersReducedMotion && sosButtonRef.current && pulseRef.current) {
      // Continuous pulse animation for SOS button
      gsap.to(sosButtonRef.current, {
        scale: 1.05,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })

      // Pulse ring animation
      gsap.to(pulseRef.current, {
        scale: 1.5,
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
        setCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isEmergencyActive, countdown])

  const activateEmergency = () => {
    setIsEmergencyActive(true)
    setCountdown(30) // 30 second countdown before full activation

    // TODO: Trigger emergency cascade
    // fetch('/api/emergency/activate', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     patientId: user.id,
    //     location: getCurrentLocation(),
    //     urgency: 'critical',
    //     timestamp: new Date().toISOString()
    //   })
    // })
  }

  const cancelEmergency = () => {
    setIsEmergencyActive(false)
    setCountdown(0)

    // TODO: Cancel emergency cascade
    // fetch('/api/emergency/cancel', { method: 'POST' })
  }

  const emergencyContacts = [
    { name: "Dr. Sarah Patel", role: "Hematologist", phone: "+91 98765 43210", distance: "2.1 km" },
    { name: "Apollo Hospital", role: "Emergency Dept", phone: "+91 98765 43211", distance: "3.5 km" },
    { name: "Priya Sharma", role: "Primary Donor", phone: "+91 98765 43212", distance: "1.8 km" },
  ]

  const nearbyResources = [
    { name: "City Blood Bank", type: "Blood Bank", availability: "B+ Available", distance: "1.2 km" },
    { name: "Metro Hospital", type: "Hospital", availability: "3 Beds Free", distance: "2.8 km" },
    { name: "Emergency Clinic", type: "Clinic", availability: "Open 24/7", distance: "0.9 km" },
  ]

  return (
    <section id="emergency" className="section-reveal py-20 px-6 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Emergency Beacon
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            One-click SOS with intelligent cascade alerts. GPS-enabled emergency response connecting you instantly to
            donors, hospitals, and medical support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Activation */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Emergency Activation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                {!isEmergencyActive ? (
                  <>
                    <div className="relative inline-block">
                      <div ref={pulseRef} className="absolute inset-0 bg-red-500 rounded-full opacity-20" />
                      <Button
                        ref={sosButtonRef}
                        size="lg"
                        className="w-32 h-32 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xl font-bold shadow-2xl"
                        onClick={activateEmergency}
                        aria-label="Activate emergency beacon"
                      >
                        SOS
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-gray-800">Emergency Beacon Ready</p>
                      <p className="text-sm text-gray-600">
                        Press and hold for 3 seconds to activate emergency cascade
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="text-6xl font-bold text-red-600">{countdown}</div>
                      <p className="text-lg font-semibold text-red-600">Emergency Activating...</p>
                      <p className="text-sm text-gray-600">Notifying emergency contacts and nearby resources</p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                      onClick={cancelEmergency}
                    >
                      Cancel Emergency
                    </Button>
                  </>
                )}

                {/* Emergency Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
                  <div className="text-center">
                    <MapPin className="w-6 h-6 text-red-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-800">GPS Tracking</div>
                    <div className="text-xs text-gray-600">Real-time location</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-6 h-6 text-red-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-800">Cascade Alerts</div>
                    <div className="text-xs text-gray-600">Multi-tier response</div>
                  </div>
                  <div className="text-center">
                    <Zap className="w-6 h-6 text-red-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-800">Instant Response</div>
                    <div className="text-xs text-gray-600">{"<"} 60 seconds</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Status */}
            {isEmergencyActive && (
              <Card className="bg-red-50 border-red-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-red-600">Emergency Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Location Shared</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Contacts Notified</span>
                      <Badge className="bg-blue-100 text-blue-800">3 of 3</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Hospitals Alerted</span>
                      <Badge className="bg-orange-100 text-orange-800">2 nearby</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Donors Contacted</span>
                      <Badge className="bg-purple-100 text-purple-800">5 available</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Emergency Contacts & Resources */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-teal-600" />
                  <span>Emergency Contacts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">{contact.name}</div>
                        <div className="text-sm text-gray-600">{contact.role}</div>
                        <div className="text-xs text-gray-500">{contact.distance} away</div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  <span>Nearby Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyResources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">{resource.name}</div>
                        <div className="text-sm text-gray-600">{resource.type}</div>
                        <div className="text-xs text-green-600">{resource.availability}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-800">{resource.distance}</div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-1 border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
                        >
                          Navigate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Protocol */}
        <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">Emergency Protocol</h3>
            <p className="text-orange-700 max-w-2xl mx-auto">
              Our intelligent cascade system ensures rapid response through multiple channels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                1
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Immediate Alert</h4>
              <p className="text-sm text-gray-600">GPS location shared with emergency contacts</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                2
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Cascade Activation</h4>
              <p className="text-sm text-gray-600">Primary donors and hospitals notified</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                3
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Resource Mobilization</h4>
              <p className="text-sm text-gray-600">Blood banks and ambulances alerted</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                4
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Continuous Updates</h4>
              <p className="text-sm text-gray-600">Real-time status to family and caregivers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
