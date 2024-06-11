'use client'
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode } from "react";
import { ThreadDocument } from "@/app/page";

export default function ThreadHead({
	children,
	thread
}: {
	children: ReactNode,
	thread: ThreadDocument
}) {
	const router = useRouter();

	const handleClick = (event: MouseEvent) => {
		if(event.currentTarget.parentElement?.tagName !== 'A') {
			console.log(event.currentTarget.parentElement);
			router.push("/threads/" + thread._id);
		}
	}

	return (
		<div
			className="flex cursor-pointer z-0"
			title="Go to this thread"
			onClick={handleClick}
		>{children}</div>
	)
}