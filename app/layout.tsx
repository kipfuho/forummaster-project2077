'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import UserProvider from "./components/layout/UserContextProvider";
import { colortheme } from "./components/layout/theme";
import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { UserType } from "./components/type";
import { GetUser } from "./components/utils/fetch/user";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // fetch user to use as context 
  const [user, setUser] = useState<UserType | null | undefined>(undefined);
  useEffect(() => {
    const getUser = async () => {
      const userData = await GetUser();
      setUser(userData);
    }

    getUser().catch((e) => console.log(e));
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={colortheme["dark"]}>
          <UserProvider userContext={[user, setUser]}>
            <NavBar/>
              <main>{children}</main>
            <Footer/>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
