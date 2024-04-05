'use client'
import ProtectedLayout from "@/app/components/layout/ProtectedLayout";
import { ReactNode } from "react";
import AccountSideBar from "./component/SideBar";

export default function AccountLayout({ children }: Readonly<{children: ReactNode}>) {
	return(
		<ProtectedLayout>
      <div className="flex">
        <AccountSideBar/>
        {children}
      </div>
    </ProtectedLayout>
	)
}