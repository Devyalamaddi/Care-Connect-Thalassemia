"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  MapPin,
  Clock,
  Phone,
  User,
  Droplets,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Share2,
  Navigation,
} from "lucide-react"

interface BloodRequestDetailsProps {
  isOpen: boolean
  onClose: () => void
  request: {
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
}

export function BloodRequestDetails({ isOpen, onClose, request }: BloodRequestDetailsProps) {
  const [isResponding, setIsResponding] = useState(false)

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

  const handleRespond = async () => {
    setIsResponding(true)

    // TODO: Implement actual response logic
    // await fetch('/api/blood-requests/respond', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     requestId: request.id,
    //     donorId: user.id,
    //     responseType: 'willing_to_donate'
    //   })
    // })

    setTimeout(() => {
      setIsResponding(false)
      onClose()
      // Show success message
    }, 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Urgent Blood Request - ${request.bloodType}`,
        text: `${request.patientName} needs ${request.unitsNeeded} units of ${request.bloodType} blood at ${request.hospital}. Please help if you can donate.`,
        url: window.location.href,
      })
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(
        `Urgent Blood Request: ${request.patientName} needs ${request.unitsNeeded} units of ${request.bloodType} blood at ${request.hospital}. Contact: ${request.contactNumber}`,
      )
    }
  }

  const handleNavigate = () => {
    const url = `https://maps.google.com/maps?q=${request.coordinates.lat},${request.coordinates.lng}`
    window.open(url, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-red-600" />
            <span>Blood Request Details</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <User className="w-5 h-5" />
                <span>Patient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Patient Name</label>
                  <p className="text-lg font-semibold">{request.patientName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Medical Condition</label>
                  <p className="text-lg">{request.medicalCondition}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Blood Type</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-red-100 text-red-800 text-lg px-3 py-1">{request.bloodType}</Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Units Needed</label>
                  <p className="text-lg font-semibold">{request.unitsNeeded} units</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Urgency</label>
                  <Badge className={`${getUrgencyColor(request.urgency)} capitalize`}>{request.urgency}</Badge>
                </div>
              </div>

              {request.additionalNotes && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Additional Notes</label>
                  <p className="text-gray-800 bg-gray-50 p-3 rounded-lg mt-1">{request.additionalNotes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location & Timing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <MapPin className="w-5 h-5" />
                <span>Location & Timing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Hospital</label>
                  <p className="text-lg font-semibold">{request.hospital}</p>
                  <p className="text-sm text-gray-600">{request.hospitalAddress}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Distance</label>
                  <p className="text-lg">{request.distance} away</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Posted</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{request.timePosted}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Deadline</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="w-4 h-4 text-red-500" />
                    <span className="text-red-600 font-medium">{request.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={handleNavigate}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Donor Requirements */}
          {request.donorRequirements && request.donorRequirements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span>Donor Requirements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {request.donorRequirements.map((requirement, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Phone className="w-5 h-5" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Hospital Contact</p>
                  <p className="text-lg font-semibold">{request.contactNumber}</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              onClick={handleRespond}
              disabled={isResponding}
            >
              {isResponding ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Responding...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 mr-2" />I Can Donate
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Close
            </Button>
          </div>

          {/* Emergency Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">Important Notice</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Please ensure you meet all donor eligibility criteria before responding. Contact the hospital directly
                  for screening and donation procedures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
