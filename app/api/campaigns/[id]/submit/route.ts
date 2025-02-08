import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { submissionLink } = await request.json()

    console.log(`Received submission for campaign ${params.id}:`, submissionLink)

    // Simulating a successful submission
    return NextResponse.json({ message: "Submission received successfully" })
  } catch (error) {
    console.error("Error submitting campaign content:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

