'use client'
import Loading from '@/app/components/layout/Loading';
import SaveIcon from '@mui/icons-material/Save';
import { Box, IconButton, Input } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import UsernameChangeModal from './ChangeUsernameModal';
import EmailChangeModal from './ChangeEmailModal';
import { FullUserDocument } from '@/app/page';
import { getFullUserV2 } from '@/app/components/utils/fetch/v2/user';
import { SubmitButton } from '@/app/(route)/login/page';
import { UserAvatar } from '@/app/components/ui/Avatar/UserAvatar';
import { uploadImageV2 } from '@/app/components/utils/fetch/v2/upload';

function Avatar({user, ref}: {user: FullUserDocument, ref?: any}) {
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
		const imageUrl = await uploadImageV2(files[0]);
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
				{avatarUrl ? 
					<Image 
						className='max-w-[100px] max-h-[100px] rounded-[10rem]'
						src={avatarUrl} 
						alt='img' 
						width={100} 
						height={100}
					/> :
					<UserAvatar size={100} user={user}/>
				}
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
	const avatarRef = useRef(null);
	const [user, setUser] = useState<FullUserDocument | null>(null);
	const [done, setDone] = useState(false);

	useEffect(() => {
		const getSetting = async () => {
			const user = await getFullUserV2();
			console.log(user);
			setUser(user);
			setDone(true);
		}

		getSetting().catch((e) => console.log(e));
	}, []);

	return(
		<>{done ?
			<>{user ?
				<div className='ml-10 w-full'>
					<h2>Account details</h2>
					<div className='rounded bg-gray-700 w-full'>
						<table className='w-full'>
							<tbody>
								<tr>
									<td className='px-2 py-3 text-right border-r-[1px] w-[45%]'>User name</td>
									<td className='px-2 py-3'>
										<UsernameChangeModal user={user}/>
									</td>
								</tr>
								<tr>
									<td className='px-2 py-3 text-right border-r-[1px]'>Email:</td>
									<td className='px-2 py-3'>
										<EmailChangeModal user={user}/>
									</td>
								</tr>
								<tr>
									<td className='px-2 py-3 text-right border-r-[1px]'>Avatar:</td>
									<td className='px-2 py-3'>
										<Avatar user={user} ref={avatarRef}/>
									</td>
								</tr>
								<tr>
									<td className='px-2 py-3 text-right border-r-[1px]'>Date of birth:</td>
									<td className='px-2 py-3'>
										<Input
											name="dob_day"
											type='number'
											placeholder='Day'
											sx={{width: "80px", marginRight: "20px"}}
										/>
										<Input
											name="dob_month"
											type='number'
											placeholder='Month'
											sx={{width: "80px", marginRight: "20px"}}
											/>
										<Input
											name="dob_year"
											type='number'
											placeholder='Year'
											sx={{width: "130px"}}
											/>
									</td>
								</tr>
								<tr>
									<td className='px-2 py-3 text-right border-r-[1px]'>Location:</td>
									<td className='px-2 py-3'>
										<Input
											name="location"
											fullWidth
										/>
									</td>
								</tr>
								<tr>
									<td className='px-2 py-3 text-right border-r-[1px]'>About you: </td>
									<td className='px-2 py-3'>
										<Input
											name='about'
											fullWidth
										/>
									</td>
								</tr>
							</tbody>
						</table>
						<div className='flex justify-center p-2 border-t-[1px]'>
							<SubmitButton>
								<SaveIcon/>
								<span>Save</span>
							</SubmitButton>
						</div>
					</div>
				</div> :
				<p>Error!</p>
			}</> :
			<Loading/>
		}</>
	)
}