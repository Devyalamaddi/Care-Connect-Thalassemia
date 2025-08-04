"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Star, Phone, MessageSquare, Users, Award, Heart, Search } from "lucide-react"

export default function SamarthanCirclePage() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [filterStatus, setFilterStatus] = useState("all")

  // TODO: Fetch real donors data
  const mockDonors = [
    {
      id: 1,
      name: "Priya Sharma",
      bloodType: "B+",
      distance: "2.3 km",
      rating: 4.9,
      donations: 12,
      lastDonation: "2 weeks ago",
      availability: "available",
      compassionScore: 95,
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+91 98765 43210",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      bloodType: "B+",
      distance: "5.1 km",
      rating: 4.8,
      donations: 8,
      lastDonation: "1 month ago",
      availability: "available",
      compassionScore: 88,
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+91 98765 43211",
    },
    {
      id: 3,
      name: "Anita Patel",
      bloodType: "B+",
      distance: "3.7 km",
      rating: 5.0,
      donations: 15,
      lastDonation: "3 weeks ago",
      availability: "busy",
      compassionScore: 98,
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+91 98765 43212",
    },
    {
      id: 4,
      name: "Vikram Singh",
      bloodType: "B+",
      distance: "1.8 km",
      rating: 4.7,
      donations: 6,
      lastDonation: "1 week ago",
      availability: "available",
      compassionScore: 92,
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+91 98765 43213",
    },
  ]

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "busy":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "unavailable":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredDonors = mockDonors.filter((donor) => {
    if (filterStatus === "all") return true
    return donor.availability === filterStatus
  })

  const handleCall = (phone: string, name: string) => {
    // TODO: Implement actual calling functionality
    alert(`Calling ${name} at ${phone}`)
  }

  const handleMessage = (name: string) => {
    // TODO: Implement messaging functionality
    alert(`Opening message to ${name}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Samarthan Circle</h1>
        <p className="text-gray-600">
          Your trusted donor community - pre-vetted, local heroes ready to support your journey
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <Card className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="pt-4 sm:pt-6">
            <Users className="w-6 sm:w-8 h-6 sm:h-8 text-teal-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-teal-600">24</div>
            <div className="text-xs sm:text-sm text-gray-600">Circle Members</div>
          </CardContent>
        </Card>

        <Card className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="pt-4 sm:pt-6">
            <Heart className="w-6 sm:w-8 h-6 sm:h-8 text-pink-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-pink-600">156</div>
            <div className="text-xs sm:text-sm text-gray-600">Total Donations</div>
          </CardContent>
        </Card>

        <Card className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="pt-4 sm:pt-6">
            <Award className="w-6 sm:w-8 h-6 sm:h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-orange-600">4.9</div>
            <div className="text-xs sm:text-sm text-gray-600">Avg Rating</div>
          </CardContent>
        </Card>

        <Card className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="pt-4 sm:pt-6">
            <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-green-600">3.2</div>
            <div className="text-xs sm:text-sm text-gray-600">Avg Distance (km)</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search donors..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="all">All Donors</option>
          <option value="available">Available</option>
          <option value="busy">Busy</option>
          <option value="unavailable">Unavailable</option>
        </select>

        {/* View Toggle */}
        <div className="bg-white rounded-lg p-1 shadow border border-gray-200">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            className={`px-3 py-1 ${
              viewMode === "grid" ? "bg-teal-600 text-white" : "text-gray-600 hover:text-teal-600"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <Users className="w-4 h-4 mr-1" />
            Grid
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "ghost"}
            size="sm"
            className={`px-3 py-1 ${
              viewMode === "map" ? "bg-teal-600 text-white" : "text-gray-600 hover:text-teal-600"
            }`}
            onClick={() => setViewMode("map")}
          >
            <MapPin className="w-4 h-4 mr-1" />
            Map
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        /* Donors Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDonors.map((donor) => (
            <Card
              key={donor.id}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={donor.avatar || "/placeholder.svg"} alt={donor.name} />
                    <AvatarFallback>
                      {donor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-800">{donor.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {donor.bloodType}
                      </Badge>
                      <Badge className={`text-xs ${getAvailabilityColor(donor.availability)}`}>
                        {donor.availability}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <span className="text-gray-600">{donor.distance}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-600">{donor.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-pink-600" />
                    <span className="text-gray-600">{donor.donations} donations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-600">{donor.compassionScore} score</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500">Last donation: {donor.lastDonation}</div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800"
                    disabled={donor.availability !== "available"}
                    onClick={() => handleCall(donor.phone, donor.name)}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
                    onClick={() => handleMessage(donor.name)}
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Map View */
        <Card className="h-96 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="h-full flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Map View</h3>
              <p className="text-gray-600 mb-4">Visualize your Samarthan Circle with real-time locations</p>
              <div className="text-sm text-gray-500">Map integration ready for production deployment</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Circle Insights */}
      <div className="mt-12 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-teal-100">
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-teal-800 mb-4">Circle Health</h3>
          <p className="text-teal-700 mb-6 max-w-2xl mx-auto">
            Your Samarthan Circle is <span className="font-semibold">92% active</span> with excellent coverage. Smart
            rotation ensures no donor fatigue while maintaining 24/7 availability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
              onClick={() => alert("Invite feature coming soon!")}
            >
              Invite New Members
            </Button>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
              onClick={() => alert("Analytics dashboard coming soon!")}
            >
              View Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
