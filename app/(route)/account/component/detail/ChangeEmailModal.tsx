'use client'
import DebounceInput from "@/app/components/ui/DebouceInput";
import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { FullUserDocument } from "@/app/page";

export default function EmailChangeModal({user}: {user: FullUserDocument}) {
	const [open, setOpen] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');


	const saveEmailClick = async () => {
		
	}

	return(
		<>
			<span className="mr-1">{user.email}</span>
			<Button size='small' variant='outlined' onClick={() => setOpen(true)}>Change</Button>
			<Modal 
				open={open} 
				onClose={() => setOpen(false)}
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			>
				<Box 
					sx={{
						width: 400,
						bgcolor: 'background.paper',
						border: '2px solid #000',
						boxShadow: 24,
						p: 4,
					}}
				>
					<DebounceInput
						handleDebounce={(value) => setEmail(value)}
						debounceTimeout={1000}
						placeholder='Email'
						fullWidth
					/>
					<p className='mt-5 mb-2 text-[0.9rem]'>Type password to confirm change</p>
					<DebounceInput
						handleDebounce={(value) => setPassword(value)}
						debounceTimeout={1000}
						placeholder='Password'
						fullWidth
					/>
					<Button sx={{marginTop: 2}} size='small' variant='outlined' onClick={saveEmailClick}>
						<SaveIcon/>
						<span>Save</span>
					</Button>
				</Box>
			</Modal>
		</>
	)
}