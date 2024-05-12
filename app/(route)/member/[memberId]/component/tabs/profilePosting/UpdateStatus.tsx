import { SubmitButton } from "@/app/(route)/login/page";
import { useUserContext } from "@/app/components/context/user/UserContext";
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { postProfilePostV2 } from "@/app/components/utils/fetch/v2/profilepost";
import { UserDocument } from "@/app/page";
import { Box, Button, Input } from "@mui/material";
import { grey } from "@mui/material/colors";

// this component will send request to create a new profileposting to backend
export default function UpdateStatus({
	member,
}: {
	member: UserDocument
}) {
	const [user, _] = useUserContext();
	if(user) {
		return (
			<form action={postProfilePostV2}>
				<Box
					display="flex"
					padding="10px"
					marginTop={1}
					borderRadius={1}
					sx={{backgroundColor: grey[700]}}
				>
					<Box><UserAvatar user={member} size={36}/></Box>
					<Input
						name="message"
						placeholder={user._id === member._id ? "Update your status" : 'Post to this member profile'}
						sx={{marginLeft: "10px", marginRight: "10px"}}
						fullWidth
					/>
					<Input
						name="userId"
						value={user._id}
						type="hidden"
					/>
					<Input
						name="userWallId"
						value={member._id}
						type="hidden"
					/>
					<SubmitButton>Post</SubmitButton>
				</Box>
			</form>
		)
	}
}