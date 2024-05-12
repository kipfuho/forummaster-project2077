import { useUserContext } from "@/app/components/context/user/UserContext";
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { Box, Input } from "@mui/material";

export default function ReplyProfilePost() {
	const [user, _] = useUserContext();

	if(user) {
		return (
			<Box
				display='flex'
				padding='5px'
			>
				<Box marginRight={1}><UserAvatar user={user} size={36}/></Box>
				<Input
					placeholder="Reply this post"
					sx={{width: 500}}
				/>
			</Box>
		)
	}
}