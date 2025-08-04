"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BloodRequestDetails } from "@/components/blood-request-details"
import {
  Search,
  MapPin,
  Clock,
  Droplets,
  AlertTriangle,
  Heart,
  CheckCircle,
  X,
  RefreshCw,
  SortAsc,
  SortDesc,
} from "lucide-react"

interface DonationRequest {
  id: string
  patientName: string
  bloodType: string
  unitsNeeded: number
  urgency: "critical" | "urgent" | "moderate"
  hospital: string
  location: string
  distance: string
  timePosted: string
  deadline: string
  contactNumber: string
  medicalCondition: string
  additionalNotes?: string
  donorRequirements?: string[]
  hospitalAddress: string
  coordinates: {
    lat: number
    lng: number
  }
  status: "pending" | "accepted" | "completed" | "expired"
  matchScore: number
}

export default function DonorRequestsPage() {
  const [requests, setRequests] = useState<DonationRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<DonationRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<DonationRequest | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [distanceFilter, setDistanceFilter] = useState("all")
  const [sortBy, setSortBy] = useState("match")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - requests that match donor's blood type (B+)
  const mockRequests: DonationRequest[] = [
    {
      id: "1",
      patientName: "Rajesh Kumar",
      bloodType: "B+",
      unitsNeeded: 3,
      urgency: "critical",
      hospital: "Apollo Hospital",
      location: "Bandra, Mumbai",
      distance: "2.1 km",
      timePosted: "5 minutes ago",
      deadline: "Within 2 hours",
      contactNumber: "+91 98765 43210",
      medicalCondition: "Thalassemia Major",
      additionalNotes: "Patient requires immediate transfusion. Regular donor preferred.",
      donorRequirements: ["Age 18-60", "Weight above 50kg", "No recent illness", "B+ or O- blood type"],
      hospitalAddress: "Apollo Hospital, Bandra West, Mumbai - 400050",
      coordinates: { lat: 19.0596, lng: 72.8295 },
      status: "pending",
      matchScore: 98,
    },
    {
      id: "2",
      patientName: "Amit Patel",
      bloodType: "B+",
      unitsNeeded: 1,
      urgency: "moderate",
      hospital: "Hinduja Hospital",
      location: "Mahim, Mumbai",
      distance: "3.2 km",
      timePosted: "1 hour ago",
      deadline: "Within 8 hours",
      contactNumber: "+91 98765 43212",
      medicalCondition: "Anemia treatment",
      hospitalAddress: "Hinduja Hospital, Mahim, Mumbai - 400016",
      coordinates: { lat: 19.041, lng: 72.8447 },
      status: "pending",
      matchScore: 85,
    },
    {
      id: "3",
      patientName: "Sunita Gupta",
      bloodType: "AB+",
      unitsNeeded: 2,
      urgency: "urgent",
      hospital: "KEM Hospital",
      location: "Parel, Mumbai",
      distance: "4.5 km",
      timePosted: "30 minutes ago",
      deadline: "Within 3 hours",
      contactNumber: "+91 98765 43213",
      medicalCondition: "Leukemia treatment",
      additionalNotes: "Patient undergoing chemotherapy, needs compatible donor.",
      donorRequirements: ["AB+ or universal donors", "Recent blood test required"],
      hospitalAddress: "KEM Hospital, Parel, Mumbai - 400012",
      coordinates: { lat: 19.0176, lng: 72.8562 },
      status: "accepted",
      matchScore: 92,
    },
    {
      id: "4",
      patientName: "Priya Sharma",
      bloodType: "O-",
      unitsNeeded: 2,
      urgency: "urgent",
      hospital: "Lilavati Hospital",
      location: "Bandra, Mumbai",
      distance: "1.8 km",
      timePosted: "15 minutes ago",
      deadline: "Within 4 hours",
      contactNumber: "+91 98765 43211",
      medicalCondition: "Post-surgical bleeding",
      additionalNotes: "Universal donor needed urgently for post-operative care.",
      donorRequirements: ["O- blood type only", "Recent health checkup", "No medications"],
      hospitalAddress: "Lilavati Hospital, Bandra West, Mumbai - 400050",
      coordinates: { lat: 19.0544, lng: 72.8311 },
      status: "completed",
      matchScore: 75,
    },
    {
      id: "5",
      patientName: "Ravi Singh",
      bloodType: "B+",
      unitsNeeded: 4,
      urgency: "critical",
      hospital: "Jaslok Hospital",
      location: "Pedder Road, Mumbai",
      distance: "5.1 km",
      timePosted: "2 hours ago",
      deadline: "Expired",
      contactNumber: "+91 98765 43214",
      medicalCondition: "Accident trauma",
      additionalNotes: "Road accident victim, multiple injuries requiring immediate blood transfusion.",
      donorRequirements: ["B+ or O- blood type", "Immediate availability", "Good health status"],
      hospitalAddress: "Jaslok Hospital, Pedder Road, Mumbai - 400026",
      coordinates: { lat: 18.9667, lng: 72.8081 },
      status: "expired",
      matchScore: 88,
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRequests(mockRequests)
      setFilteredRequests(mockRequests)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    filterAndSortRequests()
  }, [requests, searchTerm, statusFilter, urgencyFilter, distanceFilter, sortBy, sortOrder])

  const filterAndSortRequests = () => {
    let filtered = [...requests]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.medicalCondition.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((request) => request.status === statusFilter)
    }

    // Urgency filter
    if (urgencyFilter !== "all") {
      filtered = filtered.filter((request) => request.urgency === urgencyFilter)
    }

    // Distance filter
    if (distanceFilter !== "all") {
      const maxDistance = Number.parseFloat(distanceFilter)
      filtered = filtered.filter((request) => Number.parseFloat(request.distance) <= maxDistance)
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "match":
          aValue = a.matchScore
          bValue = b.matchScore
          break
        case "urgency":
          const urgencyOrder = { critical: 3, urgent: 2, moderate: 1 }
          aValue = urgencyOrder[a.urgency]
          bValue = urgencyOrder[b.urgency]
          break
        case "distance":
          aValue = Number.parseFloat(a.distance)
          bValue = Number.parseFloat(b.distance)
          break
        case "time":
          aValue = new Date(a.timePosted).getTime()
          bValue = new Date(b.timePosted).getTime()
          break
        default:
          aValue = a.patientName
          bValue = b.patientName
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredRequests(filtered)
  }

  const handleViewDetails = (request: DonationRequest) => {
    setSelectedRequest(request)
    setIsDetailsOpen(true)
  }

  const handleAcceptRequest = async (requestId: string) => {
    // TODO: Implement actual accept logic
    setRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: "accepted" as const } : req)))
  }

  const handleDeclineRequest = async (requestId: string) => {
    // TODO: Implement actual decline logic
    setRequests((prev) => prev.filter((req) => req.id !== requestId))
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "urgent":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-purple-100 text-purple-800"
      case "expired":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const refreshRequests = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-20 bg-gray-200 rounded" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Donation Requests</h1>
              <p className="text-gray-600 mt-2">Blood donation requests matched to your profile</p>
            </div>
            <Button onClick={refreshRequests} variant="outline">
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold text-red-600">
                      {requests.filter((r) => r.status === "pending").length}
                    </p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {requests.filter((r) => r.status === "accepted").length}
                    </p>
                    <p className="text-sm text-gray-600">Accepted</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold text-purple-600">
                      {requests.filter((r) => r.status === "completed").length}
                    </p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-2xl font-bold text-teal-600">
                      {Math.round(requests.reduce((acc, r) => acc + r.matchScore, 0) / requests.length)}%
                    </p>
                    <p className="text-sm text-gray-600">Avg Match</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>

              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                </SelectContent>
              </Select>

              <Select value={distanceFilter} onValueChange={setDistanceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Distance</SelectItem>
                  <SelectItem value="2">Within 2 km</SelectItem>
                  <SelectItem value="5">Within 5 km</SelectItem>
                  <SelectItem value="10">Within 10 km</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex space-x-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match">Match Score</SelectItem>
                    <SelectItem value="urgency">Urgency</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="time">Time Posted</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                  {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No requests found</h3>
                <p className="text-gray-500">Try adjusting your filters or check back later</p>
              </CardContent>
            </Card>
          ) : (
            filteredRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <Droplets className="w-5 h-5 text-red-600" />
                          <h3 className="text-lg font-semibold">{request.patientName}</h3>
                        </div>
                        <Badge className={`${getUrgencyColor(request.urgency)} capitalize`}>{request.urgency}</Badge>
                        <Badge className={`${getStatusColor(request.status)} capitalize`}>{request.status}</Badge>
                        <Badge className="bg-red-100 text-red-800 text-lg px-3 py-1">{request.bloodType}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">
                            {request.hospital}, {request.location}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{request.timePosted}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm">Deadline: {request.deadline}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-800 mb-2">
                          <strong>Condition:</strong> {request.medicalCondition}
                        </p>
                        <p className="text-gray-800">
                          <strong>Units needed:</strong> {request.unitsNeeded} units
                        </p>
                        {request.additionalNotes && (
                          <p className="text-gray-600 text-sm mt-2 italic">{request.additionalNotes}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-3 ml-6">
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getMatchScoreColor(request.matchScore)}`}>
                          {request.matchScore}%
                        </div>
                        <div className="text-sm text-gray-500">Match Score</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-teal-600">{request.distance}</div>
                        <div className="text-sm text-gray-500">away</div>
                      </div>

                      <div className="flex space-x-2">
                        {request.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleAcceptRequest(request.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeclineRequest(request.id)}
                              className="border-red-600 text-red-600 hover:bg-red-50"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Decline
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(request)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Blood Request Details Modal */}
        {selectedRequest && (
          <BloodRequestDetails
            isOpen={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
            request={selectedRequest}
          />
        )}
      </div>
    </div>
  )
}
