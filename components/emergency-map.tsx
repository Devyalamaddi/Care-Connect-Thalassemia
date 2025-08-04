"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Car, Clock, Phone, User, Baby, Heart, Zap } from "lucide-react"

interface LocationPoint {
  id: string
  type: "patient" | "mother" | "child" | "donor" | "hospital" | "transport"
  name: string
  coordinates: { lat: number; lng: number }
  status: string
  eta?: string
  distance?: string
  contact?: string
  additionalInfo?: string
}

export function EmergencyMap() {
  const [selectedLocation, setSelectedLocation] = useState<LocationPoint | null>(null)
  const [transportOptions, setTransportOptions] = useState([
    {
      id: "uber1",
      service: "Uber",
      type: "UberGO",
      eta: "3 min",
      price: "₹85",
      driver: "Rajesh Kumar",
      rating: 4.8,
      vehicleNumber: "MH 01 AB 1234",
    },
    {
      id: "rapido1",
      service: "Rapido",
      type: "Bike",
      eta: "2 min",
      price: "₹45",
      driver: "Amit Singh",
      rating: 4.6,
      vehicleNumber: "MH 01 CD 5678",
    },
    {
      id: "ola1",
      service: "Ola",
      type: "Mini",
      eta: "4 min",
      price: "₹78",
      driver: "Suresh Patel",
      rating: 4.7,
      vehicleNumber: "MH 01 EF 9012",
    },
  ])

  // Mock location data
  const locations: LocationPoint[] = [
    {
      id: "patient",
      type: "patient",
      name: "Emergency Patient",
      coordinates: { lat: 19.076, lng: 72.8777 },
      status: "Critical - Needs B+ Blood",
      contact: "+91 98765 43210",
    },
    {
      id: "mother",
      type: "mother",
      name: "Patient's Mother",
      coordinates: { lat: 19.082, lng: 72.885 },
      status: "En route to hospital",
      distance: "2.3 km",
      eta: "8 min",
      contact: "+91 98765 43211",
    },
    {
      id: "child",
      type: "child",
      name: "Patient's Child",
      coordinates: { lat: 19.069, lng: 72.872 },
      status: "At school - Being picked up",
      distance: "1.8 km",
      eta: "12 min",
      contact: "+91 98765 43212",
    },
    {
      id: "donor1",
      type: "donor",
      name: "Priya Sharma (B+)",
      coordinates: { lat: 19.08, lng: 72.88 },
      status: "Available - Confirmed",
      distance: "1.5 km",
      eta: "6 min",
      contact: "+91 98765 43213",
    },
    {
      id: "donor2",
      type: "donor",
      name: "Rahul Gupta (B+)",
      coordinates: { lat: 19.072, lng: 72.875 },
      status: "Available - Confirmed",
      distance: "1.2 km",
      eta: "5 min",
      contact: "+91 98765 43214",
    },
    {
      id: "hospital",
      type: "hospital",
      name: "Apollo Hospital",
      coordinates: { lat: 19.076, lng: 72.8777 },
      status: "Emergency team ready",
      additionalInfo: "Blood bank has 3 units B+ available",
    },
  ]

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "patient":
        return <Heart className="w-4 h-4 text-red-600" />
      case "mother":
        return <User className="w-4 h-4 text-purple-600" />
      case "child":
        return <Baby className="w-4 h-4 text-blue-600" />
      case "donor":
        return <Zap className="w-4 h-4 text-green-600" />
      case "hospital":
        return <MapPin className="w-4 h-4 text-orange-600" />
      default:
        return <MapPin className="w-4 h-4 text-gray-600" />
    }
  }

  const getLocationColor = (type: string) => {
    switch (type) {
      case "patient":
        return "border-red-500 bg-red-50"
      case "mother":
        return "border-purple-500 bg-purple-50"
      case "child":
        return "border-blue-500 bg-blue-50"
      case "donor":
        return "border-green-500 bg-green-50"
      case "hospital":
        return "border-orange-500 bg-orange-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  const handleBookTransport = (transportId: string) => {
    // TODO: Implement actual booking logic
    alert(`Booking ${transportOptions.find((t) => t.id === transportId)?.service}...`)
  }

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-teal-600" />
            <span>Live Emergency Map</span>
            <Badge className="bg-red-100 text-red-800 animate-pulse">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Map Placeholder - In real implementation, use Google Maps or similar */}
          <div className="relative w-full h-80 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
            {/* Map background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-6 h-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-gray-300" />
                ))}
              </div>
            </div>

            {/* Location markers */}
            {locations.map((location, index) => (
              <div
                key={location.id}
                className={`absolute w-8 h-8 rounded-full border-2 ${getLocationColor(location.type)} cursor-pointer transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + (index % 3) * 20}%`,
                }}
                onClick={() => setSelectedLocation(location)}
              >
                {getLocationIcon(location.type)}
              </div>
            ))}

            {/* Route lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <pattern id="dashed" patternUnits="userSpaceOnUse" width="8" height="8">
                  <path d="M0,4 L8,4" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />
                </pattern>
              </defs>
              {/* Example route lines */}
              <line x1="20%" y1="30%" x2="35%" y2="50%" stroke="url(#dashed)" strokeWidth="2" />
              <line x1="50%" y1="70%" x2="35%" y2="50%" stroke="url(#dashed)" strokeWidth="2" />
            </svg>

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
              <div className="text-xs font-semibold text-gray-700">Legend</div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs">
                  <Heart className="w-3 h-3 text-red-600" />
                  <span>Patient</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <User className="w-3 h-3 text-purple-600" />
                  <span>Mother</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <Baby className="w-3 h-3 text-blue-600" />
                  <span>Child</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <Zap className="w-3 h-3 text-green-600" />
                  <span>Donor</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <MapPin className="w-3 h-3 text-orange-600" />
                  <span>Hospital</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Location Details */}
          {selectedLocation && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getLocationIcon(selectedLocation.type)}
                  <h4 className="font-semibold">{selectedLocation.name}</h4>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedLocation(null)}>
                  <Navigation className="w-4 h-4 mr-1" />
                  Navigate
                </Button>
              </div>
              <p className="text-sm text-gray-600 mb-2">{selectedLocation.status}</p>
              {selectedLocation.eta && <p className="text-sm text-gray-600">ETA: {selectedLocation.eta}</p>}
              {selectedLocation.contact && (
                <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                  <Phone className="w-4 h-4 mr-1" />
                  Call {selectedLocation.contact}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transportation Options */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Car className="w-5 h-5 text-teal-600" />
            <span>Available Transportation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transportOptions.map((transport) => (
              <div key={transport.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Car className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{transport.service}</span>
                      <Badge variant="outline" className="text-xs">
                        {transport.type}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {transport.driver} • ⭐ {transport.rating}
                    </div>
                    <div className="text-xs text-gray-500">{transport.vehicleNumber}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-green-600">{transport.eta}</div>
                      <div className="text-xs text-gray-500">ETA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold">{transport.price}</div>
                      <div className="text-xs text-gray-500">Fare</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={() => handleBookTransport(transport.id)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Transport */}
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-red-800">Emergency Ambulance</h4>
                <p className="text-sm text-red-600">Free emergency transport with medical support</p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                <Phone className="w-4 h-4 mr-2" />
                Call 108
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Updates */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-teal-600" />
            <span>Live Updates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse" />
              <div>
                <p className="text-sm text-gray-800">Priya Sharma is 2 minutes away from hospital</p>
                <p className="text-xs text-gray-500">Just now</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <p className="text-sm text-gray-800">Patient's mother has reached the hospital</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
              <div>
                <p className="text-sm text-gray-800">Blood bank confirmed B+ availability</p>
                <p className="text-xs text-gray-500">3 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
              <div>
                <p className="text-sm text-gray-800">Emergency activated - All contacts notified</p>
                <p className="text-xs text-gray-500">5 minutes ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
