"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Campaign {
  id: string
  title: string
  status: string
  deadline: string
}

export default function CampaignListPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("/api/campaigns")
        if (!response.ok) {
          throw new Error("Failed to fetch campaigns")
        }
        const data = await response.json()
        setCampaigns(data)
      } catch (error) {
        console.error("Error fetching campaigns:", error)
      }
    }

    fetchCampaigns()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <CardTitle>{campaign.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Status: {campaign.status}</p>
              <p>Deadline: {campaign.deadline}</p>
              <Link href={`/campaigns/${campaign.id}`}>
                <Button className="mt-2">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

