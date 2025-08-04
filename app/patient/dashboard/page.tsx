"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Calendar, Users, Activity, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function PatientDashboard() {
  // TODO: Fetch real patient data from API
  // fetch(`/api/patient/dashboard?id=${userId}`)
  //   .then(res => res.json())
  //   .then(setDashboardData)

  const mockData = {
    nextTransfusion: "January 18, 2024",
    daysUntil: 5,
    samarthanCircleSize: 24,
    activeRequests: 2,
    wellnessScore: 78,
    medicationAdherence: 85,
    recentActivity: [
      { type: "transfusion", message: "Transfusion completed successfully", time: "2 days ago", status: "success" },
      { type: "medication", message: "Medication reminder: Deferasirox", time: "6 hours ago", status: "pending" },
      { type: "donor", message: "New donor joined your Samarthan Circle", time: "1 day ago", status: "info" },
    ],
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Warrior! 💪</h1>
        <p className="text-gray-600">Here's your health overview and upcoming care schedule</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-teal-600">Next Transfusion</p>
                <p className="text-2xl font-bold text-teal-800">{mockData.daysUntil} days</p>
              </div>
              <Calendar className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-red-50 border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-pink-600">Samarthan Circle</p>
                <p className="text-2xl font-bold text-pink-800">{mockData.samarthanCircleSize}</p>
              </div>
              <Users className="w-8 h-8 text-pink-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Wellness Score</p>
                <p className="text-2xl font-bold text-green-800">{mockData.wellnessScore}%</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Active Requests</p>
                <p className="text-2xl font-bold text-orange-800">{mockData.activeRequests}</p>
              </div>
              <Heart className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Prediction Card */}
          <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                <span>AI Health Prediction</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Next transfusion predicted for:</span>
                  <Badge className="bg-teal-100 text-teal-800">{mockData.nextTransfusion}</Badge>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Based on your transfusion history, our AI predicts optimal timing for your next treatment. Your
                    Samarthan Circle has been notified and is preparing.
                  </p>
                  <Link href="/patient/lifeline-requests">
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                      View Full Forecast
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medication Adherence */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span>Today's Wellness</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Medication Adherence</span>
                    <span className="text-sm text-gray-600">{mockData.medicationAdherence}%</span>
                  </div>
                  <Progress value={mockData.medicationAdherence} className="h-2" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">Morning meds taken</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-700">Evening dose pending</span>
                  </div>
                </div>

                <Link href="/patient/wellness-insights">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    View Wellness Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/patient/lifeline-requests">
                  <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800">
                    <Heart className="w-4 h-4 mr-2" />
                    New Blood Request
                  </Button>
                </Link>

                <Link href="/patient/samarthan-circle">
                  <Button
                    variant="outline"
                    className="w-full border-pink-600 text-pink-600 hover:bg-pink-50 bg-transparent"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    View Donors
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "pending"
                            ? "bg-orange-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                <span>Emergency Ready</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Your emergency contacts and nearby resources are always ready to help.
              </p>
              <div className="space-y-2">
                <div className="text-xs text-gray-500">✓ 3 Emergency contacts active</div>
                <div className="text-xs text-gray-500">✓ 2 Hospitals within 5km</div>
                <div className="text-xs text-gray-500">✓ GPS location enabled</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
