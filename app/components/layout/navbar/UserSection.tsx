'use client'
import { Box, Button, Divider, Menu, MenuItem } from "@mui/material";
import { useUserContext } from "../UserContext";
import { UserAvatar } from "../../ui/Avatar/UserAvatar";
import Link from "next/link";
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { logoutV2 } from "../../utils/fetch/v2/user";
import { grey } from "@mui/material/colors";
import { getRoleName } from "../../utils/HelperFunction";
import { AlertDocument, UserDocument } from "@/app/page";
import { getAlertsV2 } from "../../utils/fetch/v2/alert";

function UserMenu({user, setUser}: {user: UserDocument, setUser: Dispatch<SetStateAction<UserDocument | null | undefined>>}) {
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
			<button className="flex items-center space-x-2" onClick={handleClick}>
				<UserAvatar user={user} size={30}/>
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

function ConversationMenu() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

	return (
		<>
			<button className="text-gray-400 hover:text-gray-300" onClick={handleClick}>
				<MailIcon/>
			</button>
			<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'disablePadding': true
        }}
      >
        <Box sx={{width: 300, bgcolor: grey[900], paddingY: 1}}>
				<p className="px-4">Conversations</p>
					<Divider sx={{borderColor: grey[500], marginY: 1}}/>
					<div className="px-4 mb-2 text-[0.9rem]">You don't have any conversations</div>
					<Divider sx={{borderColor: grey[500], marginBottom: 1}}/>
					<Link className="text-red-500 px-4 hover:underline" href='/conversations'>Show all</Link>
				</Box>
      </Menu>
		</>
	)
}

function AlertMenu({user}: {user: UserDocument}) {
	// States and handler for Menu
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

	// Get alerts from server
	const [alerts, setAlerts] = useState<AlertDocument[] | null>(null);

	useEffect(() => {
		const getAlerts = async () => {
			const alerts = await getAlertsV2(user._id, "", 5);
			if(alerts) {
				setAlerts(alerts);
			}
		}

		getAlerts().catch((e) => console.log(e));
	}, []);

	return (
		<>
			<button
				className="text-gray-400 hover:text-gray-300"
				onClick={handleClick}
			>
				<NotificationsIcon/>
			</button>
			<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'disablePadding': true
        }}
      >
        <Box sx={{width: 300, bgcolor: grey[900], paddingY: 1}}>
					<p className="px-4">Alerts</p>
					<Divider sx={{borderColor: grey[500], marginY: 1}}/>
					{alerts ?
							<>
								{alerts.map((alert, index) => (
									<Link 
										className="hover:underline"
										href={`/account/alerts?alertId=${alert._id}`}
										onClick={handleClose}
									>
										<MenuItem dense>{index + 1 + ". " + alert.detail}</MenuItem>
									</Link>
								))}
							</> :
							<p className="px-4 text-[0.9rem]">You don't have any alerts</p>
						}
					<Divider sx={{borderColor: grey[500], marginY: 1}}/>
					<Link className="text-red-500 px-4 hover:underline" href='/account/alerts'>Show all</Link>
				</Box>
      </Menu>
		</>
	)
}

// user section on navigation bar
export default function UserSection() {
  const [user, setUser] = useUserContext();

  if(user) {
		return(
			<div className="flex space-x-4">
				<UserMenu user={user} setUser={setUser}/>
				<div className="flex items-center space-x-4">
					<ConversationMenu/>
					<AlertMenu user={user}/>
				</div>
			</div>
		)
	} else {
		return(
			<div className="flex justify-center">
				<Link href="/login">
					<Button variant="outlined">Login</Button>
				</Link>
				<Link href="/register">
					<Button variant="outlined">Register</Button>
				</Link>
			</div>
		)
	}
}