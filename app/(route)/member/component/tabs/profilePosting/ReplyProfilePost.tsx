import { SubmitButton } from "@/app/(route)/login/page";
import { useUserContext } from "@/app/components/context/user/UserContext";
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { replyProfilePostV2 } from "@/app/components/utils/fetch/v2/profilepost";
import { ProfilePostingDocument } from "@/app/page";
import { Box, Input, Snackbar } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

export default function ReplyProfilePost({
	profilePosting,
	setPp
}: {
	profilePosting: ProfilePostingDocument,
	setPp: Dispatch<SetStateAction<ProfilePostingDocument>>
}) {
	const [user, _] = useUserContext();

	const messageInputRef = useRef<HTMLInputElement>();
	const [open, setOpen] = useState<boolean>(false);
	const [state, formAction] = useFormState(replyProfilePostV2, null);

  useEffect(() => {
    if(state && state.item) {
			if(messageInputRef.current) {
				messageInputRef.current.value = '';
			}
      setPp(state.item);
    }
  }, [state]);

	if(user) {
		return (
			<form action={formAction}>
				<Box
					display='flex'
					padding='5px'
				>
					<Box marginRight={1}><UserAvatar user={user} size={36}/></Box>
					<Input
						name="message"
						placeholder="Reply this post"
						sx={{width: 500, marginRight: '10px'}}
						inputRef={messageInputRef}
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