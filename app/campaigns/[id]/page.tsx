"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Campaign {
  id: string
  title: string
  instructions: string
  status: string
  deadline: string
}

export default function CampaignDetailsPage() {
  const { id } = useParams()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [submissionLink, setSubmissionLink] = useState("")

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await fetch(`/api/campaigns/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch campaign details")
        }
        const data = await response.json()
        setCampaign(data)
      } catch (error) {
        console.error("Error fetching campaign details:", error)
      }
    }

    if (id) {
      fetchCampaignDetails()
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/campaigns/${id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ submissionLink }),
      })
      if (!response.ok) {
        throw new Error("Failed to submit campaign content")
      }
      alert("Submission successful!")
      setSubmissionLink("")
    } catch (error) {
      console.error("Error submitting campaign content:", error)
      alert("Failed to submit campaign content")
    }
  }

  if (!campaign) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{campaign.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">Status: {campaign.status}</p>
          <p className="mb-2">Deadline: {campaign.deadline}</p>
          <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
          <p className="mb-4">{campaign.instructions}</p>
          <form onSubmit={handleSubmit}>
            <Input
              type="url"
              placeholder="Enter submission link (e.g., TikTok post URL)"
              value={submissionLink}
              onChange={(e) => setSubmissionLink(e.target.value)}
              required
              className="mb-2"
            />
            <Button type="submit">Submit Content</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

