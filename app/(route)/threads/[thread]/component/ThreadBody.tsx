'use client'
import ThreadBodyHeader from "./ThreadBodyHeader";
import ReplyThread from "./ReplyThread";
import Message from "./Message";
import { Suspense, useRef } from "react";
import Loading from "@/app/components/layout/Loading";
import { MessageType, PublicUserType, ThreadType } from "@/app/components/type";
import { RichTextEditorRef } from "mui-tiptap";

export default async function ThreadBody({thread, messages, user}: {thread: ThreadType, messages: MessageType[], user: PublicUserType}) {
	const replyRteRef = useRef<RichTextEditorRef>(null);
	return(
		<Suspense fallback={<Loading/>}>
			<div>
				<h1>{thread.thread_title}</h1>
				<ThreadBodyHeader thread={thread} author={user}/>
				
				<div>
					<h2>Disscussion</h2>
					<hr/>
					<div>
						Pagination
					</div>
					
					<div>
						{messages.map((message, index) => (
							<Message key={index} message={message} rteRef={replyRteRef}/>
						))}
					</div>
					<div>
						Pagination
					</div>
					<ReplyThread thread_id={thread.id} rteRef={replyRteRef}/>
					<div>
						Similiar threads
					</div>
				</div>
			</div>
		</Suspense>
	)
}