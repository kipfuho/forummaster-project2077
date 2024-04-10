'use client'
import Loading from '@/app/components/layout/Loading';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, IconButton, Modal } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Image from 'next/image';
import DebounceInput from '@/app/components/ui/DebouceInput';
import { uploadImage } from '@/app/components/utils/fetch/v1/upload';
import { getUserProfile } from '@/app/components/utils/fetch/v1/user';

function UsernameChangeModal({user}: {user:any}) {
	const [open, setOpen] = useState<boolean>(false);
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const saveUsernameClick = async () => {
	}

	return(
		<>
			<span>{user.username}</span>
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

function EmailChangeModal({user}: {user:any}) {
	const [open, setOpen] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');


	const saveEmailClick = async () => {
		
	}

	return(
		<>
			<span>{user.email}</span>
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

function Avatar({user, ref}: {user: any, ref?: any}) {
	const fileInput = useRef<HTMLInputElement | null>(null);
	const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatar);

	if(ref) {
		ref.current.avatarUrl = avatarUrl;
	}

	const handleAvatarClick = async (files: FileList) => {
		if(files.length > 1) {
			alert("Choose exactly 1 image");
			return;
		}
		if(files[0].size > 5*1024*1024) { // 5MB max
			alert("Choose image less than 5MB");
			return;
		}
		// upload avatar to server and take url
		const imageUrl = await uploadImage(files[0]);
		if(imageUrl) {
			setAvatarUrl(imageUrl.link);
		} else {
			alert("upload failed");
		}
	}

	return(
		<>
			<IconButton 
				sx={{padding: 0}} 
				onClick={() => fileInput.current?.click()}
			>
				<Image className='block rounded-[10rem] max-w-[100px] max-h-[100px]' src={avatarUrl ? avatarUrl : "/arknights.jpg"} alt='img' width={100} height={100}/>
			</IconButton>
			<p className='text-[0.9rem] text-gray-400'>Click the image to change your avatar.</p>
			<input
				ref={fileInput}
				type="file"
				accept="image/*"
				multiple
				onChange={async (event) => {
					if(event.target.files) {
						await handleAvatarClick(event.target.files);
					}
				}}
				style={{ display: "none" }} // Hide this input
			/>
		</>
	)
}

export default function Detail() {
	const [userSetting, setUserSetting] = useState<any>(null);
	const [done, setDone] = useState<boolean>(false);
	const avatarRef = useRef(null);
	const [dob, setDob] = useState<Date>();
	const [location, setLocation] = useState<string>();
	const [about, setAbout] = useState<string>();

	const saveClick = async () => {
		
	};

	useEffect(() => {
		const getUsertSetting = async () => {
			const fetchData = await getUserProfile();
			setUserSetting(fetchData);
			setDone(true);
		};

		getUsertSetting().catch((e) => console.log(e));
	}, []);

	return(
		<>
			{done ?
				<>
					{userSetting !== null ?
						<div className='ml-10 w-full'>
							<h2>Account details</h2>
							<div className='rounded bg-gray-700 w-full'>
								<table className='w-full'>
									<tbody>
										<tr>
											<td className='px-2 py-3 text-right border-r-[1px] w-[45%]'>User name</td>
											<td className='px-2 py-3'>
												<UsernameChangeModal user={userSetting}/>
											</td>
										</tr>
										<tr>
											<td className='px-2 py-3 text-right border-r-[1px]'>Email:</td>
											<td className='px-2 py-3'>
												<EmailChangeModal user={userSetting}/>
											</td>
										</tr>
										<tr>
											<td className='px-2 py-3 text-right border-r-[1px]'>Avatar:</td>
											<td className='px-2 py-3'>
												<Avatar user={userSetting} ref={avatarRef}/>
											</td>
										</tr>
										<tr>
											<td className='px-2 py-3 text-right border-r-[1px]'>Date of birth:</td>
											<td className='px-2 py-3'>
												<LocalizationProvider dateAdapter={AdapterDayjs}><DatePicker defaultValue={userSetting.date_of_birth} onChange={(date) => setDob(date)}/></LocalizationProvider>
											</td>
										</tr>
										<tr>
											<td className='px-2 py-3 text-right border-r-[1px]'>Location:</td>
											<td className='px-2 py-3'>
												<DebounceInput
													handleDebounce={(value) => setLocation(value)}
													debounceTimeout={1000}
													fullWidth
												/>
											</td>
										</tr>
										<tr>
											<td className='px-2 py-3 text-right border-r-[1px]'>About you: </td>
											<td className='px-2 py-3'>
												<DebounceInput
													handleDebounce={(value) => setAbout(value)}
													debounceTimeout={1000}
													fullWidth
												/>
											</td>
										</tr>
									</tbody>
								</table>
								<div className='flex justify-center p-2 border-t-[1px]'>
									<Button variant='outlined' onClick={saveClick}>
										<SaveIcon/>
										<span>Save</span>
									</Button>
								</div>
							</div>
						</div> : 
						<div>Error</div>
					}
				</> :
				<Loading/>
			}
		</>
	)
}