'use client'
import { Button } from "@mui/material";
import Link from "next/link";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PersonIcon from '@mui/icons-material/Person';
import { useUserContext } from "@/app/components/layout/UserContext";
import { PublicUserType, ThreadType } from "@/app/components/type";
import { extractNameToPath, smartTimeConvert } from "@/app/components/utils/HelperFunction";

// appear at the the topmost of a thread
// contain who made the thread and created time
// also a edit button if you are the thread owner
export default function ThreadBodyHeader({thread, author}: {thread: ThreadType, author: PublicUserType}) {
	const [user, _] = useUserContext();
	return (
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
			{user && user.id === author.id &&
				<Link href={`/threads/edit/${extractNameToPath(thread.thread_title) + "." + thread.id}`}>
					<Button variant="outlined" size="small">
						Edit thread
					</Button>
				</Link>
			}
		</div>
	)
}