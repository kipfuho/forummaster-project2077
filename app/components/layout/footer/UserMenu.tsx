'use client'
import PersonIcon from '@mui/icons-material/Person';
import { useUserContext } from '../../context/user/UserContext';

export default function UserMenu() {
	const [user, _] = useUserContext();
  return(
    <>
			{user &&
				<div className="w-[25%] space-y-2">
					<h3>
						<PersonIcon/>
						<span>User Menu</span>
					</h3>
					<div className='flex flex-col gap-1'>
						<a 
							className="text-red-800 hover:underline hover:brightness-[150%]" 
							href="/account/profile"
						>Profile</a>
						<a 
							className="text-red-800 hover:underline hover:brightness-[150%]" 
							href="/account"
						>Account Details</a>
						<a 
							className="text-red-800 hover:underline hover:brightness-[150%]" 
							href="https://news.google.com/"
						>News Feed</a>
						<a 
							className="text-red-800 hover:underline hover:brightness-[150%]" 
							href="/">Log out</a>
					</div>
				</div>
			}
		</>
  )
}