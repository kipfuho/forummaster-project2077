import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import styles from "./component.module.css"
import SearchIcon from '@mui/icons-material/Search';

// Button!
const Button: FC<{item: {name: string, path: string}}> = ({ item }) => (
  <Link className="border rounded px-3 py-1 mx-1 hover:bg-blue-500 bg-transparent" href={item.path}>{item.name}</Link>
);

export default function NavBar(){
    return(
    <div className="py-5">
      <div className="flex mb-10">
        <Link href="/">
          <Image className={styles.logoImage} src="/logo.png" alt="image" width={400} height={75}/>
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
      <div className="flex justify-center p-2 bg-purple-800">
        <ol className="flex mr-20">
          <Button item={{name:"Forum", path: "/"}}/>
          <Button item={{name:"Wiki", path: "/wiki"}}/>
          <Button item={{name:"Others", path: "/others"}}/>
        </ol>
        <div className="flex flex-grow"/>
        <Button item={{name:"Login", path: "/login"}}/>
        <Button item={{name:"Register", path: "/register"}}/>
      </div>
    </div>
  )
}