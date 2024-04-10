'use client'
import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
	const path = usePathname();
	return(
		<ol className="flex">
			<Link href="/">
				<Button>Forum</Button>
			</Link>
			<Link href="/wiki">
				<Button>Wiki</Button>
			</Link>
			<Link href="/others">
				<Button>Others</Button>
			</Link>
		</ol>
	)
}