"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Droplets, Calendar, Plus, Filter } from "lucide-react"

export function LifeLineRequests() {
  const [activeTab, setActiveTab] = useState("active")

  // TODO: fetch(`/api/requests?patientId=${user.id}`)
  //       .then(res => res.json())
  //       .then(setRequests)

  const mockRequests = [
    {
      id: 1,
      bloodType: "B+",
      urgency: "high",
      location: "Apollo Hospital, Mumbai",
      timeLeft: "4 hours",
      status: "active",
      matchedDonors: 12,
      scheduledDate: "2024-01-15",
    },
    {
      id: 2,
      bloodType: "O-",
      urgency: "medium",
      location: "AIIMS, Delhi",
      timeLeft: "2 days",
      status: "scheduled",
      matchedDonors: 8,
      scheduledDate: "2024-01-18",
    },
    {
      id: 3,
      bloodType: "A+",
      urgency: "low",
      location: "Fortis Hospital, Bangalore",
      timeLeft: "1 week",
      status: "predicted",
      matchedDonors: 15,
      scheduledDate: "2024-01-22",
    },
  ]

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <section id="lifeline" className="section-reveal py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            LifeLine Requests
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered transfusion forecasting turns reactive searches into proactive scheduling, ensuring you're always
            prepared for your next treatment.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-lg border border-gray-200">
            {["active", "scheduled", "predicted"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab ? "bg-teal-600 text-white shadow-md" : "text-gray-600 hover:text-teal-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Requests
              </Button>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <Button className="bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800">
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
            <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <div className="text-sm text-gray-600">Showing {mockRequests.length} requests</div>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRequests.map((request, index) => (
            <Card
              key={request.id}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm request-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-800">Blood Type: {request.bloodType}</CardTitle>
                  <Badge className={`${getUrgencyColor(request.urgency)} font-medium`}>
                    {request.urgency} priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span className="text-sm">{request.location}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span className="text-sm">Needed in: {request.timeLeft}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span className="text-sm">Scheduled: {request.scheduledDate}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Droplets className="w-4 h-4 text-teal-600" />
                  <span className="text-sm">{request.matchedDonors} matched donors</span>
                </div>

                <div className="pt-4 space-y-2">
                  <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800">
                    View Details
                  </Button>
                  {request.status === "active" && (
                    <Button
                      variant="outline"
                      className="w-full border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
                    >
                      Contact Donors
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Prediction Insight */}
        <div className="mt-12 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 border border-teal-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-teal-800 mb-4">AI Prediction Insights</h3>
            <p className="text-teal-700 mb-6 max-w-2xl mx-auto">
              Based on your transfusion history, our AI predicts your next requirement will be in
              <span className="font-semibold"> 18-22 days</span>. We're already preparing your Samarthan Circle.
            </p>
            <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent">
              View Full Forecast
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
