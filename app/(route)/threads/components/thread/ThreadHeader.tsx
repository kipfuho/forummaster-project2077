'use client'
import { useUserContext } from "@/app/components/context/user/UserContext";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import { ThreadDocument, UserDocument } from "@/app/page";
import { Button } from "@mui/material";
import Link from "next/link";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PersonIcon from '@mui/icons-material/Person';

function EditThreadButton({
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

export default function ThreadHeader({
	author,
	thread
}: {
	author: UserDocument,
	thread: ThreadDocument
}) {
	return (
		<>
			<h1>{thread.title}</h1>
			<div className="flex justify-between">
				<div className="flex space-x-1">
					<div className="flex items-center">
						<PersonIcon/>
						<span>{author.username}</span>
					</div>
					<div className="flex items-center">
						<WatchLaterIcon/>
						<span>{smartTimeConvert(thread.create_time)}</span>
					</div>
				</div>
				<EditThreadButton
					authorId={author._id}
					threadId={thread._id}
				/>
			</div>
		</>
	)
}