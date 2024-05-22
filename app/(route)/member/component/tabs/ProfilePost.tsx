'use client'
import { ProfilePostingDocument, UserDocument } from "@/app/page";
import UpdateStatus from "./profilePosting/UpdateStatus";
import ProfilePostingList from "./profilePosting/ProfilePostingList";
import { useState } from "react";

// component to show a list of profile posting message of a user
export default function ProfilePost({
	member
}: {
	member: UserDocument
}) {
	// pps: profilePostingS
	const [pps, setPps] = useState<ProfilePostingDocument[]>([]);

	return (
		<>
			<UpdateStatus
				member={member}
				pps={pps}
				setPps={setPps}
			/>
			<ProfilePostingList
				member={member}
				pps={pps}
				setPps={setPps}
			/>
		</>
	)
}