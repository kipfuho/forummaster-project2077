import Image from "next/image";
import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';
import styles from "../layout.module.css"

// navigation bar header
// contain a logo and simple search bar
export default function NavHead() {
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