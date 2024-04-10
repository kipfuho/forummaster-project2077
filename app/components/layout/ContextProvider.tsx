'use client'
import { ThemeProvider } from "@emotion/react";
import { colortheme } from "./theme"
import UserProvider from "./UserContextProvider"
import { useEffect, useState } from "react";
import { UserSessionType } from "../type";
import { getCurrentUserV2 } from "../utils/fetch/v2/user";

export default function ContextProvider({children}: {children: any}) {
	const [user, setUser] = useState<UserSessionType | null | undefined>(undefined);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getCurrentUserV2();
      if(userData) {
				setUser(userData);
			}
    };
    getUserData().catch((e) => console.log(e));

		const intervalId = setInterval(getUserData, 60000);
		return () => clearInterval(intervalId);
  }, []);

	return(
		<ThemeProvider theme={colortheme["dark"]}>
			<UserProvider userContext={[user, setUser]}>
				{children}
			</UserProvider>
		</ThemeProvider>
	)
}