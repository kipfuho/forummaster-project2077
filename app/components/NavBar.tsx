import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import styles from "./component.module.css"
import SearchIcon from '@mui/icons-material/Search';

// Button!
const Button: FC<{item: {name: string, path: string}}> = ({ item }) => (
  <Link className="border rounded px-3 py-1 mx-1 hover:bg-blue-500 bg-transparent" href={item.path}>{item.name}</Link>
);

// Navbar components
// consist of the header and navigation bar
export default function NavBar(){
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
          <Button item={{name:"Login", path: "/login"}}/>
          <Button item={{name:"Register", path: "/register"}}/>
        </div>
      </div>
    </div>
  )
}