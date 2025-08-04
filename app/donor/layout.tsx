import type React from "react"
import { DonorNavigation } from "@/components/donor-navigation"

export default function DonorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-white">
      <DonorNavigation />
      <main className="pt-20">{children}</main>
    </div>
  )
}
