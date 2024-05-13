'use client'
import { ThemeProvider } from "@emotion/react";
import { colortheme } from "./theme"
import UserProvider from "./user/UserContextProvider"
import { useEffect, useState } from "react";
import { getCurrentUserV2 } from "../utils/fetch/v2/user";
import { UserDocument } from "@/app/page";

export default function ContextProvider({children}: {children: any}) {
	const [user, setUser] = useState<UserDocument | null | undefined>();

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getCurrentUserV2();
      if(userData) {
				setUser(userData);
			} else {
				setUser(null);
			}
    };
    getUserData().catch((e) => console.log(e));

		const intervalId = setInterval(getUserData, 60000);
		return () => clearInterval(intervalId);
  }, [setUser]);

	return(
		<ThemeProvider theme={colortheme["dark"]}>
			<UserProvider userContext={[user, setUser]}>
				{children}
			</UserProvider>
		</ThemeProvider>
	)
}