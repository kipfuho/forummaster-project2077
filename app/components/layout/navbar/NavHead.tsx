import Image from "next/image";
import Link from "next/link";
import styles from "../layout.module.css"
import SearchBox from "./lazy/SearchBox";

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
      <SearchBox/>
    </div>
  )
}