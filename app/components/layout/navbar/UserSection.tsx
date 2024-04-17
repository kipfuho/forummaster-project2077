'use client'
import { Button, Menu, MenuItem } from "@mui/material";
import { useUserContext } from "../UserContext";
import { UserAvatar } from "../../ui/Avatar/UserAvatar";
import Link from "next/link";
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from "react";

// user section on navigation bar
export default function UserSection() {
  const [user, setUser] = useUserContext();

  if(user) {
		const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
		const open = Boolean(anchorEl);

		const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
			setAnchorEl(event.currentTarget);
		};

		const handleClose = () => {
			setAnchorEl(null);
		};

		const logOutClick = async () => {
			const result = await fetch("https://localhost:3001/v2/logout", {
				method: "GET",
				credentials: "include"
			});

			if(result.ok) {
				console.log("user session ended!");
				setAnchorEl(null);
				setUser(null);
			} else {
				console.log(result);
				setAnchorEl(null);
				setUser(null);
			}
		}

		return(
			<div className="flex space-x-4">
				<button className="flex items-center space-x-2" onClick={handleClick}>
					<UserAvatar user={user} size={36}/>
					<span>{user.username}</span>
				</button>
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
				>
					<Link href="/account/profile">
						<MenuItem onClick={handleClose}>Profile</MenuItem>
					</Link>
					<Link href="/account">
						<MenuItem onClick={handleClose}>My account</MenuItem>
					</Link>
					<MenuItem onClick={logOutClick}>Logout</MenuItem>
				</Menu>
				<div className="flex items-center space-x-4">
					<button className="text-gray-400 hover:text-gray-300">
						<MailIcon/>
					</button>
					<button className="text-gray-400 hover:text-gray-300">
						<NotificationsIcon/>
					</button>
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