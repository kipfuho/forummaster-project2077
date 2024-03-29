'use client'
import Loading from "@/app/components/layout/Loading"
import { Suspense, useId, useState } from "react"
import Image from "next/image";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PersonIcon from '@mui/icons-material/Person';
import MessageBody from "./MessageBody";
import Pagination from "@/app/components/ui/Pagination/Pagination";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachmentIcon from '@mui/icons-material/Attachment';
import ReplyIcon from '@mui/icons-material/Reply';
import { MessageType, ThreadType, UserType } from "@/app/components/type";
import UserCard from "./UserCard";
import { format } from "date-fns";
import { PostFetch } from "@/app/components/utils/CustomFetch";
import RichTextEditorContent from "@/app/components/editor/RichTextEditorContent";
import { useRichTextEditorContext } from "@/app/components/editor/EditorContext";

function PostReply({thread_id, sender_mail}: {thread_id: number, sender_mail: string}) {
	const editor = useRichTextEditorContext();

	const replyClick = async () => {
		const response = await PostFetch(
			"user/create-message",
			{
				thread_id: thread_id,
				sender_email: sender_mail,
				content: editor?.getHTML()
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
			<RichTextEditorContent editor={editor}/>
			<div className="flex border border-t-0 p-3 justify-center space-x-5 bg-zinc-700">
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

export default function ThreadBody({item, user}: {item: {thread: ThreadType, messages: MessageType[]}, user: UserType | null}) {
	let thread = item.thread;
	let messages = item.messages;
	
	const itemsPerPage = 20;
	let [page, setPage] = useState(0);
	let indexOfFirstItem = page * itemsPerPage;
  let indexOfLastItem = indexOfFirstItem + itemsPerPage;
  let currentItems = messages.slice(indexOfFirstItem, indexOfLastItem);
	return(
		<Suspense fallback={<Loading/>}>
			<div>
				<div>
					<h1>{thread.thread_title}</h1>
					<div className="flex space-x-1">
						<div>
							<PersonIcon/>
							<span>{thread.author_email}</span>
						</div>
						<div>
							<WatchLaterIcon/>
							<span>{format(thread.create_time, "MMM dd, yyyy")}</span>
						</div>
					</div>
					
					<div>
						<h2>Disscussion</h2>
						<hr/>
						<div>
							<Pagination size={5} totalPage={Math.floor(messages.length / itemsPerPage)} page={page} onPageChange={setPage}/>
						</div>
						<div className="rounded bg-gray-600 my-5">
							<div className="flex">
								<UserCard user_mail={thread.author_email}/>
								<div className="flex flex-grow flex-col p-2">
									<div>
										{format(thread.create_time, "MMM dd, yyyy")}
									</div>
									<div 
										className="flex-grow"
										dangerouslySetInnerHTML={{__html: thread.content}}
									/>
									<div>
										<span>{format(thread.last_update_time, "MMM dd, yyyy")}</span>
										<div className="border border-gray-500 border-l-red-700 border-l-2 py-1 px-2 bg-gray-700">
											?Likes
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div>
							{currentItems.map((item, index) => (
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
		</Suspense>
	)
}