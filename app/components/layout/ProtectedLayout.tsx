'use client'
import { useUserContext } from "./UserContext";

// Layout for logged in user, users who haven't logged in cannot enter
export default function ProtectedLayout({children}: {children:any}) {
	const [user, _] = useUserContext();

	if(user) {
		return(children);
	}
}