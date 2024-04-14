'use client'
import { Button } from "@mui/material";
import Link from "next/link";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PersonIcon from '@mui/icons-material/Person';
import { useUserContext } from "@/app/components/layout/UserContext";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import { MessageDocument, ThreadDocument, UserDocument } from "@/app/page";
import Pagination from "@/app/components/ui/Pagination/Pagination";
import ReplyThread from "./ReplyThread";
import { ReactNode, useRef } from "react";
import { RichTextEditorRef } from "mui-tiptap";
import ReplyContextProvider from "./ReplyBoxContext/ReplyContextProvider";

// appear at the the topmost of a thread
// contain who made the thread and created time
// also a edit button if you are the thread owner
export default function ThreadContent({thread, author, page, children}: {thread: ThreadDocument, author: UserDocument, messages: MessageDocument[], page?: number, children: ReactNode}) {
	const [user, _] = useUserContext();
	const replyRteRef = useRef<RichTextEditorRef>(null);
	return (
		<div>
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
				{user && user._id === author._id &&
					<Link href={`/threads/edit/${thread._id}`}>
						<Button variant="outlined" size="small">
							Edit thread
						</Button>
					</Link>
				}
			</div>
			<div>
				<h2>Disscussion</h2>
				<hr/>
				<Pagination size={5} totalPage={Math.floor((thread.replies - 1) / 20) + 1} page={page ?? 1} link={`/threads/${thread._id}/page/`}/>
				<ReplyContextProvider replyRteRef={replyRteRef}>
					{children}
				</ReplyContextProvider>
				<Pagination size={5} totalPage={Math.floor((thread.replies - 1) / 20) + 1} page={page ?? 1} link={`/threads/${thread._id}/page/`}/>
				<ReplyThread thread_id={thread._id} rteRef={replyRteRef}/>
			</div>
		</div>
	)
}