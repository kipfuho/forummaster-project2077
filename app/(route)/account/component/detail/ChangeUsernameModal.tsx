'use client'
import { useEffect, useState } from "react";
import { Box, Button, Input, Modal } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { FullUserDocument } from "@/app/page";
import { SubmitButton } from "@/app/(route)/login/page";
import { updateUsernameV2 } from "@/app/components/utils/fetch/v2/user";
import { useFormState } from "react-dom";

export default function UsernameChangeModal({user}: {user: FullUserDocument}) {
	const [open, setOpen] = useState<boolean>(false);
	const [state, formAction] = useFormState(updateUsernameV2, null);
	
	useEffect(() => {
		if(state) {
			alert("Updated username");
			setOpen(false);
		}
	}, [state]);

	return(
		<>
			<span className="mr-1">{user.username}</span>
			<Button size='small' variant='outlined' onClick={() => setOpen(true)}>Change</Button>
			<Modal
				open={open} 
				onClose={() => setOpen(false)}
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			>
				<form action={formAction}>
					<Box
						sx={{
							width: 400,
						bgcolor: 'background.paper',
							border: '2px solid #000',
							boxShadow: 24,
							p: 4
					}}
					>	<Input
							name="userId"
							type='hidden'
							value={user._id}
						/>
						<Input
							name='username'
							placeholder='Username'
							fullWidth
						/>
						<p className='mt-5 mb-2 text-[0.9rem]'>Type password to confirm change</p>
						<Input
							name='password'
							placeholder='Password'
							fullWidth
						/>
						<SubmitButton>
							<SaveIcon/>
							<span>Save</span>
						</SubmitButton>
					</Box>
				</form>
			</Modal>
		</>
	)
}