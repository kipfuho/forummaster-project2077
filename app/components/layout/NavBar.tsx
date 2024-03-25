'use client'
import { FC, Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./layout.module.css"
import SearchIcon from '@mui/icons-material/Search';
import Loading from "./Loading";
import { UserAvatar } from "../ui/Avatar/UserAvatar";
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { GetUser } from "../utils/CustomFetch";

// Button!
const Button: FC<{item: {name: string, path: string}}> = ({ item }) => (
  <Link className="border rounded px-3 py-1 mx-1 hover:bg-blue-500 bg-transparent" href={item.path}>{item.name}</Link>
);

// Navbar components
// consist of the header and navigation bar
export default function NavBar(){
  const [user, setUser] = useState<{username: string, email: string} | null>(null);
  const [done, setDone] = useState<boolean>(false);
  // fetch user
  useEffect(() => {
    const fetchUser = async () => {
      const userSession = await GetUser();
      if(userSession !== null) {
        setUser(userSession);
        setDone(true);
      } else {
        setUser(null);
        setDone(true);
      }
    };

    fetchUser().catch((e) => console.log(e));
  }, []);

  return(
    <div>
      <div className={`${styles.header} py-5`}>
        <Link href="/">
          <Image 
            className={styles.logoImage} 
            src="/logo.png" alt="image" 
            width={400} 
            height={133}
            style={{width: 400, height: 133}}
            priority={true}
          />
        </Link>
        <div className="flex flex-grow"/>
        <div className="flex justify-center items-center rounded self-center bg-white text-black p-1 gap-x-2">
          <span><SearchIcon/></span>
          <input
            className="focus:outline-none"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="flex justify-center bg-purple-800 mb-10">
        <div className={`${styles.header} py-1`}>
          <ol className="flex">
            <Button item={{name:"Forum", path: "/"}}/>
            <Button item={{name:"Wiki", path: "/wiki"}}/>
            <Button item={{name:"Others", path: "/others"}}/>
          </ol>
          <div className="flex flex-grow"/>
          <Suspense fallback={<Loading/>}>
            {done && <>
              {user ?
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <UserAvatar user={user}/>
                    <span>{user.username}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-gray-300">
                      <MailIcon/>
                    </button>
                    <button className="text-gray-400 hover:text-gray-300">
                      <NotificationsIcon/>
                    </button>
                  </div>
                </div> :
                <div className="flex justify-center">
                  <Button item={{name:"Login", path: "/login"}}/>
                  <Button item={{name:"Register", path: "/register"}}/>
                </div>
              }
            </>}
          </Suspense>
        </div>
      </div>
    </div>
  )
}