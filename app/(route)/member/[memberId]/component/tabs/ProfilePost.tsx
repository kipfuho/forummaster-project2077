'use client'
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { UserDocument } from "@/app/page";
import { Box, Button, Input } from "@mui/material";

export default function ProfilePost({value, index, user}: {value: number, index: number, user: UserDocument}) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
		>
			<Box display="flex" padding="10px">
				<Box><UserAvatar user={user} size={36}/></Box>
				<Input
					placeholder="Update your status"
					sx={{marginLeft: "10px", marginRight: "10px"}}
					fullWidth
				/>
				<Button variant="contained">Post</Button>
			</Box>
		</div>
	)
}