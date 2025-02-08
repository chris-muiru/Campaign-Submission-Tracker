import { NextResponse } from "next/server"

async function getCampaigns() {
	return [
		{
			id: "1",
			title: "Summer Fashion",
			status: "Active",
			deadline: "2023-07-31",
		},
		{
			id: "2",
			title: "Tech Gadgets Review",
			status: "Pending",
			deadline: "2023-08-15",
		},
		{
			id: "3",
			title: "Healthy Recipes",
			status: "Completed",
			deadline: "2023-06-30",
		},
	]
}

export async function GET() {
	try {
		const campaigns = await getCampaigns()
		return NextResponse.json(campaigns)
	} catch (error) {
		console.error("Error fetching campaigns:", error)
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		)
	}
}
