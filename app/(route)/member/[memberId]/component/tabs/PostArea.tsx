'use client'
import { UserDocument } from "@/app/page";

export default function PostArea({value, index, user}: {value: number, index: number, user: UserDocument}) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
		>
			Post Area
		</div>
	)
}