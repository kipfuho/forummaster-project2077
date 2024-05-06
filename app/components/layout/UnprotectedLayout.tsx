'use client'
import { useRouter } from "next/navigation";
import { useUserContext } from "../context/user/UserContext";

// Layout for users who haven't logged in, who have logged in cannot enter
export default function UnprotectedLayout({children}: {children:any}) {
	const [user, _] = useUserContext();
	const router = useRouter();

	if(user) {
		router.push("/");
	} else {
		return(children);
	}
}