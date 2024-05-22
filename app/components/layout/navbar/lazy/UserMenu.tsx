import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { UserAvatarNoLink } from "@/app/components/ui/Avatar/UserAvatarNoLink";
import { logoutV2 } from "@/app/components/utils/fetch/v2/user";
import { getRoleName } from "@/app/components/utils/HelperFunction";
import { UserDocument } from "@/app/page";
import { Box, Divider, Menu, MenuItem } from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

export default function UserMenu({user, setUser}: {user: UserDocument, setUser: Dispatch<SetStateAction<UserDocument | null | undefined>>}) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logOutClick = async () => {
		const result = await logoutV2();

		if(result) {
			console.log("user session ended!");
			setAnchorEl(null);
			setUser(null);
		} else {
			setAnchorEl(null);
			setUser(null);
		}
	}

	return (
		<>
			<button
				className="flex items-center space-x-2"
				type="button"
				title="Open menu"
				onClick={handleClick}
			>
				<UserAvatarNoLink user={user} size={30}/>
				<span className="text-[0.9rem]">{user.username}</span>
			</button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'disablePadding': true
				}}
			>
				<Box width={400} bgcolor={grey[900]} paddingTop={2}>
					<div className="flex px-4">
						<UserAvatar user={user} size={50}/>
						<div className="ml-3">
							<Link className="text-red-600 font-semibold hover:underline" href={`/member/${user._id}`}>{user.username}</Link>
							<p>{getRoleName(user.class)}</p>
						</div>
					</div>
					<div className="text-gray-400 text-[0.9rem] px-4 mb-2">
						<div className="flex justify-between">
							<span>Messages:</span>
							<span>{user.messages}</span>
						</div>
						<div className="flex justify-between">
							<span>Reaction score:</span>
							<span>{user.likes*5}</span>
						</div>
					</div>
					<Divider sx={{borderColor: grey[500]}}/>
					<Box display='flex'>
						<Box sx={{width: '50%'}}>
							<Link href={`/search/member?userId=${user._id}`}>
								<MenuItem
									onClick={handleClose}
									dense
								>Your content</MenuItem>
							</Link>
							<Link href="/account/reactions">
								<MenuItem
									onClick={handleClose}
									dense
								>Reactions received</MenuItem>
							</Link>
							<Link href="/account/reactions-given">
								<MenuItem
									onClick={handleClose}
									dense
								>Reactions given</MenuItem>
							</Link>
						</Box>
						<Box sx={{width: '50%'}}>
							<Link href="/account/my-ratings">
								<MenuItem
									onClick={handleClose}
									dense
								>My Ratings</MenuItem>
							</Link>
							<Link href="/account/alerts">
								<MenuItem
									onClick={handleClose}
									dense
								>Alerts</MenuItem>
							</Link>
						</Box>
					</Box>
					<Divider sx={{borderColor: grey[500]}}/>
					<Box display='flex'>
						<Box sx={{width: '50%'}}>
							<Link href="/account">
								<MenuItem
									onClick={handleClose}
									dense
								>Account details</MenuItem>
							</Link>
							<Link href="/account/security">
								<MenuItem
									onClick={handleClose}
									dense
								>Password and security</MenuItem>
							</Link>
						</Box>
						<Box sx={{width: '50%'}}>
							<Link href="/account/privacy">
								<MenuItem
									onClick={handleClose}
									dense
								>Privacy</MenuItem>
							</Link>
							<Link href="/account/following">
								<MenuItem
									onClick={handleClose}
									dense
								>Following</MenuItem>
							</Link>
						</Box>
					</Box>
					<Divider sx={{borderColor: grey[500]}}/>
					<MenuItem
						onClick={logOutClick}
						dense
					>Logout</MenuItem>
				</Box>
			</Menu>
		</>
	)
}