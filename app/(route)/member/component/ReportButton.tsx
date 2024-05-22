'use client'
import { useUserContext } from "@/app/components/context/user/UserContext";
import { Button } from "@mui/material";

// report button on the top right of the member profile
// you can't see this if you are viewing your profile
export default function ReportButton({
	memberId
}: {
	memberId: string
}) {
	const [user, _] = useUserContext();

	if(user && user._id !== memberId) {
		return (
			<Button
				variant="contained" 
				sx={{height: '30px'}}
			>Report</Button>
		)
	}
}