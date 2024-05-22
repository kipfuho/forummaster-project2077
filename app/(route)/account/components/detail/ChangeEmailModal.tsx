'use client'
import DebounceInput from "@/app/components/ui/DebouceInput";
import { Box, Button, Input, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { FullUserDocument } from "@/app/page";
import { useFormState } from "react-dom";
import { updateEmailV2 } from "@/app/components/utils/fetch/v2/user";
import { SubmitButton } from "@/app/(route)/login/page";

export default function EmailChangeModal({user}: {user: FullUserDocument}) {
	const [open, setOpen] = useState<boolean>(false);
	const [state, formAction] = useFormState(updateEmailV2, null);
	
	useEffect(() => {
		if(state) {
			alert("Updated username");
			setOpen(false);
		}
	}, [state]);

	return(
		<>
			<span className="mr-1">{user.email}</span>
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
							p: 4,
						}}
					>
						<Input
							name='userId'
							type='hidden'
							value={user._id}
						/>
						<Input
							name='email'
							placeholder='Email'
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