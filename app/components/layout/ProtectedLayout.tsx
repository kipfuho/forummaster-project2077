'use client'
import { useRouter } from "next/navigation";
import { useUserContext } from "./UserContext";

// Layout for logged in user, users who haven't logged in cannot enter
export default function ProtectedLayout({children}: {children:any}) {
	const [user, _] = useUserContext();
	console.log(user);
	const router = useRouter();

	if(!user) {
		router.back();
	} else {
		return(children);
	}
}