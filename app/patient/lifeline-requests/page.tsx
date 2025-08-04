"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BloodRequestDetails } from "@/components/blood-request-details"
import { Search, MapPin, Clock, Droplets, AlertTriangle, Plus, SortAsc, SortDesc, RefreshCw } from "lucide-react"

interface BloodRequest {
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
}

export default function LifelineRequestsPage() {
  const [requests, setRequests] = useState<BloodRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<BloodRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [bloodTypeFilter, setBloodTypeFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [sortBy, setSortBy] = useState("urgency")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isLoading, setIsLoading] = useState(true)

  // Mock data
  const mockRequests: BloodRequest[] = [
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
    },
    {
      id: "2",
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
    },
    {
      id: "3",
      patientName: "Amit Patel",
      bloodType: "A+",
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
    },
    {
      id: "4",
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
    },
    {
      id: "5",
      patientName: "Ravi Singh",
      bloodType: "B-",
      unitsNeeded: 4,
      urgency: "critical",
      hospital: "Jaslok Hospital",
      location: "Pedder Road, Mumbai",
      distance: "5.1 km",
      timePosted: "10 minutes ago",
      deadline: "Within 1 hour",
      contactNumber: "+91 98765 43214",
      medicalCondition: "Accident trauma",
      additionalNotes: "Road accident victim, multiple injuries requiring immediate blood transfusion.",
      donorRequirements: ["B- or O- blood type", "Immediate availability", "Good health status"],
      hospitalAddress: "Jaslok Hospital, Pedder Road, Mumbai - 400026",
      coordinates: { lat: 18.9667, lng: 72.8081 },
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
  }, [requests, searchTerm, bloodTypeFilter, urgencyFilter, locationFilter, sortBy, sortOrder])

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

    // Blood type filter
    if (bloodTypeFilter !== "all") {
      filtered = filtered.filter((request) => request.bloodType === bloodTypeFilter)
    }

    // Urgency filter
    if (urgencyFilter !== "all") {
      filtered = filtered.filter((request) => request.urgency === urgencyFilter)
    }

    // Location filter
    if (locationFilter !== "all") {
      filtered = filtered.filter((request) => request.location.includes(locationFilter))
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
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
        case "bloodType":
          aValue = a.bloodType
          bValue = b.bloodType
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

  const handleViewDetails = (request: BloodRequest) => {
    setSelectedRequest(request)
    setIsDetailsOpen(true)
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

  const refreshRequests = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-6">
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Lifeline Requests</h1>
              <p className="text-gray-600 mt-2">Find and respond to blood donation requests in your area</p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={refreshRequests} variant="outline">
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Request
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold text-red-600">
                      {requests.filter((r) => r.urgency === "critical").length}
                    </p>
                    <p className="text-sm text-gray-600">Critical</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold text-orange-600">
                      {requests.filter((r) => r.urgency === "urgent").length}
                    </p>
                    <p className="text-sm text-gray-600">Urgent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{requests.length}</p>
                    <p className="text-sm text-gray-600">Total Requests</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">{new Set(requests.map((r) => r.location)).size}</p>
                    <p className="text-sm text-gray-600">Locations</p>
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
                    placeholder="Search patients, hospitals, conditions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={bloodTypeFilter} onValueChange={setBloodTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Blood Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blood Types</SelectItem>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
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

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Bandra">Bandra</SelectItem>
                  <SelectItem value="Mahim">Mahim</SelectItem>
                  <SelectItem value="Parel">Parel</SelectItem>
                  <SelectItem value="Pedder Road">Pedder Road</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex space-x-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgency">Urgency</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="time">Time Posted</SelectItem>
                    <SelectItem value="bloodType">Blood Type</SelectItem>
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
                <Droplets className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No requests found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
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
                        <div className="text-lg font-semibold text-teal-600">{request.distance}</div>
                        <div className="text-sm text-gray-500">away</div>
                      </div>
                      <Button onClick={() => handleViewDetails(request)} className="bg-red-600 hover:bg-red-700">
                        View Details
                      </Button>
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
