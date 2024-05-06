'use client'
import { Button } from "@mui/material";
import { useUserContext } from "../../context/user/UserContext";
import Link from "next/link";
import dynamic from "next/dynamic";
import Loading from "../Loading";
import { useEffect } from "react";

// lazy loading
const UserMenu = dynamic(() => import('./lazy/UserMenu'));
const ConversationMenu = dynamic(() => import('./lazy/ConversationMenu'));
const AlertMenu = dynamic(() => import('./lazy/AlertMenu'));

// user section on navigation bar
export default function UserSection() {
  const [user, setUser] = useUserContext();

  if(user === undefined) {
		return (
			<Loading/>
		)
	} else {
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
				<div className="flex justify-center items-center space-x-2">
					<Link href="/login">
						<Button
							variant="outlined"
							sx={{height: 30}}
						>Login</Button>
					</Link>
					<Link href="/register">
						<Button
							variant="outlined"
							sx={{height: 30}}
						>Register</Button>
					</Link>
				</div>
			)
		}
	}
}