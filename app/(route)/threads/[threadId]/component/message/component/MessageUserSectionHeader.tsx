import { MessageDocument, UserDocument } from "@/app/page";
import BookmarkButton from "./BookmarkButton";
import { Button } from "@mui/material";
import { useUserContext } from "@/app/components/context/user/UserContext";

export default function MessageUserSectionHeader({
	messageId,
	messageUserId
}: {
	messageId: string,
	messageUserId: string
}) {
	const [user, _] = useUserContext();
	if(user) {
		return (
			<span>
				<BookmarkButton userId={user._id} messageId={messageId}/>
				{user._id === messageUserId &&
					<Button
						variant="outlined"
						sx={{height: '25px'}}
					>Edit</Button>
				}
			</span>
		)
	}
}