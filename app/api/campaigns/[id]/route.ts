import { NextResponse } from "next/server"

async function getCampaignDetails(id: string) {
	const campaigns = {
		"1": {
			id: "1",
			title: "Summer Fashion",
			instructions:
				"Create a TikTok video showcasing your favorite summer outfit.",
			status: "Active",
			deadline: "2023-07-31",
		},
		"2": {
			id: "2",
			title: "Tech Gadgets Review",
			instructions:
				"Make a video reviewing the latest smartphone or gadget.",
			status: "Pending",
			deadline: "2023-08-15",
		},
		"3": {
			id: "3",
			title: "Healthy Recipes",
			instructions: "Share a quick and easy healthy recipe video.",
			status: "Completed",
			deadline: "2023-06-30",
		},
	}
	return campaigns[id as keyof typeof campaigns]
}

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const campaign = await getCampaignDetails(params.id)
		if (!campaign) {
			return NextResponse.json(
				{ error: "Campaign not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(campaign)
	} catch (error) {
		console.error("Error fetching campaign details:", error)
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		)
	}
}
