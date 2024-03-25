'use client'
import { useRouter } from "next/navigation";
import { GetUser } from "./utils/CustomFetch";

export const AuthLayout = async ({children}: {children:any}) => {
	const user = await GetUser();
	const router = useRouter();

	if(user === null) {
		router.back();
	}
	else {
		return(children);
	}
}