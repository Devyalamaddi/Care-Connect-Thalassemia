"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, MapPin, Award, TrendingUp, Clock, Phone, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function DonorDashboard() {
  // TODO: Fetch real donor data from API
  // fetch(`/api/donor/dashboard?id=${userId}`)
  //   .then(res => res.json())
  //   .then(setDashboardData)

  const mockData = {
    totalDonations: 12,
    compassionScore: 95,
    livesImpacted: 36,
    activeRequests: 3,
    nextAvailability: "Available Now",
    recentActivity: [
      { type: "donation", message: "Successful donation to Priya S.", time: "2 days ago", status: "success" },
      { type: "request", message: "New urgent request in your area", time: "5 hours ago", status: "pending" },
      { type: "recognition", message: "Earned 'Compassion Hero' badge", time: "1 week ago", status: "achievement" },
    ],
  }

  const urgentRequests = [
    {
      id: 1,
      patientName: "Arjun K.",
      bloodType: "B+",
      urgency: "high",
      location: "Apollo Hospital, Mumbai",
      distance: "2.3 km",
      timeLeft: "4 hours",
      matchScore: 98,
    },
    {
      id: 2,
      patientName: "Meera P.",
      bloodType: "B+",
      urgency: "medium",
      location: "Fortis Hospital, Mumbai",
      distance: "5.1 km",
      timeLeft: "1 day",
      matchScore: 92,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Hero! 🌟</h1>
        <p className="text-gray-600">Your compassion is making a real difference in the Thalassemia community</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-pink-50 to-red-50 border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-pink-600">Total Donations</p>
                <p className="text-2xl font-bold text-pink-800">{mockData.totalDonations}</p>
              </div>
              <Heart className="w-8 h-8 text-pink-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Compassion Score</p>
                <p className="text-2xl font-bold text-orange-800">{mockData.compassionScore}</p>
              </div>
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-teal-600">Lives Impacted</p>
                <p className="text-2xl font-bold text-teal-800">{mockData.livesImpacted}</p>
              </div>
              <Users className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Requests</p>
                <p className="text-2xl font-bold text-green-800">{mockData.activeRequests}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Urgent Requests */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-600" />
                <span>Urgent Requests Near You</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {urgentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{request.patientName}</h4>
                          <p className="text-sm text-gray-600">Blood Type: {request.bloodType}</p>
                        </div>
                      </div>
                      <Badge
                        className={`${
                          request.urgency === "high" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {request.urgency} priority
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-teal-600" />
                        <span>{request.distance} away</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span>Needed in {request.timeLeft}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-gray-600">Match Score: </span>
                        <span className="font-semibold text-green-600">{request.matchScore}%</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link href="/donor/requests">
                  <Button className="bg-gradient-to-r from-pink-600 to-red-600 text-white hover:from-pink-700 hover:to-red-700">
                    View All Requests
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Impact Summary */}
          <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-teal-600" />
                <span>Your Impact This Month</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">3</div>
                  <div className="text-sm text-gray-600">Successful Donations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">9</div>
                  <div className="text-sm text-gray-600">Lives Directly Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">+15</div>
                  <div className="text-sm text-gray-600">Compassion Points</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white/50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  "Your consistent support has been a lifeline for our community. Thank you for being a true hero!" -
                  Care Connect Team
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Availability Status */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Availability Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-800 text-sm">Available Now</Badge>
              </div>
              <p className="text-sm text-gray-600 text-center mb-4">
                You're eligible to donate and helping save lives!
              </p>
              <Button
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
              >
                Update Availability
              </Button>
            </CardContent>
          </Card>

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

          {/* Achievements */}
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-600">
                <Award className="w-5 h-5" />
                <span>Latest Achievement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Compassion Hero</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Awarded for 10+ successful donations and 95+ compassion score
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  View All Badges
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
