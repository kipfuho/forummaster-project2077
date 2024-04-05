'use client'
import Loading from "@/app/components/layout/Loading"
import { Suspense, useId, useRef, useState } from "react"
import Image from "next/image";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PersonIcon from '@mui/icons-material/Person';
import MessageBody from "./MessageBody";
import Pagination from "@/app/components/ui/Pagination/Pagination";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachmentIcon from '@mui/icons-material/Attachment';
import ReplyIcon from '@mui/icons-material/Reply';
import { MessageType, ThreadType, UserType } from "@/app/components/type";
import { format } from "date-fns";
import RichTextBox from "@/app/components/ui/Editor/Editor";
import { RichTextEditorRef } from "mui-tiptap";
import { Button } from "@mui/material";
import { useUserContext } from "@/app/components/layout/UserContext";
import Link from "next/link";
import { extractNameToPath } from "@/app/components/utils/HelperFunction";
import { PostFetch } from "@/app/components/utils/fetch/custom";

function PostReply({thread_id, sender_mail}: {thread_id: number, sender_mail: string}) {
	const rteRef = useRef<RichTextEditorRef>(null);

	const replyClick = async () => {
		const response = await PostFetch(
			"message/create-message",
			{
				thread_id: thread_id,
				sender_email: sender_mail,
			},
			null
		);

		if(response.ok) {
			alert("Replied!");
			location.reload();
		} else{
			alert("Error!");
		}
	}

	return(
		<>
			<RichTextBox rteRef={rteRef}/>
			<div className="flex border p-3 justify-center space-x-5 bg-zinc-700 mt-2">
				<div className="flex">
					<button 
						className="flex items-center rounded border border-gray-600 hover:shadow-lg py-1 px-3 text-sm text-red-700"
					>
						<AttachmentIcon/>
						<span>Attach files</span>
					</button>
				</div>
				<div className="flex-grow"></div>
				<div className="flex">
					<button 
						className="flex items-center rounded bg-red-700 py-1 px-5 font-bold hover:shadow-lg text-sm"
						onClick={replyClick}
					>
						<ReplyIcon/>
						<span>POST REPLY</span>
					</button>
					<button className="flex items-center rounded py-1 px-5 text-red-700 font-bold hover:bg-red-700 hover:bg-opacity-15 text-sm">
						<VisibilityIcon/>
						<span>PREVIEW</span>
					</button>
				</div>
			</div>
		</>
	)
}

// appear at the the topmost of a thread
// contain who made the thread and created time
// also a edit button if you are the thread owner
function ThreadBodyHead({thread}: {thread: ThreadType}) {
	const [user, _] = useUserContext();
	return (
		<div className="flex justify-between">
			<div className="flex space-x-1">
				<div className="flex items-center">
					<PersonIcon/>
					<span>{thread.author_email}</span>
				</div>
				<div className="flex items-center">
					<WatchLaterIcon/>
					<span>{format(thread.create_time, "MMM dd, yyyy")}</span>
				</div>
			</div>
			{user && user.email === thread.author_email &&
				<Link href={`/threads/edit/${extractNameToPath(thread.thread_title) + "." + thread.id}`}>
					<Button variant="outlined" size="small">
						Edit thread
					</Button>
				</Link>
			}
		</div>
	)
}

export default function ThreadBody({item, user}: {item: {thread: ThreadType, messages: MessageType[]}, user: UserType | null}) {
	let thread = item.thread;
	let messages = item.messages;
	
	const itemsPerPage = 20;
	let [page, setPage] = useState(0);
	return(
		<div>
			<div>
				<h1>{thread.thread_title}</h1>
				<ThreadBodyHead thread={thread}/>
				
				<div>
					<h2>Disscussion</h2>
					<hr/>
					<div>
						<Pagination size={5} totalPage={Math.floor(messages.length / itemsPerPage)} page={page} onPageChange={setPage}/>
					</div>
					
					<div>
						{messages.map((item, index) => (
							<MessageBody key={index} item={item}/>
						))}
					</div>
					<div>
						<Pagination size={5} totalPage={messages.length / itemsPerPage} page={page} onPageChange={setPage}/>
					</div>
					{user !== null &&
						<div className="flex rounded bg-gray-600 my-5">
							<div className="min-w-[142px] text-center p-2 border-r-gray-500 border-r-[1px]" about="author">
								<Image className="rounded-[10rem] p-2" width={125} height={125} src="/arknights.jpg" alt="img"/>
							</div>
							<div className="flex-grow p-2 overflow-auto">
							<PostReply thread_id={thread.id} sender_mail={user.email}/>
							</div>
						</div>
					}
					<div>
						Similiar threads
					</div>
				</div>
			</div>
		</div>
	)
}