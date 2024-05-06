'use client'
import { UserDocument } from "@/app/page";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function PostArea({value, index, user}: {value: number, index: number, user: UserDocument}) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
		>
			<Box sx={{bgcolor: grey[700], borderRadius: 1}}>
				<p className="p-2">Statistics of how many threads this user has posted in each forums</p>
			</Box>
		</div>
	)
}