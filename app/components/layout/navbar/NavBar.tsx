import { Suspense } from "react";
import styles from "../layout.module.css"
import Loading from "../Loading";
import UserSection from "./UserSection";
import NavHead from "./NavHead";
import Navigation from "./Navigation";

// Navbar components
// consist of the header and navigation bar
export default function NavBar(){
  return(
    <Suspense fallback={<Loading/>}>
      <NavHead/>
      <div className="flex justify-center bg-gray-700 mb-10">
        <div className={`${styles.header} justify-between py-1`}>
          <Navigation/>
          <Suspense fallback={<Loading/>}>
            <UserSection/>
          </Suspense>
        </div>
      </div>
    </Suspense>
  )
}