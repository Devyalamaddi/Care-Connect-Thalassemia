"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmergencyMap } from "@/components/emergency-map"
import { AlertTriangle, Phone, MapPin, Clock, Users, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EmergencyPage() {
  const [emergencyStatus, setEmergencyStatus] = useState("active")
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // TODO: Fetch real emergency data
  // fetch(`/api/emergency/status?id=${emergencyId}`)
  //   .then(res => res.json())
  //   .then(setEmergencyData)

  const emergencyData = {
    location: "Apollo Hospital, Mumbai",
    coordinates: "19.0760° N, 72.8777° E",
    contactsNotified: 3,
    donorsAlerted: 8,
    hospitalsNotified: 2,
    estimatedArrival: "12 minutes",
    nearbyResources: [
      { name: "Dr. Sarah Patel", type: "Hematologist", status: "En route", eta: "8 min" },
      { name: "Mumbai Blood Bank", type: "Blood Bank", status: "Preparing B+", eta: "5 min" },
      { name: "Emergency Ambulance", type: "Transport", status: "Dispatched", eta: "6 min" },
    ],
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <div className="bg-red-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Emergency Active</h1>
                <p className="text-red-100">All systems responding - Help is on the way</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{formatTime(elapsedTime)}</div>
              <div className="text-red-100 text-sm">Time elapsed</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Navigation */}
        <Link href="/patient/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emergency Status */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Emergency Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Location Shared</span>
                      <Badge className="bg-green-100 text-green-800">✓ Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Emergency Contacts</span>
                      <Badge className="bg-blue-100 text-blue-800">{emergencyData.contactsNotified} Notified</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Samarthan Circle</span>
                      <Badge className="bg-purple-100 text-purple-800">{emergencyData.donorsAlerted} Alerted</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Hospitals Notified</span>
                      <Badge className="bg-orange-100 text-orange-800">
                        {emergencyData.hospitalsNotified} Responding
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Current Location</h4>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-sm">{emergencyData.location}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{emergencyData.coordinates}</div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Estimated Help Arrival</h4>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-lg font-semibold text-orange-600">{emergencyData.estimatedArrival}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Map */}
            <EmergencyMap />

            {/* Response Team */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-teal-600" />
                  <span>Response Team Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyData.nearbyResources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          {resource.type === "Hematologist" && <Users className="w-5 h-5 text-teal-600" />}
                          {resource.type === "Blood Bank" && <AlertTriangle className="w-5 h-5 text-red-600" />}
                          {resource.type === "Transport" && <Phone className="w-5 h-5 text-blue-600" />}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{resource.name}</div>
                          <div className="text-sm text-gray-600">{resource.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 mb-1">{resource.status}</Badge>
                        <div className="text-sm text-gray-600">ETA: {resource.eta}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Actions */}
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-red-600">Emergency Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Emergency Contact
                  </Button>
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
                    <MapPin className="w-4 h-4 mr-2" />
                    Share Live Location
                  </Button>
                  <Button
                    variant="outline"
                    className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    Update Status
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-600 hover:bg-gray-50 bg-transparent"
                    onClick={() => setEmergencyStatus("resolved")}
                  >
                    Mark as Resolved
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Updates */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Live Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-gray-800">Dr. Sarah Patel is en route</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-gray-800">Blood bank preparing B+ units</p>
                      <p className="text-xs text-gray-500">3 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-gray-800">Ambulance dispatched</p>
                      <p className="text-xs text-gray-500">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-gray-800">Emergency activated</p>
                      <p className="text-xs text-gray-500">{formatTime(elapsedTime)} ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">Mom</div>
                      <div className="text-sm text-gray-600">+91 98765 43210</div>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">Dr. Patel</div>
                      <div className="text-sm text-gray-600">+91 98765 43211</div>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">Hospital</div>
                      <div className="text-sm text-gray-600">+91 98765 43212</div>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-600">
                  <CheckCircle className="w-5 h-5" />
                  <span>Stay Safe</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Stay calm and breathe slowly</div>
                  <div>• Keep your phone charged</div>
                  <div>• Stay in a safe location</div>
                  <div>• Follow medical instructions</div>
                  <div>• Help is on the way</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hackathon Compliance Notice */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Hackathon Demo:</strong> This is a prototype emergency system. In a real emergency, always contact
            local emergency services (108/102 in India) first.
          </p>
        </div>
      </div>
    </div>
  )
}
