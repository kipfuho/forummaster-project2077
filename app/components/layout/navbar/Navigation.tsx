'use client'
import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

function getIndex(path: string) {
	if(path.includes("/wiki")) {
		return 1;
	} else if(path.includes("/others")) {
		return 2;
	} else {
		return 0;
	}
}

export default function Navigation() {
	const path = usePathname();
	const index = getIndex(path);
	return(
		<div className="flex">
			<Link href="/">
				<Button
					disabled={index === 0}
				>Forum</Button>
			</Link>
			<Link href="/wiki">
				<Button
					disabled={index === 1}
				>Wiki</Button>
			</Link>
			<Link href="/others">
				<Button
					disabled={index === 2}
				>Others</Button>
			</Link>
		</div>
	)
}