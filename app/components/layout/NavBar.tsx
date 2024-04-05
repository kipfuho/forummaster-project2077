'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./layout.module.css"
import SearchIcon from '@mui/icons-material/Search';
import Loading from "./Loading";
import { UserAvatar } from "../ui/Avatar/UserAvatar";
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { UserType } from "../type";
import { usePathname } from "next/navigation";
import { Menu, MenuItem } from "@mui/material";
import { useUserContext } from "./UserContext";
import { GetFetch } from "../utils/fetch/custom";

// navigation bar header
// contain a logo and simple search bar
function NavHead() {
  return(
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
  )
}

// user section on navigation bar
function UserSection({user}: {user: UserType}) {
  const [_, setUser] = useUserContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutClick = async () => {
    const result = await GetFetch("logout", null);
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
        <UserAvatar user={user}/>
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
}

// 
function AuthenButton() {
  return(
    <div className="flex justify-center">
      <Button item={{name:"Login", path: "/login"}} curpath=""/>
      <Button item={{name:"Register", path: "/register"}} curpath=""/>
    </div>
  )
}

// Button!
const Button = ({ item, curpath }: {item: {path: string, name: string}, curpath:string}) => (
  <Link className={`py-2 px-3 text-gray-400 hover:text-gray-200 bg-transparent`} href={item.path}>{item.name}</Link>
);

// Navbar components
// consist of the header and navigation bar
export default function NavBar(){
  const [user, _] = useUserContext();
  const pathName = usePathname();

  return(
    <div>
      <NavHead/>
      <div className="flex justify-center bg-gray-700 mb-10">
        <div className={`${styles.header} justify-between`}>
          <ol className="flex">
            <Button item={{name:"Forum", path: "/"}} curpath={pathName}/>
            <Button item={{name:"Wiki", path: "/wiki"}} curpath={pathName}/>
            <Button item={{name:"Others", path: "/others"}} curpath={pathName}/>
          </ol>
          {user !== undefined ?
            <>
              {user !== null ? 
                <UserSection user={user}/> : <AuthenButton/>
              }
            </> :
            <Loading/>
          }
        </div>
      </div>
    </div>
  )
}