import { SubmitButton } from "@/app/(route)/login/page";
import { useUserContext } from "@/app/components/context/user/UserContext";
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { postProfilePostV2 } from "@/app/components/utils/fetch/v2/profilepost";
import { ProfilePostingDocument, UserDocument } from "@/app/page";
import { Box, Button, Input, Snackbar } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

// this component will send request to create a new profileposting to backend
export default function UpdateStatus({
	member,
	pps,
	setPps
}: {
	member: UserDocument,
	pps: ProfilePostingDocument[],
	setPps: Dispatch<SetStateAction<ProfilePostingDocument[]>>
}) {
	const [user, _] = useUserContext();
	const messageInputRef = useRef<HTMLInputElement>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [state, formAction] = useFormState(postProfilePostV2, null);

  useEffect(() => {
    if(state && state.item) {
			setPps([...pps, state.item]);
			setOpen(true);
    }
  }, [state]);

	if(user) {
		return (
			<form action={formAction}>
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
						inputRef={messageInputRef}
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
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					autoHideDuration={4000}
					open={open}
					onClose={() => setOpen(false)}
					message={state && state.message}
				/>
			</form>
		)
	}
}