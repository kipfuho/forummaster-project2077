'use client'
import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import DebounceInput from "@/app/components/ui/DebouceInput";
import SaveIcon from '@mui/icons-material/Save';
import { FullUserDocument } from "@/app/page";

export default function UsernameChangeModal({user}: {user: FullUserDocument}) {
	const [open, setOpen] = useState<boolean>(false);
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const saveUsernameClick = async () => {
	}

	return(
		<>
			<span className="mr-1">{user.username}</span>
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
						p: 4
					}}
				>
					<DebounceInput
						handleDebounce={(value) => setUsername(value)}
						debounceTimeout={1000}
						placeholder='Username'
						fullWidth
					/>
					<p className='mt-5 mb-2 text-[0.9rem]'>Type password to confirm change</p>
					<DebounceInput
						handleDebounce={(value) => setPassword(value)}
						debounceTimeout={1000}
						placeholder='Password'
						fullWidth
					/>
					<Button sx={{marginTop: 2}} size='small' variant='outlined' onClick={saveUsernameClick}>
						<SaveIcon/>
						<span>Save</span>
					</Button>
				</Box>
			</Modal>
		</>
	)
}