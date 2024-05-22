'use client'
import ProtectedLayout from "@/app/components/layout/ProtectedLayout";
import { ReactNode } from "react";
import AccountSideBar from "./components/AccountSideBar";
import styles from './component/account.module.css'

export default function AccountLayout({ children }: Readonly<{children: ReactNode}>) {
	return(
		<ProtectedLayout>
      <div className="flex">
        <AccountSideBar/>
        <div className={styles.mainContainer}>{children}</div>
      </div>
    </ProtectedLayout>
	)
}