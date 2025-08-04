"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { User, Heart, Award, MapPin, Phone, Mail, Calendar, Edit, Star, Trophy } from "lucide-react"

export default function DonorProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    bloodType: "B+",
    location: "Mumbai, Maharashtra",
    availability: "available",
    bio: "Passionate about helping Thalassemia warriors. Been donating blood for 5 years and proud to be part of the Care Connect community.",
  })

  // TODO: Fetch real donor profile data
  const donorStats = {
    totalDonations: 12,
    livesImpacted: 36,
    compassionScore: 95,
    memberSince: "January 2019",
    lastDonation: "2 weeks ago",
    nextEligible: "Available now",
    achievements: [
      { name: "Compassion Hero", description: "10+ successful donations", icon: "🏆", earned: true },
      { name: "Life Saver", description: "Helped 25+ patients", icon: "💝", earned: true },
      { name: "Community Champion", description: "5+ years of service", icon: "⭐", earned: true },
      { name: "Emergency Responder", description: "Responded to 5+ urgent requests", icon: "🚨", earned: false },
    ],
    recentActivity: [
      { type: "donation", message: "Successful donation to Priya S.", date: "2 weeks ago" },
      { type: "response", message: "Responded to urgent request", date: "1 month ago" },
      { type: "achievement", message: "Earned 'Compassion Hero' badge", date: "2 months ago" },
    ],
  }

  const handleSaveProfile = () => {
    // TODO: Save profile data to backend
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  const handleAvailabilityToggle = () => {
    const newAvailability = profileData.availability === "available" ? "unavailable" : "available"
    setProfileData({ ...profileData, availability: newAvailability })
    // TODO: Update availability in backend
    alert(`Availability updated to ${newAvailability}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your donor profile and track your impact in the community</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Basic Profile */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="relative inline-block">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt={profileData.name} />
                  <AvatarFallback className="text-2xl">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  onClick={() => alert("Photo upload coming soon!")}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle className="mt-4">{profileData.name}</CardTitle>
              <div className="flex items-center justify-center space-x-2">
                <Badge className="bg-pink-100 text-pink-800">Donor</Badge>
                <Badge variant="outline">{profileData.bloodType}</Badge>
                <Badge
                  className={`${
                    profileData.availability === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {profileData.availability}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Button
                  variant="outline"
                  className={`w-full ${
                    profileData.availability === "available"
                      ? "border-red-600 text-red-600 hover:bg-red-50"
                      : "border-green-600 text-green-600 hover:bg-green-50"
                  } bg-transparent`}
                  onClick={handleAvailabilityToggle}
                >
                  {profileData.availability === "available" ? "Mark Unavailable" : "Mark Available"}
                </Button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{profileData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{profileData.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{profileData.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Member since {donorStats.memberSince}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-pink-50 to-red-50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-pink-600">
                <Heart className="w-5 h-5" />
                <span>Impact Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">{donorStats.totalDonations}</div>
                <div className="text-sm text-gray-600">Total Donations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{donorStats.livesImpacted}</div>
                <div className="text-sm text-gray-600">Lives Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{donorStats.compassionScore}</div>
                <div className="text-sm text-gray-600">Compassion Score</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Details */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-teal-600" />
                  <span>Profile Details</span>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800"
                  >
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">About Me</h4>
                    <p className="text-gray-600">{profileData.bio}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-700">Last Donation</h5>
                      <p className="text-gray-600">{donorStats.lastDonation}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700">Next Eligible</h5>
                      <p className="text-green-600 font-medium">{donorStats.nextEligible}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-orange-600" />
                <span>Achievements & Badges</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {donorStats.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.earned
                        ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200"
                        : "bg-gray-50 border-gray-200 opacity-60"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h4 className={`font-semibold ${achievement.earned ? "text-gray-800" : "text-gray-500"}`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-sm ${achievement.earned ? "text-gray-600" : "text-gray-400"}`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    {achievement.earned && <Badge className="mt-2 bg-orange-100 text-orange-800">Earned</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-purple-600" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donorStats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "donation"
                          ? "bg-red-500"
                          : activity.type === "response"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Donation History */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-green-600" />
                <span>Donation Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Progress to next milestone</span>
                    <span className="text-sm text-gray-600">{donorStats.totalDonations}/15 donations</span>
                  </div>
                  <Progress value={(donorStats.totalDonations / 15) * 100} className="h-3" />
                  <p className="text-xs text-gray-500 mt-1">3 more donations to earn "Super Hero" badge</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">4.9</div>
                    <div className="text-xs text-gray-600">Avg Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">2.5</div>
                    <div className="text-xs text-gray-600">Avg Response Time (hrs)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
