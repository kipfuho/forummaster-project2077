'use client'
import { UserDocument } from "@/app/page";

export default function LastestActivity({
	value,
	index,
	member
}: {
	value:number,
	index: number,
	member: UserDocument
}) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
		>
			Lastest Activity
		</div>
	)
}