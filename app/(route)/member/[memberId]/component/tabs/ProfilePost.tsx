'use client'
import { UserDocument } from "@/app/page";
import UpdateStatus from "./profilePosting/UpdateStatus";
import ProfilePostingList from "./profilePosting/ProfilePostingList";

// component to show a list of profile posting message of a user
export default function ProfilePost({
	value,
	index,
	member
}: {
	value: number,
	index: number,
	member: UserDocument
}) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
		>
			<UpdateStatus member={member}/>
			<ProfilePostingList member={member}/>
		</div>
	)
}