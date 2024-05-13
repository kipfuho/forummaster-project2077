import { SubmitButton } from "@/app/(route)/login/page";
import { useUserContext } from "@/app/components/context/user/UserContext";
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { replyProfilePostV2 } from "@/app/components/utils/fetch/v2/profilepost";
import { ProfilePostingDocument } from "@/app/page";
import { Box, Input } from "@mui/material";

export default function ReplyProfilePost({
	profilePosting
}: {
	profilePosting: ProfilePostingDocument
}) {
	const [user, _] = useUserContext();

	if(user) {
		return (
			<form action={replyProfilePostV2}>
				<Box
					display='flex'
					padding='5px'
				>
					<Box marginRight={1}><UserAvatar user={user} size={36}/></Box>
					<Input
						name="message"
						placeholder="Reply this post"
						sx={{width: 500, marginRight: '10px'}}
					/>
					<Input
						name="ppId"
						value={profilePosting._id}
						type="hidden"
					/>
					<Input
						name="userId"
						value={user._id}
						type="hidden"
					/>
					<SubmitButton>Reply</SubmitButton>
				</Box>
			</form>
		)
	}
}