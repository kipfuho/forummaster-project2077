import BookmarkButton from "./BookmarkButton";
import { Button } from "@mui/material";
import { useUserContext } from "@/app/components/context/user/UserContext";
import { Dispatch, SetStateAction } from "react";

export default function MessageUserSectionHeader({
	messageId,
	messageUserId,
	setEditView
}: {
	messageId: string,
	messageUserId: string,
	setEditView: Dispatch<SetStateAction<boolean>>
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
						onClick={() => setEditView(true)}
					>Edit</Button>
				}
			</span>
		)
	}
}