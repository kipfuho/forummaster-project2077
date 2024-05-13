'use client'
import { UserDocument } from "@/app/page";
import UpdateStatus from "./profilePosting/UpdateStatus";
import ProfilePostingList from "./profilePosting/ProfilePostingList";

// component to show a list of profile posting message of a user
export default function ProfilePost({
	member
}: {
	member: UserDocument
}) {
	return (
		<>
			<UpdateStatus member={member}/>
			<ProfilePostingList member={member}/>
		</>
	)
}