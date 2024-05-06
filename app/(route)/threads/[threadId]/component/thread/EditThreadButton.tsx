'use client'
import { useUserContext } from "@/app/components/context/user/UserContext";
import { Button } from "@mui/material";
import Link from "next/link";

export default function EditThreadButton({
	authorId,
	threadId
}: {
	authorId: string,
	threadId: string
}) {
	const [user, _] = useUserContext();

	if(user && user._id === authorId) {
		return (
		<Link href={`/threads/edit/${threadId}`}>
			<Button variant="outlined" size="small">
				Edit thread
			</Button>
		</Link>
		)
	}
}